import { ComponentType, LazyExoticComponent, lazy } from "react";
import { ROUTES } from "routing/constant";

export interface IRouteConfig {
  path: string;
  component: ComponentType | LazyExoticComponent<any>;
}

const routesConfig: IRouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: lazy(() => import("../modules/trading/page/trading")),
  },
];

export default routesConfig;
