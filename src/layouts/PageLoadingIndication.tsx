import { Skeleton, Stack } from "@mui/material";

export const PageLoadingIndicator = () => {
  return (
    <Stack>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Stack>
  );
};
