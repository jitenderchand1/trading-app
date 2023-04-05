import { FunctionComponent } from "react";
import { Tabs, TabsProps } from "antd";

export const CustomTabComponent: FunctionComponent<TabsProps> = (
  props: TabsProps
) => {
  return (
    <Tabs
      tabBarStyle={{
        color: "red",
      }}
      {...props}
    />
  );
};
