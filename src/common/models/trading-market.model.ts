export interface IMarket {
  key: string;
  label: string;
  subMarkets: ISubMarket[];
}

export interface ISubMarket extends Omit<IMarket, "subMarkets"> {}
