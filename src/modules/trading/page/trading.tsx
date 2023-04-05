import { FunctionComponent, useEffect } from "react";
import derivUtility from "common/services/deriv.service";
interface IProps {}

const HomePage: FunctionComponent<IProps> = (props: IProps) => {
  useEffect(() => {
    derivUtility.socketConnection.addEventListener("open", () => {
      console.log("open connection");
    });
  }, []);
  return <div>This is home page</div>;
};

export default HomePage;
