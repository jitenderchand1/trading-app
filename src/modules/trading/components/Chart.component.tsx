import { FunctionComponent } from "react";
import { ICandle } from "common/models/candle.model";
import { red, green } from "@mui/material/colors";
import reduce from "lodash/reduce";
import {
  AreaChart,
  Area,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  Label,
  Dot,
  DotProps,
  Cell,
  ReferenceDot,
  XAxis,
} from "recharts";

interface IProps {
  tradingHistory: ICandle[];
  priceDifference: number;
}

const ChartComponent: FunctionComponent<IProps> = (props: IProps) => {
  const { tradingHistory, priceDifference } = props;

  const min = reduce(tradingHistory, (acc, datum) => {
    if (datum.close < acc.close) {
      return datum;
    }

    return acc;
  });
  const max = reduce(tradingHistory, (acc, datum) => {
    if (datum.close > acc.close) {
      return datum;
    }
    return acc;
  });

  return (
    <div>
      <LineChart width={300} height={50} data={tradingHistory}>
        <Tooltip />
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <XAxis dataKey="epoch" hide />

        <Line
          strokeWidth={2}
          type="monotone"
          dataKey="close"
          stroke={priceDifference > 0 ? green[500] : red[500]}
          dot={false}
        />
        <ReferenceDot y={max?.close} x={max?.epoch} r={5} fill={"black"} />
        <ReferenceDot y={min?.close} x={min?.epoch} r={5} fill={"black"} />
      </LineChart>
    </div>
  );
};

export default ChartComponent;
