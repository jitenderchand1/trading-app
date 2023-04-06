import { useEffect, useState } from "react";
import { ISymbol } from "common/models/symbol.model";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TradingService from "../service/trading-service";
import { ISymbolTrade } from "common/models/symol-trade";
import { Button, Skeleton } from "@mui/material";
import UpArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownArrowIcon from "@mui/icons-material/KeyboardArrowDown";

interface IProps {
  symbol: ISymbol;
}

const TradingHistoryRealTime = (props: IProps) => {
  const { symbol } = props;
  const [tradingData, setTradingLiveData] = useState<ISymbolTrade | null>(null);
  const successCallback = (data: ISymbolTrade) => {
    setTradingLiveData(data);
  };
  const errorCallback = () => {};
  useEffect(() => {
    const requestPayload = {
      ticks_history: symbol.symbol,
      adjust_start_time: 1,
      count: 10,
      end: "latest",
      start: 1,
      style: "candles",
      subscribe: 1,
    };

    const { subscribe, unsubscribe } = TradingService.subscribeTicks(
      requestPayload,
      successCallback,
      errorCallback
    );
    subscribe();
    console.log("subscribe");
    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, [symbol]);

  const priceUpdate = tradingData?.close ?? 0 - (tradingData?.open ?? 0);

  return (
    <TableRow>
      <TableCell>{symbol.display_name}</TableCell>
      <TableCell>
        {tradingData?.close ?? (
          <Skeleton variant="rounded" width={100} height={20} />
        )}
      </TableCell>
      <TableCell>c</TableCell>
      <TableCell>d</TableCell>
      <TableCell align="right">
        <Button variant="outlined" color="primary">
          Trade
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TradingHistoryRealTime;
