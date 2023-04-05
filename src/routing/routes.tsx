import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesConfig from "routing/routes-config";
import map from "lodash/map";
import { PageLoadingIndicator } from "layouts/PageLoadingIndication";
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
                <Suspense fallback={<PageLoadingIndicator />}>
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
