import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "routing/routes";

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ConfigProvider>
          <AppRoutes />
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
