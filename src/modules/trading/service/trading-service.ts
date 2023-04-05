import derivService from "common/services/deriv.service";

export interface IRequestPayloadForActiveSymbols {
  active_symbols: string;
  product_type: string;
}

class TradingService {
  static async retrieveSymbols(payload: IRequestPayloadForActiveSymbols) {
    return new Promise((resolve, reject) => {
      const messageReceiveCallback = (message: MessageEvent<any>) => {
        const data = JSON.parse(message.data);
      };
      derivService.socketConnection.addEventListener(
        "message",
        messageReceiveCallback
      );
      derivService.derivAPI.activeSymbols(payload);
    });
  }
}

export default TradingService;
