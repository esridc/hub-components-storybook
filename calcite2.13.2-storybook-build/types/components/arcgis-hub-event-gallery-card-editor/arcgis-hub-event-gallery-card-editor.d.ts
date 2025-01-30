import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWithContext } from '../../utils/state';
import { IChangeEventDetail, IConfigurationSchema, IHubSite, IUiSchema } from '@esri/hub-common';
import { CurrentEventGalleryCardSchema, EventGalleryCardSchema } from '../../utils/event-gallery-card';
/**
 * A layout card editor component responsible for building the card configuration used by instances of Events 3 `arcgis-hub-event-gallery-card` components.
 */
export declare class ArcgisHubEventGalleryCardEditor implements IWithContext {
  /**
   * Intl reference
   */
  intl: ComponentIntl;
  /**
   * Host element reference
   */
  element: HTMLArcgisHubFacetListElement;
  /**
   * The global ArcGISContext object
   */
  _context: import("@esri/hub-common").IArcGISContext;
  /**
   * The IConfigurationSchema used by the configuration editor
   */
  schema: IConfigurationSchema;
  /**
   * The IUISchema used by the configuration editor
   */
  uiSchema: IUiSchema;
  /**
   * The current site
   */
  site: IHubSite;
  /**
   * An EventGalleryCardSchema object representing the card configuration values
   */
  values: EventGalleryCardSchema;
  /**
   * Emits an IChangeEventDetail object when changes are made to the card configuration
   */
  arcgisHubEventGalleryCardEditorChange: EventEmitter<IChangeEventDetail>;
  /**
   * Wires up the component to receive global context when the component mounts to the DOM
   */
  connectedCallback(): void;
  /**
   * Cleans up the global context when the component unmounts from the DOM
   */
  disconnectedCallback(): void;
  /**
   * Loads translations, the schema & the uiSchema before the component renders
   */
  componentWillLoad(): Promise<void>;
  /**
   * Disconnects global context
   */
  disconnectContext: () => void;
  /**
   * Loads the intl reference
   */
  loadIntl(): Promise<void>;
  /**
   * Loads the schema and uiSchema
   */
  loadSchemas(): Promise<void>;
  get _values(): CurrentEventGalleryCardSchema;
  /**
   * Wrapper function for `intl.t` used by configuration editor
   * @param key A translation string key
   * @param values Any values to interpolate into the translation string
   * @param opts Translation options
   * @returns A translated string
   */
  translationFn: (key: string, values?: Record<string, unknown>, options?: unknown) => string;
  /**
   * Handles changes to the configuration editor values
   * @param evt
   */
  handleConfigurationEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /**
   * Invoked when a `arcgisHubAddContentWorkflowComplete` is emitted from the arcgis-hub-add-content component after
   * successfully creating new content. This component doesn't have direct access to the gallery as it's rendered in
   * the card, so we simply create a new `values` object and emit `arcgisHubEventGalleryCardEditorChange` to indirectly
   * trigger the gallery in the card to refresh it's results
   */
  handleAddContentComplete: () => void;
  /**
   * Primary render method
   */
  render(): VNode;
}
