import { useEffect, useState } from "react";
import { Button, Skeleton, Box, Stack, Typography } from "@mui/material";
import { ISymbol } from "common/models/symbol.model";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import TradingService from "modules/trading/service/trading-service";
import { ISymbolTrade } from "common/models/symbol-trade.model";
import { ICandle } from "common/models/candle.model";
import { green, red } from "@mui/material/colors";

import UpArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownArrowIcon from "@mui/icons-material/KeyboardArrowDown";
import Chart from "modules/trading/components/Chart.component";

interface IProps {
  symbol: ISymbol;
}

const TradingHistoryRealTime = (props: IProps) => {
  const { symbol } = props;
  const [latestTradingData, setLatestTradingDataTradingLiveData] =
    useState<ISymbolTrade | null>(null);

  const { data: tradeHistory } = useQuery<ICandle[]>(
    ["retrieveTicksHistory", symbol.symbol],
    () => {
      const startTime = moment().subtract(24, "hour").unix();
      const payload = {
        ticks_history: symbol.symbol,
        adjust_start_time: 1,
        count: 5000,
        end: "latest",
        start: startTime,
        style: "candles",
      };
      return TradingService.retrieveTicksHistory(payload);
    }
  );

  useEffect(() => {
    if (symbol.exchange_is_open && !symbol.is_trading_suspended) {
      const requestPayload = {
        ticks_history: symbol.symbol,
        adjust_start_time: 1,
        count: 10,
        end: "latest",
        start: 1,
        style: "candles",
        subscribe: 1,
      };
      const { observable, unsubscribe } =
        TradingService.subscribeTicks(requestPayload);

      observable.subscribe((data) => {
        setLatestTradingDataTradingLiveData(data);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [symbol]);

  let priceDifference = 0;

  if (tradeHistory && latestTradingData) {
    const closingPrice = tradeHistory?.[0].close ?? 0;
    const latestPrice = latestTradingData?.close ?? 0;
    priceDifference = latestPrice - closingPrice;
  }
  if (tradeHistory?.length && !latestTradingData) {
    priceDifference =
      tradeHistory[tradeHistory.length - 1].close - tradeHistory[0].close;
  }

  return (
    <TableRow>
      <TableCell width="20%">{symbol.display_name}</TableCell>
      <TableCell width="20%">
        {latestTradingData?.close.toFixed(4) ??
          tradeHistory?.[tradeHistory.length - 1]?.close.toFixed(4) ?? (
            <Skeleton variant="rounded" width={100} height={20} />
          )}
      </TableCell>
      <TableCell width="20%">
        {tradeHistory || latestTradingData ? (
          <Box
            color={
              priceDifference > 0
                ? green[500]
                : priceDifference < 0
                ? red[500]
                : "black"
            }
          >
            {priceDifference > 0 ? (
              <Stack direction="row">
                <Box>
                  <UpArrowUpIcon />
                </Box>
                <Typography>{priceDifference.toFixed(4)}</Typography>
              </Stack>
            ) : priceDifference < 0 ? (
              <Stack direction="row">
                <Box>
                  <DownArrowIcon />
                </Box>
                <Typography>{priceDifference.toFixed(4)}</Typography>
              </Stack>
            ) : (
              <Stack direction="row">
                <Typography>{priceDifference.toFixed(4)}</Typography>
              </Stack>
            )}
          </Box>
        ) : (
          <Skeleton variant="rounded" width={100} height={20} />
        )}
      </TableCell>
      <TableCell width="20%">
        {tradeHistory ? (
          <Chart
            tradingHistory={tradeHistory}
            priceDifference={priceDifference}
          />
        ) : (
          <Skeleton variant="rounded" width={100} height={20} />
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          color="primary"
          disabled={!symbol.exchange_is_open || symbol.is_trading_suspended}
        >
          Trade
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TradingHistoryRealTime;
