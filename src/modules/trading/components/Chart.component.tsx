import { FunctionComponent } from "react";
import { ICandle } from "common/models/candle.model";
import { red, green } from "@mui/material/colors";
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
} from "recharts";

interface IProps {
  tradingHistory: ICandle[];
  priceDifference: number;
}

const ChartComponent: FunctionComponent<IProps> = (props: IProps) => {
  const { tradingHistory, priceDifference } = props;
  const maxY = Math.max(...tradingHistory.map((row) => row.close));
  return (
    <div>
      <LineChart width={300} height={50} data={tradingHistory}>
        <Tooltip />
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Dot cy={maxY} cx={100} r={4} />
        <Line
          strokeWidth={2}
          type="monotone"
          dataKey="close"
          stroke={priceDifference > 0 ? green[500] : red[500]}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default ChartComponent;
