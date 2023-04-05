import { Skeleton, Typography } from "antd";

const { Title } = Typography;

export const LoadingIndicator = () => {
  return (
    <>
      <Skeleton active />
    </>
  );
};
