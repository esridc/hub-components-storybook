import { h, Fragment } from '@stencil/core';
import { getPreconfiguredNotice } from '../../utils/notices/notices';
import intlManager from '../../utils/intl-manager';
import { shouldShowNotice } from '../../utils/notices/shouldShowNotice';
import { getGlobalContext } from '../../utils/state';
import { bind } from '../../utils/context';
import { dismissNotice } from '../../utils/notices/dismissNotice';
import { placesMatch, datesMatch, permissionsMatch } from './utils/notice';
import { resetNotice } from '../../utils/notices/resetNotice';
import { redirectToExternalUrl } from '../../utils';
import { cloneObject, Logger } from '@esri/hub-common';
/**
 * This component is responsible for rendering a notice to the user.
 * @export
 * @class ArcgisHubNotice
 */
export class ArcgisHubNotice {
  constructor() {
    // has the user checked the "do not show this again" checkbox on the modal
    this.shouldDismiss = false;
    this.noticeId = undefined;
    this.notice = undefined;
    this.place = undefined;
    this.popoverRef = undefined;
    bind(this, 'closeNotice', 'handleActionClick', 'onNoticeClose', 'onNoticeOpen', 'onDismissChecked', 'setNoticeElement');
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentShouldUpdate(newVal, oldVal, changedProp) {
    // NOTE: this is to avoid over-rendering when ad-hoc notices are pushed into the store
    // if place or noticeId changes we will re-render, if auth changes the notice-provider will cause a re-render
    let result = newVal !== oldVal;
    if (changedProp === 'notice') {
      // NOTE: checking only the id
      // means that if the props of the notice change, we will NOT re-render
      // if that could happen we either need to remove this or check for changes differently below
      result = newVal.id !== oldVal.id;
    }
    return result;
  }
  get _notice() {
    return this.notice || getPreconfiguredNotice(this.noticeId, this._context);
  }
  /**
  * Whether or not the notice should be shown
  * @readonly
  * @type {boolean}
  * @memberof ArcgisHubNotice
  */
  get shouldShowNotice() {
    /*
      We show it if:
        - we have a notification
        - it is not marked as deleted
        - if it has a place specified it matches
        - if it has dates specified, they match
        - if it has permissions specified, they are granted
        - it is not dismissable or it is dismissable and shouldShowNotice returns true (which means it has not been dismissed)
    */
    var _a, _b, _c, _d;
    const _isNotDeleted = !((_a = this._notice) === null || _a === void 0 ? void 0 : _a.deleted);
    const _placesMatch = placesMatch(this._notice, this.place);
    const _datesMatch = datesMatch(this._notice);
    const _permissionsMatch = permissionsMatch(this._notice, this._context);
    const _shouldShowNotice = !((_b = this._notice) === null || _b === void 0 ? void 0 : _b.dismissable) || shouldShowNotice((_c = this._notice) === null || _c === void 0 ? void 0 : _c.id, this._context);
    const shouldShow = !!this._notice
      && _isNotDeleted
      && _placesMatch
      && _datesMatch
      && _permissionsMatch
      && (!this._notice.dismissable || _shouldShowNotice);
    if (!shouldShow) {
      const messages = [];
      if (!this._notice) {
        messages.push('notice not specified or not found in config');
      }
      if (!_isNotDeleted) {
        messages.push('notice is marked as deleted');
      }
      if (!_placesMatch) {
        messages.push('place does not match');
      }
      if (!_datesMatch) {
        messages.push('dates do not match');
      }
      if (!_permissionsMatch) {
        messages.push('permissions do not match');
      }
      if (!_shouldShowNotice) {
        messages.push('notice is dismissable and has been dismissed');
      }
      const msg = `Notice ${(_d = this._notice) === null || _d === void 0 ? void 0 : _d.id} not shown: ${messages.join(', ')}`;
      Logger.debug(msg);
    }
    return shouldShow;
  }
  // /**
  //  * Exposed as a method for testing purposes
  //  * We do not expect this to be used in production
  //  * @returns
  //  */
  _resetNotice() {
    return resetNotice(this._notice.id, this._context);
  }
  setNoticeElement(el) {
    this.noticeElement = el;
  }
  /**
   * Event handler for the change event of the dismiss checkbox
   *
   * @param {CalciteCheckboxCustomEvent<boolean>} evt
   * @memberof ArcgisHubNotice
   */
  onDismissChecked(evt) {
    // when the dismiss checkbox is checked, we keep track of that
    // and use it when the modal is dismissed
    const { checked, name } = evt.target;
    this[name] = checked;
  }
  /**
   * Event handler for the close event of the underlying calcite components (notice, alert, modal)
   *
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubNotice
   */
  async onNoticeClose() {
    var _a, _b, _c, _d;
    let result;
    if ((_a = this._notice.telemetry) === null || _a === void 0 ? void 0 : _a.close) {
      this.hubTelemetry.emit(this._notice.telemetry.close);
    }
    if ((_b = this._notice.callbacks) === null || _b === void 0 ? void 0 : _b.onClose) {
      this._notice.callbacks.onClose();
    }
    // if it is dismissable
    // and either it is not a modal
    // or it is a modal and the dismiss checkbox is checked
    if (this._notice.dismissable && (((_c = this._notice.configuration) === null || _c === void 0 ? void 0 : _c.noticeType) !== 'modal' || this.shouldDismiss)) {
      if ((_d = this._notice.telemetry) === null || _d === void 0 ? void 0 : _d.dismiss) {
        this.hubTelemetry.emit(this._notice.telemetry.dismiss);
      }
      result = dismissNotice(this._notice.id, this._context);
    }
    // we want to do this last because it may cause this component to be removed from the dom
    // but we want to return the dismissNotice promise
    this.arcgisHubNoticeClose.emit(this._notice);
    return result;
  }
  /**
  * Handle the click event on the actions
  * @param {MouseEvent} evt
  * @return {*}  {Promise<void>}
  * @memberof ArcgisHubNotice
  */
  async handleActionClick(evt) {
    const action = this._notice.actions[evt.target.dataset.actionIndex];
    const { href, target } = action;
    if (action.telemetry) {
      this.hubTelemetry.emit(action.telemetry);
    }
    if (href) {
      const isFullyQualified = href.startsWith('http');
      if (target === '_blank') {
        // in this case we will not close the notice
      }
      else {
        if (isFullyQualified) {
          // we are following a link outside the app
          // in this case we need to wait for async work to complete
          // before following the link (because following the link will flush the app)
          // so we have to explicitly call onNoticeClose
          evt.preventDefault();
          await this.onNoticeClose();
          redirectToExternalUrl(href);
        }
        else {
          // if it is not fully qualified, we will close the notice
          // because we are following a link within the app
          // this will then cause onNoticeClose to be called
          await this.closeNotice();
        }
      }
    }
  }
  /**
   * Close the underlying calcite component (notice, alert, modal)
   *
   * @memberof ArcgisHubNotice
   */
  closeNotice() {
    if (this.noticeElement) {
      this.noticeElement.open = false;
    }
  }
  onNoticeOpen() {
    var _a, _b;
    if ((_a = this._notice.telemetry) === null || _a === void 0 ? void 0 : _a.open) {
      this.hubTelemetry.emit(this._notice.telemetry.open);
    }
    if ((_b = this._notice.callbacks) === null || _b === void 0 ? void 0 : _b.onOpen) {
      this._notice.callbacks.onOpen();
    }
  }
  /**
  * Get a string from the notice object or the i18n file
  * @param {string} key
  * @return {*}  {string}
  * @memberof ArcgisHubNotice
  */
  getString(key) {
    var _a;
    const noticeId = this.noticeId || this._notice.id;
    let result = this._notice[key];
    if (key === 'label') {
      // label is on the config object for alerts
      result = (_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a[key];
    }
    if (!result && noticeId) {
      // if we don't have the string and we can construct an intl key, attempt to do so
      const noticeValues = this._notice.intlValues;
      const fallback = 'string-not-found';
      // NOTE: if you are seeing missing translation messages and have traced it to here, be aware that notices of type alert should include a label either on the config object or in the translation file
      result = this.intl.t(`notice.${noticeId}.${key}`, Object.assign({}, noticeValues), { fallback });
      // if the string we got back is the fallback, that means there was no translation so we will return undefined
      result = result === fallback ? undefined : result;
    }
    return result;
  }
  /**
  * Render an action as a button or link
  * @param {IHubNoticeAction} action
  * @param {number} index
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderAction(action, index) {
    const key = `${this._notice.id}_${index}`;
    const intlKey = `notice.${this._notice.id}.actions.${index}.text`;
    let ariaLabel = action.ariaLabel || this.intl.t(intlKey);
    if (action.i18nAriaLabelKey) {
      ariaLabel = this.intl.t(`notice.${this._notice.id}.actions.${index}.${action.i18nAriaLabelKey}`);
    }
    // const clickHandler = action.target !== '_blank' ? undefined : this.closeModal;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (action.buttonStyle) {
      return h("calcite-button", { appearance: action.buttonStyle, "data-action-index": index, disabled: action.disabled, href: action.href, iconEnd: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, round: true, target: action.target }, action.label || this.intl.t(intlKey));
    }
    else {
      return h("calcite-link", { "data-action": action.action, "data-action-index": index, disabled: action.disabled, href: action.href, iconEnd: action.target === '_blank' ? 'launch' : null, iconStart: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, target: action.target }, action.label || this.intl.t(intlKey));
    }
  }
  /**
  * Render the actions configured for the notice
  * @param {string} slotName
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderActions(slotName) {
    return h("slot", { name: "actions", slot: slotName }, (this._notice.actions || []).map((action, idx) => {
      return this._renderAction(action, idx);
    }));
  }
  /**
   * During the Calcite v1.11 bump, Jupe and I (Aaron) worked to resolve
   * a bug where the icon prop set to a boolean would prevent the text from rendering
   *
   * This is a temporary fix to ensure that the text is rendered until Calcite can resolve the issue
   *
   * Jupe found an existing bug report of this during our investigation
   */
  get _getAlertIconName() {
    var _a;
    switch ((_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a.kind) {
      case 'danger':
      case 'warning':
        return 'exclamation-mark-triangle';
      case 'info':
        return 'information';
      case 'success':
        return 'check-circle';
      case 'brand':
        return 'lightbulb';
    }
  }
  /**
  * Render a notice of type alert
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderAlert() {
    const title = this.getString('title');
    const label = this.getString('label') || title;
    const defaultProps = { kind: 'brand', scale: 'm' };
    const nonOverrideableProps = { open: true, placement: 'top-end', label, width: 'auto' };
    const configuration = cloneObject(this._notice.configuration);
    // TODO: remove this when the bug is fixed in Calcite
    // https://github.com/Esri/calcite-design-system/issues/9567
    configuration.icon = this._getAlertIconName;
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), nonOverrideableProps), configuration);
    return (h("calcite-alert", Object.assign({}, props, { onCalciteAlertClose: this.onNoticeClose, onCalciteAlertOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "title" }, title), h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
  }
  /**
  * Render a notice of type notice
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderNotice() {
    const defaultProps = { closable: true, kind: 'brand', scale: 'm' };
    const nonOverrideableProps = { open: true, width: 'auto' };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return (h("calcite-notice", Object.assign({}, props, { onCalciteNoticeClose: this.onNoticeClose, onCalciteNoticeOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "title" }, this.getString('title')), h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
  }
  /**
  * Render a notice of type modal
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderModal() {
    // we don't need any defaults because undefined works for all of them
    const defaultProps = {};
    const nonOverrideableProps = { open: true };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return (h("calcite-modal", Object.assign({}, props, { onCalciteModalClose: this.onNoticeClose, onCalciteModalOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "header" }, h("h3", null, this.getString('title'))), h("div", { innerHTML: this.getString('message'), slot: "content" }), this._notice.dismissable &&
      h("calcite-label", { appearance: "clear", layout: "inline", slot: "back" }, h("calcite-checkbox", { checked: this.shouldDismiss, name: "shouldDismiss", onCalciteCheckboxChange: this.onDismissChecked }), this.intl.t('modal.dismiss')), h("calcite-button", { appearance: "outline", onClick: this.closeNotice, round: true, slot: "secondary" }, this.intl.t('modal.close')), this._renderActions('primary')));
  }
  /**
  * Render a notice of type popover
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderPopover() {
    const defaultProps = { closable: true, scale: 'm' };
    const nonOverrideableProps = { heading: this.getString('title') };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return h(Fragment, null, h("div", { class: "popover-reference", ref: (el) => this.popoverRef = el }, h("slot", { name: "popover-reference" })), this.popoverRef && h("calcite-popover", Object.assign({}, props, { onCalcitePopoverClose: this.onNoticeClose, onCalcitePopoverOpen: this.onNoticeOpen, ref: this.setNoticeElement, referenceElement: this.popoverRef }), h("div", { class: "popover-content" }, h("div", { innerHTML: this.getString('message') }), this._renderActions(''))));
  }
  render() {
    var _a;
    if (this.shouldShowNotice) {
      switch ((_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a.noticeType) {
        case 'notice':
          return this.renderNotice();
        case 'alert':
          return this.renderAlert();
        case 'modal':
          return this.renderModal();
        case 'popover':
          return this.renderPopover();
        default:
          return null;
      }
    }
  }
  static get is() { return "arcgis-hub-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-notice.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-notice.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "noticeId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNotice"
            }],
          "text": "The id of the notice to show"
        },
        "attribute": "notice-id",
        "reflect": false
      },
      "notice": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubNotice",
          "resolved": "IHubNotice",
          "references": {
            "IHubNotice": {
              "location": "import",
              "path": "../../utils/notices/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IHubNotice}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNotice"
            }],
          "text": "The notice to show - if provided, this will override the noticeId"
        }
      },
      "place": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNotice"
            }],
          "text": "The current place in the app - this will typically be a url path\nthis is matched agains the places array in the notice to determine\nif the notice should be shown"
        },
        "attribute": "place",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "popoverRef": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubNoticeClose",
        "name": "arcgisHubNoticeClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubNotice",
          "resolved": "IHubNotice",
          "references": {
            "IHubNotice": {
              "location": "import",
              "path": "../../utils/notices/types"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "_resetNotice": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
