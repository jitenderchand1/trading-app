import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";

class DerivUtility {
  private _socketConnection: WebSocket;
  private _derivAPI;
  private static _instance: DerivUtility;
  constructor() {
    this._socketConnection = new WebSocket(
      `${process.env.REACT_APP_SOCKET_BASE_URL}?app_id=${process.env.REACT_APP_ID}`
    );
    this._derivAPI = new DerivAPIBasic({ connection: this._socketConnection });
  }

  static getInstance(): DerivUtility {
    if (!DerivUtility._instance) {
      DerivUtility._instance = new DerivUtility();
    }
    return DerivUtility._instance;
  }
  get derivAPI() {
    return this._derivAPI;
  }
  get socketConnection(): WebSocket {
    return this._socketConnection;
  }
}

let DerivUtilityInstance = Object.freeze(DerivUtility.getInstance());

export default DerivUtilityInstance;
