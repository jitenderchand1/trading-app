import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "common/components/Header.component";
const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
