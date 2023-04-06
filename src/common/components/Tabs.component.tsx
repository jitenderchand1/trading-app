import { FunctionComponent } from "react";
import MiTab, { TabProps } from "@mui/material/Tab";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ITabsProps extends TabProps {
  className?: string;
}

export const TabComponent: FunctionComponent<ITabsProps> = (
  props: ITabsProps
) => {
  return <MiTab className={props.className} {...props} />;
};

export const Tab = styled(TabComponent)``;

export const SubTabsComponent: FunctionComponent<ITabsProps> = (
  props: ITabsProps
) => {
  return <MiTab className={props.className} {...props} />;
};

export const SubTabs = styled(SubTabsComponent)`
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const TabPanel = styled(TabPanelComponent)``;
