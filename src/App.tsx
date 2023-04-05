import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import AppRoutes from "routing/routes";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AppRoutes />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
