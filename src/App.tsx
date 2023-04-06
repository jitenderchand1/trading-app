import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRoutes from "routing/routes";

const client = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff444f",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
