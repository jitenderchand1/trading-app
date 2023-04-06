import groupBy from "lodash/groupBy";
import map from "lodash/map";
import { IMarket, ISubMarket } from "common/models/trading-market.model";
import { ISymbol } from "common/models/symbol.model";

class BusinessLayer {
  static prepareActiveSymbolApiResponseForView(data: ISymbol[]): IMarket[] {
    if (!data) {
      return [];
    }
    const marketByKey = groupBy(data, "market");
    const markets = map(marketByKey, (datum) => {
      const subMarketByKey = groupBy(datum, "submarket");
      const subMarkets: ISubMarket[] = map(subMarketByKey, (subMarketDatum) => {
        return {
          key: subMarketDatum[0].submarket,
          label: subMarketDatum[0].submarket_display_name,
          symbols: subMarketDatum,
        };
      });

      const market: IMarket = {
        key: datum[0].market,
        label: datum[0].market_display_name,
        subMarkets: subMarkets,
      };
      return market;
    });
    return markets;
  }
}

export default BusinessLayer;
