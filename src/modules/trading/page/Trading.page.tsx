import { useEffect, useMemo, useState } from "react";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Skeleton } from "antd";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";
import { Tab, SubTabs, TabPanel } from "common/components/Tabs.component";
import { IMarket } from "common/models/trading-market.model";
import TradingService from "modules/trading/service/trading-service";
import businessLayer from "modules/trading/business/tradingBusinessLayer";
import Divider from "@mui/material/Divider";

import TradingSymbols from "modules/trading/components/TradingSymbols.component";

const TradingPage = () => {
  const [parentTabSelectedIndex, setParentTabSelectedIndex] = useState(0);
  useEffect(() => {});

  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, data } = useQuery<any>(["retrieveSymbols"], () => {
    const payload = {
      activeSymbols: "brief",
      productType: "basic",
    };
    return TradingService.retrieveSymbols(payload);
  });

  const activeSymbols: IMarket[] = useMemo(() => {
    return businessLayer.prepareActiveSymbolApiResponseForView(data);
  }, [data]);

  const _handleParentTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSearchParams({
      market: activeSymbols[newValue].key,
    });
  };

  useEffect(() => {
    const selectIndex = findIndex(activeSymbols, {
      key: searchParams.get("market") || undefined,
    });
    setParentTabSelectedIndex(selectIndex < 0 ? 0 : selectIndex);
  }, [searchParams, activeSymbols]);

  return (
    <div>
      <Skeleton loading={isLoading} paragraph={{ rows: 3 }} title={false}>
        <Box className="page-content ">
          <Tabs
            value={parentTabSelectedIndex}
            onChange={_handleParentTabChange}
          >
            {map(activeSymbols, (datum, index) => {
              return <Tab label={datum.label} key={datum.key} value={index} />;
            })}
          </Tabs>
        </Box>
        <Divider />
        {map(activeSymbols, (datum, index) => {
          return (
            <TabPanel
              key={datum.key}
              value={parentTabSelectedIndex}
              index={index}
            >
              {map(datum.subMarkets, (datum, index) => {
                return (
                  <Tabs value>
                    <Tab label={datum.label} key={datum.key} value={index} />
                  </Tabs>
                );
              })}
            </TabPanel>
          );
        })}
        {/* <Tabs
          defaultActiveKey="1"
          renderTabBar={(tabBarProps, DefaultTabBar) => {
            return (
              <DefaultTabBar {...tabBarProps} className="page-content page-bg">
                {(node) => node}
              </DefaultTabBar>
            );
          }}
          onChange={(a) => {
            console.log(a);
          }}
          items={map(activeSymbols, (datum, index) => {
            return {
              ...datum,
              children: (
                <div style={{ paddingTop: "20px" }}>
                  <SubTabs
                    key={index}
                    items={map(datum.subMarkets, (datum) => {
                      return {
                        ...datum,
                        children: (
                          <div key={datum.key} style={{ paddingTop: "20px" }}>
                            <TradingSymbols symbols={datum.symbols} />
                          </div>
                        ),
                      };
                    })}
                    renderTabBar={(tabBarProps, DefaultTabBar) => {
                      return (
                        <DefaultTabBar
                          {...tabBarProps}
                          className="page-content "
                        >
                          {(node) => node}
                        </DefaultTabBar>
                      );
                    }}
                  />
                </div>
              ),
            };
          })}
        /> */}
      </Skeleton>
    </div>
  );
};

export default styled(TradingPage)``;
