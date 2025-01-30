import { ComponentIntl } from "../../utils/stencil-intl";
import { IItemResource } from '../../utils/types/IItemResource';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubMediaGallery implements IWithContext {
  element: HTMLElement;
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
  *item Id
  */
  itemId: string;
  selectable: boolean;
  layout: 'list' | 'grid';
  constructor();
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  getImageUrl(file: string): string;
  /**
   * Convert the unix timestamp to 'month day, year' format
   */
  parseCreatedDate(timestamp: number): string;
  /**
   * Fetch the resources of itemId
   */
  private fetchResources;
  /**
   * Remove a resource of itemId
   */
  handleCardAction(evt: any): Promise<any>;
  resources: IItemResource[];
  componentWillLoad(): Promise<void>;
  get imageResources(): IItemResource[];
  getPopoverInfo(size: any, date: any, name: any): string;
  renderImageResource(res: any): any;
  render(): any;
}
