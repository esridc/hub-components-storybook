import { CalciteMenuItemCustomEvent } from "@esri/calcite-components";
export interface IHubBreadcrumb {
  title: string;
  icon: string;
  link?: string;
  label?: string;
}
export declare const Breadcrumbs: ({ breadcrumbs, onClick }: {
  breadcrumbs: IHubBreadcrumb[];
  onClick?: (event: CalciteMenuItemCustomEvent<void>) => void;
  base?: string;
}) => any[];
