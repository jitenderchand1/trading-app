import derivService from "common/services/deriv.service";
import { generateRandomId } from "common/utils/";
import responseUtil from "common/utils/response.util";
import { Subject } from "rxjs";
import responseTransformer from "modules/trading/service/response-transformer";
import { ISymbol } from "common/models/symbol.model";
import { ICandle } from "common/models/candle.model";

interface ITickHistoryPayload {
  ticks_history: string;
  adjust_start_time: number;
  count: number;
  end: string | number;
  start: number;
  style: string;
  req_id?: number;
}

export interface IRequestPayloadForActiveSymbols {
  activeSymbols: string;
  productType: string;
}

class TradingService {
  /**
   * This function will return list of active symbols
   * @param IRequestPayloadForActiveSymbols
   * @returns
   */

  static async retrieveSymbols({
    activeSymbols,
    productType,
  }: IRequestPayloadForActiveSymbols): Promise<ISymbol[]> {
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
              reject(new Error());
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
  /**
   * This function will return the history of particular symbol
   * @param ITickHistoryPayload
   * @returns
   */

  static async retrieveTicksHistory(
    apiQueryParam: ITickHistoryPayload
  ): Promise<ICandle[]> {
    const req_id = generateRandomId();
    const apiPayload = {
      ...apiQueryParam,
      req_id,
    };
    return new Promise((resolve, reject) => {
      const messageReceiveCallback = (message: MessageEvent<any>) => {
        try {
          const data = JSON.parse(message.data);
          console.log("apiQueryParam", apiQueryParam.ticks_history);
          console.log("req", req_id);
          console.log("data", data);
          const messageType = "candles";
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
              reject(new Error());
            }
            derivService.socketConnection.removeEventListener(
              "message",
              messageReceiveCallback
            );
            resolve(data.candles);
          }
        } catch (error) {
          console.log("error");
          reject(error);
        }
      };
      derivService.socketConnection.addEventListener(
        "message",
        messageReceiveCallback
      );
      derivService.derivAPI.ticksHistory(apiPayload);
    });
  }

  /**
   * This function will return real time trade updates
   * @param ITickHistoryPayload
   * @returns
   */
  static subscribeTicks(tickHistoryRequestPayload: ITickHistoryPayload) {
    const req_id = generateRandomId();
    const requestPayload = {
      ...tickHistoryRequestPayload,
      req_id,
      subscribe: 1,
    };
    const request = new Subject<any>();
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
      observable: request,
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
