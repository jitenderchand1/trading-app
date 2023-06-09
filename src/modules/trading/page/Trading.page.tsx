import { useEffect, useMemo, useState } from "react";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import { useQuery } from "react-query";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "react-router-dom";
import { Tab, SubTabs, TabPanel } from "common/components/Tabs.component";
import { IMarket } from "common/models/trading-market.model";
import TradingService from "modules/trading/service/trading-service";
import businessLayer from "modules/trading/business/tradingBusinessLayer";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import TradingSymbols from "modules/trading/components/TradingSymbols.component";
import { ISymbol } from "common/models/symbol.model";
import LoadingSkeleton from "modules/trading/components/LoadingIndicator.component";
import deriveService from "common/services/deriv.service";

const TradingPage = () => {
  const [parentTabSelectedIndex, setParentTabSelectedIndex] = useState(0);

  const [childTabSelectedIndex, setChildTabSelectedIndex] = useState(0);

  const [isConnectionLost, setConnectionErrorState] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, data } = useQuery<ISymbol[]>(
    ["retrieveSymbols"],
    () => {
      const payload = {
        activeSymbols: "brief",
        productType: "basic",
      };
      return TradingService.retrieveSymbols(payload);
    }
  );

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

  const _handleChildTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSearchParams({
      market: activeSymbols[parentTabSelectedIndex].key,
      submarket: activeSymbols[parentTabSelectedIndex].subMarkets[newValue].key,
    });
  };

  useEffect(() => {
    const _handleSocketConnectionError = () => {
      setConnectionErrorState(true);
    };
    deriveService.socketConnection.addEventListener(
      "error",
      _handleSocketConnectionError
    );
    return () => {
      deriveService.socketConnection.removeEventListener(
        "error",
        _handleSocketConnectionError
      );
    };
  }, []);

  useEffect(() => {
    if (activeSymbols.length) {
      const selectIndex = findIndex(activeSymbols, {
        key: searchParams.get("market") || undefined,
      });
      setParentTabSelectedIndex(selectIndex < 0 ? 0 : selectIndex);

      const selectChildIndex = findIndex(
        activeSymbols[parentTabSelectedIndex].subMarkets,
        {
          key: searchParams.get("submarket") || undefined,
        }
      );
      setChildTabSelectedIndex(selectChildIndex < 0 ? 0 : selectChildIndex);
    }
  }, [searchParams, activeSymbols]);

  return (
    <div>
      {error || isConnectionLost ? (
        <Box className="page-content" my={5}>
          <Alert severity="error">
            The Network connection is lost, Please refresh page
          </Alert>
        </Box>
      ) : null}
      {isLoading && !isConnectionLost ? (
        <Box className="page-content">
          <LoadingSkeleton />
        </Box>
      ) : null}
      {!isLoading && !isConnectionLost ? (
        <>
          <Box className="page-content" bgcolor={grey[100]}>
            <Tabs
              value={parentTabSelectedIndex}
              onChange={_handleParentTabChange}
            >
              {map(activeSymbols, (datum, index) => {
                return (
                  <Tab label={datum.label} key={datum.key} value={index} />
                );
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
                <Box className="page-content">
                  <Tabs
                    value={childTabSelectedIndex}
                    TabIndicatorProps={{ style: { display: "none" } }}
                    style={{
                      minHeight: "auto",
                    }}
                    onChange={_handleChildTabChange}
                  >
                    {map(datum.subMarkets, (datum, index) => {
                      return (
                        <SubTabs
                          label={datum.label}
                          key={datum.key}
                          value={index}
                        />
                      );
                    })}
                  </Tabs>
                </Box>
                {map(datum.subMarkets, (datum, index) => {
                  return (
                    <TabPanel
                      key={datum.key}
                      value={childTabSelectedIndex}
                      index={index}
                    >
                      <div key={datum.key} className="page-content">
                        <TradingSymbols symbols={datum.symbols} />
                      </div>
                    </TabPanel>
                  );
                })}
              </TabPanel>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default styled(TradingPage)``;
