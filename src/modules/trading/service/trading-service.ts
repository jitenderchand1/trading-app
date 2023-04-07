import derivService from "common/services/deriv.service";
import { generateRandomId } from "common/utils/";
import responseUtil from "common/utils/response.util";
import { Observable, BehaviorSubject } from "rxjs";
import responseTransformer from "modules/trading/service/response-transformer";

interface ITickHistoryPayload {
  ticks_history: string;
  adjust_start_time: number;
  count: number;
  end: string;
  start: number;
  style: string;
  req_id?: number;
}

type SuccessCallback = (data: any) => any;
type ErrorCallback = () => void;

export interface IRequestPayloadForActiveSymbols {
  activeSymbols: string;
  productType: string;
}

class TradingService {
  static async retrieveSymbols({
    activeSymbols,
    productType,
  }: IRequestPayloadForActiveSymbols) {
    const req_id = generateRandomId();
    const apiPayload = {
      req_id,
      active_symbols: activeSymbols,
      product_type: productType,
    };
    return new Promise((resolve, reject) => {
      const messageReceiveCallback = (message: MessageEvent<any>) => {
        try {
          const data = JSON.parse(message.data);
          const messageType = "active_symbols";
          const response = responseUtil.validateResponse({
            data,
            messageType,
            id: req_id,
          });
          if (response.isEqualToMessageType) {
            if (response.hasError) {
              derivService.socketConnection.removeEventListener(
                "message",
                messageReceiveCallback
              );
            }
            const transformedData =
              responseTransformer.activeSymbolApiResponseTransformer(data);
            resolve(transformedData);
          }
        } catch (error) {
          reject(error);
        } finally {
          derivService.socketConnection.removeEventListener(
            "message",
            messageReceiveCallback
          );
        }
      };
      derivService.socketConnection.addEventListener(
        "message",
        messageReceiveCallback
      );
      derivService.derivAPI.activeSymbols(apiPayload);
    });
  }

  static subscribeTicks(tickHistoryRequestPayload: ITickHistoryPayload) {
    const req_id = generateRandomId();
    const requestPayload = {
      ...tickHistoryRequestPayload,
      req_id,
      subscribe: 1,
    };
    const request = new BehaviorSubject<any>(undefined);

    const messageReceiveCallback = (message: MessageEvent<any>) => {
      try {
        const data = JSON.parse(message.data);
        const messageType = "ohlc";
        const response = responseUtil.validateResponse({
          data,
          messageType,
          id: req_id,
        });
        if (response.isEqualToMessageType) {
          if (response.hasError) {
            derivService.socketConnection.removeEventListener(
              "message",
              messageReceiveCallback
            );
            request.error(new Error());
          }
          const transformedData =
            responseTransformer.symbolStreamTransformer(data);
          request.next(transformedData);
        }
      } catch (error) {
        derivService.socketConnection.removeEventListener(
          "message",
          messageReceiveCallback,
          false
        );
        request.error(error);
      }
    };
    derivService.socketConnection.addEventListener(
      "message",
      messageReceiveCallback
    );
    derivService.derivAPI.ticksHistory(requestPayload);
    return {
      observable: request.asObservable(),
      unsubscribe: () => {
        derivService.socketConnection.removeEventListener(
          "message",
          messageReceiveCallback
        );
        request.complete();
      },
    };
  }
}

export default TradingService;
