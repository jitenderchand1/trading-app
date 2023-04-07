import { Box, Skeleton, Stack, Divider } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Skeleton width={100} height={60} />
        <Skeleton width={100} height={60} />
        <Skeleton width={100} height={60} />
        <Skeleton width={100} height={60} />
        <Skeleton width={100} height={60} />
        <Skeleton width={100} height={60} />
      </Stack>
      <Divider />
      <Stack mt={1}>
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </Stack>
    </Box>
  );
};

export default LoadingIndicator;
