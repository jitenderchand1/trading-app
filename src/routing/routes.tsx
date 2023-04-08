import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesConfig from "routing/routes-config";
import { Box } from "@mui/material";
import map from "lodash/map";
import LoadingIndicator from "modules/trading/components/LoadingIndicator.component";
import AppLayout from "layouts/AppLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          {map(routesConfig, (datum, index) => (
            <Route
              key={index}
              path={datum.path}
              element={
                <Suspense
                  fallback={
                    <Box className="page-content">
                      <LoadingIndicator />
                    </Box>
                  }
                >
                  <datum.component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
