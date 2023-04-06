import { ISymbol } from "./symbol.model";

export interface IMarket {
  key: string;
  label: string;
  subMarkets: ISubMarket[];
}

export interface ISubMarket extends Omit<IMarket, "subMarkets"> {
  symbols: ISymbol[];
}
