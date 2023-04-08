import { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, Stack, Typography } from "@mui/material";
import { ICandle } from "common/models/candle.model";
import { red, green, grey } from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import reduce from "lodash/reduce";
import moment from "moment";
import {
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ReferenceDot,
  XAxis,
  TooltipProps,
} from "recharts";

interface IProps {
  tradingHistory: ICandle[];
  priceDifference: number;
}

interface ITooltipProps extends TooltipProps<any, any> {
  className?: string;
}

export const CustomTooltip = styled(({ payload, className }: ITooltipProps) => {
  if (payload && payload.length) {
    const { payload: datum } = payload[0];
    return (
      <Box className={className}>
        <Stack spacing={1}>
          <Box fontWeight="bold">
            {moment.unix(datum.epoch).format("DD MMM, YYYY")}
          </Box>
          <Box>
            <Stack direction="row">
              <Box color="green">
                <FiberManualRecordIcon color="inherit" fontSize="small" />
              </Box>
              <Box>{datum.high?.toFixed(3)}</Box>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row">
              <Box color="red">
                <FiberManualRecordIcon color="inherit" fontSize="small" />
              </Box>
              <Box>{datum.low?.toFixed(3)}</Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }
  return null;
})`
  width: 150px;
  background: white;
  border-radius: 4px;
  padding: 10px;
  color: ${grey[900]};
  border: solid 1px ${grey[300]};
  .tool-header {
    text-align: center;
    color: white;
  }
`;

const ChartComponent: FunctionComponent<IProps> = (props: IProps) => {
  const { tradingHistory, priceDifference } = props;

  const min = reduce(tradingHistory, (acc, current) => {
    if (current.close < acc.close) {
      return current;
    }
    return acc;
  });
  const max = reduce(tradingHistory, (acc, current) => {
    if (current.close > acc.close) {
      return current;
    }
    return acc;
  });

  return (
    <div>
      <LineChart width={300} height={55} data={tradingHistory}>
        <Tooltip position={{ y: -120 }} content={<CustomTooltip />} />
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <XAxis dataKey="epoch" hide />

        <Line
          strokeWidth={2}
          type="monotone"
          dataKey="close"
          stroke={priceDifference > 0 ? green[500] : red[500]}
          dot={false}
        />
        <ReferenceDot y={max?.close} x={max?.epoch} r={4} fill={"black"} />
        <ReferenceDot y={min?.close} x={min?.epoch} r={4} fill={"black"} />
      </LineChart>
    </div>
  );
};

export default ChartComponent;
