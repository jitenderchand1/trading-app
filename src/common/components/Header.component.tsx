import { FunctionComponent, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import DerivLogo from "assets/images/logo.png";
import styled from "styled-components";

interface IProps {
  className?: string;
}

const HeaderComponent: FunctionComponent<IProps> = ({ className }: IProps) => {
  return (
    <AppBar className={className} position="static">
      <div className="logo_wrapper">
        <img src={DerivLogo} />
      </div>
    </AppBar>
  );
};

export default styled(HeaderComponent)`
  background: #001529 !important;
  padding: 20px 50px;
  box-shadow: none !important;
  .logo_wrapper {
    width: 160px;
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 100%;
    }
  }
`;
