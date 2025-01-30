import { ICardActionLink, Permission } from "@esri/hub-common";
/**
 * Hub Notice structure
 * This is the strucure for pre-configured notices defined in notices.ts
 */
export interface IHubNotice extends IHubNoticeBase {
  id: string;
  dismissable?: boolean;
}
/**
 * Base structure for a Hub Notice
 * This is the minimal structure that is required to show a notice and can be passed to the global state via showNotice
 * @export
 * @interface IHubNoticeBase
 */
export interface IHubNoticeBase {
  configuration: NoticeConfig;
  title?: string;
  message?: string;
  intlValues?: Record<string, any>;
  actions?: IHubNoticeAction[];
  permissions?: IHubNoticePermission[];
  startDate?: string;
  endDate?: string;
  autoShow?: boolean;
  places?: (string | RegExp)[];
  callbacks?: {
    onClose?: () => void;
    onOpen?: () => void;
  };
  telemetry?: {
    close?: Record<string, any>;
    open?: Record<string, any>;
    dismiss?: Record<string, any>;
  };
}
/**
 * The configuration for a notice action
 *
 * @export
 * @interface IHubNoticeAction
 * @extends {ICardActionLink}
 */
export interface IHubNoticeAction extends ICardActionLink {
  target?: string;
  ariaLabel?: string;
  i18nAriaLabelKey?: string;
  telemetry?: Record<string, any>;
}
/**
 * The configuration for a notice permission
 *
 * @export
 * @interface IHubNoticePermission
 */
export interface IHubNoticePermission {
  permission: Permission;
  access: boolean;
}
/**
 * Notice configuration for a notice
 * discriminated union of IInlineNotification, IModalNotification, and IAlertNotification
 * @export
 * @interface NoticeConfig
 */
export declare type NoticeConfig = IInlineNotice | IModalNotice | IAlertNotice | IPopoverNotice;
/**
 * The configuration for inline notices (which will render a calcite-notice)
 *
 * @export
 * @interface IInlineNotice
 */
export interface IInlineNotice {
  noticeType: "notice";
  closable?: boolean;
  icon?: string | boolean;
  kind?: 'brand' | 'danger' | 'info' | 'success' | 'warning';
  scale?: 's' | 'm' | 'l';
}
/**
 * The configuration for modal notices (which will render a calcite-modal)
 *
 * @export
 * @interface IModalNotice
 */
export interface IModalNotice {
  noticeType: "modal";
  closeButtonDisabled?: boolean;
  docked?: boolean;
  escapeDisabled?: boolean;
  fullscreen?: boolean;
  kind?: 'brand' | 'danger' | 'info' | 'success' | 'warning';
  outsideCloseDisabled?: boolean;
  scale?: 's' | 'm' | 'l';
  widthScale?: 's' | 'm' | 'l';
}
/**
 * The configuration for alert notices (which will render a calcite-alert)
 *
 * @export
 * @interface IAlertNotice
 */
export interface IAlertNotice {
  noticeType: "alert";
  autoClose?: boolean;
  autoCloseDuration?: 'slow' | 'medium' | 'fast';
  icon?: string | boolean;
  kind?: 'brand' | 'danger' | 'info' | 'success' | 'warning';
  label?: string;
  scale?: 's' | 'm' | 'l';
}
export interface IPopoverNotice {
  noticeType: "popover";
  autoClose?: boolean;
  headingLevel?: number;
  label?: string;
  offsetDistance?: number;
  offsetSkidding?: number;
  overlayPositioning?: 'fixed' | 'absolute';
  placement?: "auto" | "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "auto-start" | "auto-end" | "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";
  pointerDisabled?: boolean;
  scale?: 's' | 'm' | 'l';
}
/**
 * Represents dismissible messages that have been deleted
 * we need to keep these around in a minimal form
 * so that we can ensure that we don't reuse ids
 * @export
 * @interface IHubDeprecatedNotice
 */
export interface IHubDeprecatedNotice {
  /**
   * unique identifier across all IHubNotice and IHubDeprecatedNotice objects
   */
  id: string;
  /**
   * Whether the displaying UI for the message has been deleted from the code base.
   * We opt to keep all IHubDeprecatedNotice in the code base so that we can track
   * which ids cannot be reused.
   */
  deleted: true;
}
