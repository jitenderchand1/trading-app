import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
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
        <ConfigProvider>
          <ThemeProvider theme={theme}>
            <AppRoutes />
          </ThemeProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
