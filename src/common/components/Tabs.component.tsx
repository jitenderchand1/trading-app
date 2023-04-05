import { FunctionComponent } from "react";
import { Tabs as AntdTabs, TabsProps } from "antd";
import styled from "styled-components";

interface ITabsProps extends TabsProps {
  className?: string;
}

export const TabComponent: FunctionComponent<ITabsProps> = (
  props: ITabsProps
) => {
  return <AntdTabs className={props.className} {...props} />;
};

export const Tabs = styled(TabComponent)`
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: black !important;
      font-weight: bold;
    }
  }
  .ant-tabs-ink-bar {
    background: #ff444f;
  }
`;
