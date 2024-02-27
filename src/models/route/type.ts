import { FC } from "react";

export interface RouteType {
  name: string;
  key: string;
  path: string;
  component: FC;
}
