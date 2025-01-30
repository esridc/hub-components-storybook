import { IHubInitiative, IQuery } from "@esri/hub-common";
import { ComponentIntl } from "../../../../utils/stencil-intl";
import { IFacet } from "../../../../utils/types";
export declare class ArcgisHubInitiativeProjectsView {
  element: HTMLElement;
  /** ArcGIS Hub initiative entity */
  entity: IHubInitiative;
  intl: ComponentIntl;
  /** query to fetch all of the initiative's associated projects */
  _associatedProjectsQuery: IQuery;
  private get _context();
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  /**
   * Return the facets for the Project associations gallery
   * (on the Projects tab)
   * @param intl - component intl
   * @returns {IFacet[]}
  */
  get associatedProjectsFacets(): IFacet[];
  render(): any;
}
