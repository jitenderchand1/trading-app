import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "common/components/Header.component";
const { Content } = Layout;

const AppLayout = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default AppLayout;
