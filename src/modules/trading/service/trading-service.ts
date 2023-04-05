import derivService from "common/services/deriv.service";
import { generateRandomId } from "common/utils/";
import responseUtil from "common/utils/response.util";
import requestTransformer from "modules/trading/service/response-transformer";

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
          if (response.hasError) {
            derivService.socketConnection.removeEventListener(
              "message",
              messageReceiveCallback
            );
            reject(reject);
          }
          const transformedData =
            requestTransformer.activeSymbolApiResponseTransformer(data);
          resolve(transformedData);
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
}

export default TradingService;
