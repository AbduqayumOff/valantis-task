import { RouteType } from "../models/route/type";
import { Home } from "./index";

export const routes: RouteType[] = [
  {
    name: "Home",
    key: "home",
    path: `/`,
    component: Home,
  },
];
