import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Skeleton } from "antd";
import tradingService from "modules/trading/service/trading-service";
import businessLayer from "modules/trading/business/tradingBusinessLayer";
import { Tabs } from "common/components/Tabs.component";
import { Row, Col } from "antd";

const TradingPage = () => {
  useEffect(() => {});

  const { isLoading, error, data } = useQuery<any>(["retrieveSymbols"], () => {
    const payload = {
      activeSymbols: "brief",
      productType: "basic",
    };
    return tradingService.retrieveSymbols(payload);
  });

  const activeSymbols = useMemo(() => {
    return businessLayer.prepareActiveSymbolApiResponseForView(data);
  }, [data]);

  useEffect(() => {});

  return (
    <div>
      <Skeleton loading={isLoading} paragraph={{ rows: 3 }} title={false}>
        <Tabs defaultActiveKey="1" items={activeSymbols} onChange={() => {}} />
      </Skeleton>
    </div>
  );
};

export default TradingPage;
