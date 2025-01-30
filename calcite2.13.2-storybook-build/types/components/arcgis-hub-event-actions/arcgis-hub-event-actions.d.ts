import { IArcGISContext, IHubEvent } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWithContext } from '../../utils/state';
import { IRegistration } from '@esri/hub-common/dist/types/events/api';
/**
 * This component encapsulates the UI & logic responsible for registering/deregistering to attend a Hub Event, viewing online event details, and joining an active online event.
 */
export declare class ArcgisHubEventActions implements IWithContext {
  /**
   * Intl reference
   */
  intl: ComponentIntl;
  /**
   * Host element reference
   */
  element: HTMLElement;
  /**
   * The currently authenticated user's registration record, if one exists
   */
  userRegistration: IRegistration;
  /**
   * Whether a register or deregister XHR is currently in flight
   */
  actionPending: boolean;
  /**
   * True when the registration dropdown is in an open state
   */
  registrationDropdownOpen: boolean;
  /**
   * True when the online details modal is in an open state
   */
  onlineDetailsModalOpen: boolean;
  /**
   * The global ArcGISContext object
   */
  _context: IArcGISContext;
  /**
   * The ID of the event
   */
  identifier: string;
  /**
   * An IHubEvent representing the event
   */
  entity: IHubEvent;
  /**
   * Hub telemetry event
   */
  hubTelemetry: EventEmitter<Record<string, any>>;
  /**
   * Loads the user's registration record when the user changes (signs in or signs out)
   * @param context The current IArcGISContext object
   * @param prevContext The previous IArcGISContext object
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): Promise<void>;
  handleIdentifierChanged(identifier: string): Promise<void>;
  /**
   * Wires up the component to receive global context when the component mounts
   */
  connectedCallback(): void;
  /**
   * Cleans up the global context when the component unmounts
   */
  disconnectedCallback(): void;
  /**
   * Loads necessary dependencies before the component mounts
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
   * Loads the entity & user registration, if registered
   */
  fetchData(skipEntity?: boolean): Promise<void>;
  /**
   * Loads the currently authenticated user's registration record when one exists
   */
  fetchUserRegistration(): Promise<void>;
  /**
   * Loads the entity reference for the current identifier
   */
  fetchEntity(): Promise<void>;
  /**
   * Displays a notice with the given message and kind
   * @param message The message for the alert
   * @param kind The kind of alert
   */
  showNotice(message: string, kind: 'brand' | 'danger' | 'info' | 'success' | 'warning'): void;
  /**
   * Handles clicks to the `Register` button and attendance options from the `Register` calcite-dropdown
   * @param evt A PointerEvent or CustomEvent<void> depending on whether a calcite-button or calcite-dropdown-item was clicked
   * @returns Promise<void>
   */
  handleRegistration: (evt: PointerEvent | CustomEvent<void>) => Promise<void>;
  /**
   * Handles clicks to the `Registered` button, deregisters the user from event attendance
   * @returns Promise<void>
   */
  handleDeregistration: () => Promise<void>;
  /**
   * Handles clicks to the `Register` calcite-dropdown, needed so the dropdown icon can properly reflect open/closed state
   * @param evt CustomEvent<void>
   */
  handleDropdownToggled: (evt: CustomEvent<void>) => void;
  /**
   * Handles clicks to the `Join online` button when online event details are configured, opens the online details modal.
   */
  handleJoinButtonClick: () => void;
  /**
   * Handles the online details modal closing, keeps local modal state in sync with the mutable prop of the calcite-modal component
   */
  handleJoinModalClose: () => void;
  /**
   * Returns a sanitized online event details string that's safe to inject into the DOM via innerHTML attribute to prevent
   * markup from the rich-text editor from rendering as plain text and also prevents XSS vulnerabilities
   */
  get sanitizedOnlineDetails(): string;
  /**
   * Returns true when the current time is within one hour before the event beginning and is before the event end time
   */
  get isEventJoinable(): boolean;
  /**
   * Returns true when online attendance is at maximum capacity
   */
  get onlineAttendanceFull(): boolean;
  /**
   * Returns true when in-person attendance is at maximum capacity
   */
  get inPersonAttendanceFull(): boolean;
  /**
   * Returns true when both online & in-person attendance is at maximum capacity
   */
  get hybridAttendanceFull(): boolean;
  /**
   * Returns true when the currently authenticated user is registered to attend online
   */
  get isAttendingOnline(): boolean;
  /**
   * Returns true when the currently authenticated user is registered to attend in-person
   */
  get isAttendingInPerson(): boolean;
  /**
   * Derives the tooltip text for the `Join online` button
   */
  get joinButtonTooltipText(): string;
  /**
   * Returns true when the event is configured for in-person attendance
   */
  get isInPerson(): boolean;
  /**
   * Returns true when the event is configured for online attendance
   */
  get isOnline(): boolean;
  /**
   * Returns true when the event is configured for both in-person & online attendance
   */
  get isHybrid(): boolean;
  /**
   * Returns true when the `Register` calcite-button or calcite-dropdown should be disabled
   */
  get isRegisterActionDisabled(): boolean;
  /**
   * Returns true when the `Registered` calcite-button should be disabled
   */
  get isRegisteredActionDisabled(): boolean;
  /**
   * Derives the tooltip text for the `Register` button
   */
  get registerButtonTooltipText(): string;
  /**
   * Derives the tooltip text for the `Registered` button
   */
  get registeredButtonTooltipText(): string;
  /**
   * Returns true when the `Join online` calcite-button should be disabled
   */
  get isJoinButtonDisabled(): boolean;
  /**
   * Renders the `Register` button
   */
  renderRegisterButton(): VNode;
  /**
   * Renders the `Register` dropdown
   */
  renderRegisterMenu(): VNode;
  /**
   * Renders the `Registered` button
   */
  renderRegisteredButton(): VNode;
  /**
   * Renders the `Join online` button
   */
  _renderJoinButton(icon?: string, href?: string, target?: string, onClick?: (evt: PointerEvent) => void): VNode;
  /**
   * Renders the `Join online` button + modal when online event details are configured
   */
  renderJoinButtonWithModal(): VNode;
  /**
   * Renders the `Join online` button with or without a modal depending on whether online details are configured for the event
   */
  renderJoinButton(): VNode;
  /**
   * Primary render method
   */
  render(): VNode;
}
