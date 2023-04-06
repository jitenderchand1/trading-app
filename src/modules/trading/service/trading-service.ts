import derivService from "common/services/deriv.service";
import { generateRandomId } from "common/utils/";
import responseUtil from "common/utils/response.util";
import responseTransformer from "modules/trading/service/response-transformer";

interface ITickHistoryPayload {
  ticks_history: string;
  adjust_start_time: number;
  count: number;
  end: string;
  start: number;
  style: string;
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

  static subscribeTicks(
    tickHistoryRequestPayload: ITickHistoryPayload,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    const req_id = generateRandomId();
    const requestPayload = {
      req_id,
      ...tickHistoryRequestPayload,
    };
    const messageType = "ohlc";

    const tickSubscriber = () =>
      derivService.derivAPI.subscribe(requestPayload);

    const messageReceiveCallback = (message: MessageEvent<any>) => {
      try {
        const data = JSON.parse(message.data);
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
          const transformedData = responseTransformer.symbolStreamTransformer(
            tickHistoryRequestPayload.ticks_history,
            data
          );
          successCallback(transformedData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    return {
      subscribe: async () => {
        derivService.socketConnection.addEventListener(
          "message",
          messageReceiveCallback
        );
        await tickSubscriber();
      },
      unsubscribe: async () => {
        console.log("unsubscribe from service");
        derivService.socketConnection.removeEventListener(
          "message",
          messageReceiveCallback
        );
        await tickSubscriber().unsubscribe();
      },
    };
  }
}

export default TradingService;
