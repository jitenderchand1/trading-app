import { FunctionComponent, useEffect } from "react";
import { Layout, Col, Row } from "antd";
import DerivLogo from "assets/images/logo.png";
import styled from "styled-components";
import derivUtility from "common/services/deriv.service";

const { Header } = Layout;

interface IProps {
  className?: string;
}

const HeaderComponent: FunctionComponent<IProps> = ({ className }: IProps) => {
  return (
    <Header className={className}>
      <div className="logo_wrapper">
        <img src={DerivLogo} />
      </div>
    </Header>
  );
};

export default styled(HeaderComponent)`
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
