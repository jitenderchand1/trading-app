import { FunctionComponent } from "react";
import map from "lodash/map";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ISymbol } from "common/models/symbol.model";
import TradingHistoryRealTime from "modules/trading/components/TradingHistoryRealTime.component";
import { Th } from "common/components/Table.component";

interface IProps {
  symbols: ISymbol[];
}

const TradingSymbols: FunctionComponent<IProps> = (props: IProps) => {
  const { symbols } = props;
  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <Th>Name</Th>
          <Th>Last Price</Th>
          <Th>24h change</Th>
          <Th>&nbsp;</Th>
          <Th>&nbsp;</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(symbols, (symbol, index) => (
          <TradingHistoryRealTime key={index} symbol={symbol} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TradingSymbols;
