import { IArcGISContext, IHubSite } from "@esri/hub-common";
import { IHubNotice, IUrlState } from "./utils";
interface IHubComponentsStore {
  notices: IHubNotice[];
  context?: IArcGISContext;
  site?: IHubSite;
  urlState?: IUrlState;
}
declare const store: import("@stencil/store").ObservableMap<IHubComponentsStore>;
export default store;
