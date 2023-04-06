import { FunctionComponent } from "react";
import MiTab, { TabProps } from "@mui/material/Tab";
import styled from "styled-components";
import Box from "@mui/material/Box";

interface ITabsProps extends TabProps {
  className?: string;
}

export const TabComponent: FunctionComponent<ITabsProps> = (
  props: ITabsProps
) => {
  return (
    <div className={props.className}>
      <MiTab {...props} />
    </div>
  );
};

export const Tab = styled(TabComponent)`
  .MuiBox-root {
    background: red;
  }
`;

export const SubTabsComponent: FunctionComponent<ITabsProps> = (
  props: ITabsProps
) => {
  return (
    <div className={props.className}>
      <MiTab {...props} />
    </div>
  );
};

export const SubTabs = styled(SubTabsComponent)`
  .MuiTabs-root {
    min-height: auto;
  }
  .MuiTab-root {
    padding: 5px 15px !important;
    min-height: auto;
  }
  .Mui-selected {
    background: #ff444f !important;
    color: white !important;
    border-radius: 20px;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      background: #ff444f;
      font-weight: normal;
      color: white !important;
    }
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelComponent = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 4 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

export const TabPanel = styled(TabPanelComponent)``;
