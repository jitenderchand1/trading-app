import { Outlet } from "react-router-dom";
import Header from "common/components/Header.component";

const AppLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
