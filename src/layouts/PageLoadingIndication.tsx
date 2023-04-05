import { Skeleton, Typography } from "antd";

const { Title } = Typography;

export const PageLoadingIndicator = () => {
  return (
    <>
      <Skeleton>
        <Title>Loading...</Title>
      </Skeleton>
    </>
  );
};
