import { EventEmitter } from "../../../stencil-public-runtime";
import { ComponentIntl } from "../../../utils/stencil-intl";
import { HubEntity, IArcGISContext, ICardActionLink, IHubCatalog, IHubCardViewModel } from "@esri/hub-common";
export declare class ArcgisHubEntityInitiatives {
  element: HTMLElement;
  /** Hub entity */
  entity: HubEntity;
  /** title of the active association state catalog */
  _activeCatalogKey: string;
  /** association state (associated, pending & requesting) catalogs */
  _associationCatalogs: IHubCatalog[];
  /** whether the "request association" picker is open */
  _isPickerOpen: boolean;
  /*** Emits telemetry information */
  hubTelemetry: EventEmitter<Record<string, any>>;
  /** request association gallery picker catalogs */
  _availableToRequestCatalogs: IHubCatalog[];
  /**
   * This entity's total number of referenced entities.
   * e.g. the total number of typeKeywords on the entity
   * that begin with "ref|" (e.g. ref|initiative|00c).
   * This form of typeKeyword indicates that the entity
   * has either requested to associate or is already
   * associated with the referenced entity.
   *
   * We need to keep track of this count to ensure it
   * is below the imposed limit of 50.
   */
  _referencedEntitiesCount: number;
  /** reference to the arcgis-hub-catalog element */
  _catalogEl: HTMLArcgisHubCatalogElement;
  intl: ComponentIntl;
  handleGalleryAction(evt: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): Promise<void>;
  componentWillLoad(): Promise<void>;
  /** contextual auth and portal information */
  get _context(): IArcGISContext;
  /**
   * Whether the total number of referenced initiatives >= 50.
   * If there are more than 50 referenced initiatives, we do
   * not allow the user to request additional associations
   * or accept incoming requests.
   */
  get _isAssociationLimitReached(): boolean;
  /** gallery card actions for the active catalog */
  get _actionLinks(): ICardActionLink[];
  /**
   * Function to initialize the pane. Also gets called anytime
   * associations are accepted, canceled, or requested:
   *
   * 1. gets the number of initiatives the entity references
   * 2. gets the association state (associated, pending and requesting)
   * catalogs to populate the main gallery
   * 3. gets the catalogs to populate the "request association" picker
   */
  init: () => Promise<void>;
  /**
   * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't lose the DOM context
   */
  handleHubTelemetry: (evt: CustomEvent<Record<string, any>>) => void;
  /** handler to update the active association state catalog */
  handleCatalogChange: (evt: CustomEvent<string>) => void;
  /** handler to open the "request association" picker */
  handlePickerOpen: () => void;
  /** handler to close the "request association" picker */
  handlePickerClose: () => void;
  /** handler to request associations with the selected initiatives */
  handlePickerSelectionUpdate: (evt: CustomEvent) => Promise<void>;
  /** renders the "request association" button + picker experience */
  renderRequestAssociation(): HTMLArcgisWormholeElement;
  /** renders the "request association" button.
   * If the association limit is reached, we render a tooltip as well.
   */
  renderRequestAssociationButton(): HTMLElement;
  /**
   * renders the main gallery with association state (associated,
   * pending = "outgoing", requesting = "incoming") source facets
   */
  renderAssociationsGallery(): HTMLArcgisHubCatalogElement;
  /** renders the current association count + outgoing request count */
  renderRequestAssociationCount(): HTMLElement;
  render(): any;
}
