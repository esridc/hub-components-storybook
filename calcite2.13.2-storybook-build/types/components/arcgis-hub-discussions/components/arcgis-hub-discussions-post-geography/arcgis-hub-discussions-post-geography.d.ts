import { HTMLCalciteActionElement, HTMLCalciteListItemElement } from '@esri/calcite-components/dist';
import { IChannel, IPost } from '@esri/hub-discussions';
import { EventEmitter } from '../../../../stencil-public-runtime';
import { Feature, Geometry } from 'geojson';
import { IPostRelatedFeatureDetails } from '../../utils/discussions';
import { ComponentIntl } from "../../../../utils/stencil-intl";
interface IFeaturePositionDetails {
  featureGeometry: Geometry;
  relatedFeatureId: string;
  featureIndex: number;
  isStaged: boolean;
  originalIndex: number;
  isRelatedFeature: boolean;
}
/** @internal */
export declare class ArcgisHubDiscussionsPostGeography {
  /**
   * Default value for maxEntryCount
   */
  defaultMaxEntryCount: number;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Maximum number of entries to display
   */
  maxEntryCount: number;
  /**
   * Related features to render
   */
  relatedFeatures: Feature[];
  /**
   * Related feature ID's
   */
  relatedFeatureIds: string[];
  /**
   * The index of the list item being edited, -1 indicates inactive
   */
  activeEditIndex: number;
  /**
   * Should display loading state
   */
  loading: boolean;
  postId: string;
  post: IPost;
  parentId: string;
  channel: IChannel;
  channelId: string;
  /**
   * If the list should be in a disabled state
   */
  disabled: boolean;
  /**
   * If the geometry edit / delete actions should be rendered in a disabled state
   */
  disabledActions: boolean;
  displayFieldValid: boolean;
  displayFieldKey: string;
  /**
   * Features (geometries) unsaved for location updates
   */
  unsavedFeatures: Feature[];
  /**
   * Related Features (ID's of features in associated feature service) unsaved for location updates
   */
  unsavedRelatedFeatures: IPostRelatedFeatureDetails[];
  /**
   * Feature geometry edits for existing post locations
   */
  unsavedExistingFeatures: Feature[];
  /**
   * If a map is present on the page
   */
  hasMap: boolean;
  /**
   * If the component should truncate geography
   */
  expandable?: boolean;
  /**
   * If the button should toggle between "view all" and "view less"
   */
  toggleable?: boolean;
  /**
   * URL to fetch related features
   */
  url: string;
  /**
   * If component is rendered inside post-editor or reply-editor
   */
  renderedInEditor: boolean;
  /**
   * If the body width is < 768px
   */
  isMobile: boolean;
  /**
   * If the location description should render
   */
  showLocationDescriptionText: boolean;
  /**
   * An alternative location description string
   */
  locationDescriptionText: string;
  /**
   * Emitted when the user selects a geometry item
   */
  arcgisHubDiscussionsPostGeographySelect: EventEmitter<Feature>;
  /**
   * Emitted when the user hovers over a geometry item
   */
  arcgisHubDiscussionsPostGeographyHover: EventEmitter<Feature>;
  /**
   * Emitted when the user selects the "View all locations" action
   */
  arcgisHubDiscussionsPostViewAllGeography: EventEmitter<void>;
  /**
   * Emitted when the user successfully removes or updates a post geography
   */
  arcgisHubDiscussionsPostEdit: EventEmitter<IPost>;
  /**
   * Emitted when the user edits a drawn geometry for the post
   */
  arcgisHubDiscussionsGeometryDrawEdit: EventEmitter<Feature>;
  /**
   * Emitted when the user edits a drawn geometry for the post
   */
  arcgisHubDiscussionsGeometryDrawEditCancel: EventEmitter<void>;
  /**
   * Emitted during an editing session to remove unsaved graphics from the map
   */
  arcgisHubDiscussionsFeatureRemove: EventEmitter<Feature>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubDiscussionsPostGeographyElement;
  private get _context();
  get featuresLoaded(): boolean;
  constructor();
  componentWillLoad(): void;
  initialize(): Promise<void>;
  updateFeatures(): void;
  handleRelatedFeatureIdsChange(): void;
  updateLoading(): void;
  handleFeatureUpdated(): void;
  fetchRelatedFeatures(): Promise<void>;
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  /**
   * Get specific details related to geography list item in the list
   * @param evt Mouse Event
   * @returns IFeaturePositionDetails object
   */
  findGeometryFromClickEvent(evt: MouseEvent): IFeaturePositionDetails;
  handleGeometrySelected(evt: MouseEvent): void;
  /**
   * Emits event when geometry is hovered over
   * @param evt MouseEvent
   */
  handleGeometryHovered(evt: MouseEvent): void;
  /**
   * Emits event when geometry is removed
   * @param evt MouseEvent
   */
  handleDelete(evt: MouseEvent): void;
  handleEdit(evt: MouseEvent): void;
  handleViewAllGeography(): void;
  handleToggleAllGeography(): void;
  get geometries(): Geometry[];
  renderActions(index: number, isRelatedFeature: boolean, isStaged: boolean): HTMLElement[];
  renderGeographyItem(feature: Feature, index: number, isRelatedFeature?: boolean, isStaged?: boolean): HTMLCalciteListItemElement;
  renderButton(listLength: number): HTMLCalciteActionElement;
  get listItems(): HTMLCalciteListItemElement[];
  renderGeographies(): HTMLElement;
  renderSkeleton(): HTMLArcgisSkeletonLoaderElement[];
  render(): any;
}
export {};
