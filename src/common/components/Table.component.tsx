import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const Th = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#9b9b9b",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
