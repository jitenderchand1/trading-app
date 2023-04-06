import { FunctionComponent, useEffect } from "react";
import { Button } from "antd";
import map from "lodash/map";
import type { ColumnsType } from "antd/es/table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ISymbol } from "common/models/symbol.model";
import TradingHistoryRealTime from "modules/trading/components/TradingHistoryRealTime.component";
import { Th } from "common/components/Table.component";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface IProps {
  symbols: ISymbol[];
}

const TradingSymbols: FunctionComponent<IProps> = (props: IProps) => {
  const { symbols } = props;
  return (
    <div className="page-content">
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
    </div>
  );
};

export default TradingSymbols;
