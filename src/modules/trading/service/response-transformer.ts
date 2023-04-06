import map from "lodash/map";
import { ISymbol } from "common/models/symbol.model";
import { ISymbolTrade } from "common/models/symol-trade";

class RequestTransformer {
  static activeSymbolApiResponseTransformer(data: any): ISymbol[] {
    const symbols: ISymbol[] = map(data.active_symbols, (datum) => {
      return {
        allow_forward_starting: Boolean(datum.allow_forward_starting),
        display_name: datum.display_name,
        display_order: datum.display_name,
        exchange_is_open: Boolean(datum.exchange_is_open),
        is_trading_suspended: Boolean(datum.is_trading_suspended),
        market: datum.market,
        market_display_name: datum.market_display_name,
        pip: datum.pip,
        subgroup: datum.subgroup,
        subgroup_display_name: datum.subgroup_display_name,
        submarket: datum.submarket,
        submarket_display_name: datum.submarket_display_name,
        symbol: datum.symbol,
        symbol_type: datum.symbol_type,
      };
    });

    return symbols;
  }

  static symbolStreamTransformer(data: any): ISymbolTrade {
    return {
      timestamp: data.ohlc.epoch,
      open: parseFloat(data.ohlc.open),
      close: parseFloat(data.ohlc.close),
      high: parseFloat(data.ohlc.high),
      low: parseFloat(data.ohlc.low),
    };
  }
}

export default RequestTransformer;
