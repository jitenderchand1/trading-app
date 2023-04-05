import { useEffect } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import derivUtility from "common/services/deriv.service";
import tradingService from "modules/trading/service/trading-service";
import { useSearchParams } from "react-router-dom";

const TradingPage = () => {
  const { isLoading, error, data } = useQuery<any>(["retrieveSymbols"], () => {
    const payload = {
      activeSymbols: "brief",
      productType: "basic",
    };
    return tradingService.retrieveSymbols(payload);
  });
  useEffect(() => {
    derivUtility.socketConnection.addEventListener("open", () => {
      console.log("open connection");
    });
  }, []);
  return (
    <div>
      <Skeleton loading={true} paragraph={{ rows: 3 }} title={false}>
        <div>home Page</div>
      </Skeleton>
    </div>
  );
};

export default TradingPage;
