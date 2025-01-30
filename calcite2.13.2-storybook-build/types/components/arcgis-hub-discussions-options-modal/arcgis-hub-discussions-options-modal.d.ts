import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IHubContent } from '@esri/hub-common';
/** @internal */
export declare class ArcgisHubDiscussionsOptionsModal<T extends IHubContent | IGroup> {
  /**
   * A reference to the options element
   */
  optionsElement: HTMLArcgisHubDiscussionsOptionsElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubDiscussionsOptionsModalElement;
  /**
   * The discussion subject (content or group)
   */
  subject: T;
  /**
   * True to open the modal
   */
  open: boolean;
  /**
   * True when options updates are saving
   */
  saving: boolean;
  /**
   * Any error thrown during update operation
   */
  error: Error;
  /**
   * True when the subject does not contain cannotDiscuss typeKeyword
   */
  canDiscuss: boolean;
  /**
   * Telemetry event
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted when the modal closed
   */
  arcgisHubDiscussionsOptionsModalClosed: EventEmitter<void>;
  /**
   * Emitted when the subject has been updated
   */
  arcgisHubDiscussionsOptionsModalUpdated: EventEmitter<T>;
  /**
   * Constructor function
   */
  constructor();
  /**
   * Component will load lifecycle method
   */
  componentWillLoad(): Promise<void>;
  /**
   * Updates canDiscuss state when subject or open changes. Results in the selected panel being
   * reset to reflect the actual discussability of the subject when re-opening the modal.
   * @param subject
   */
  updateCanDiscuss(): void;
  /**
   * Invoked when the modal is dismissed by either clicking close from header or cancel button
   */
  handleModalClosed(): void;
  /**
   * Handles changes to the selected tile
   * @param evt A custom event whose details represent the updated checked state of the tiles
   */
  handleOptionsChanged(evt: CustomEvent<boolean>): void;
  /**
   * Handles clicks to the cancel button, closes the modal
   */
  handleCloseModal(): void;
  /**
   * True when the given subject is a group
   */
  get isGroup(): boolean;
  private get _context();
  /**
   * Handles clicks to the save button
   */
  handleSave(): Promise<void>;
  /**
   * Resets error state
   */
  handleNoticeClosed(): void;
  render(): any;
}
