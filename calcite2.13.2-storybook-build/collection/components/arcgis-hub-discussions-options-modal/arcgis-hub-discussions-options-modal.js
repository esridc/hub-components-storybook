import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { isDiscussable, DiscussionType } from '@esri/hub-discussions';
import { updateDiscussable } from '../arcgis-hub-discussions/utils/discussions';
import { getGlobalContext } from '../../utils/state';
/** @internal */
export class ArcgisHubDiscussionsOptionsModal {
  /**
   * Constructor function
   */
  constructor() {
    this.subject = undefined;
    this.open = undefined;
    this.saving = undefined;
    this.error = undefined;
    this.canDiscuss = false;
    bind(this, 'handleCloseModal', 'handleModalClosed', 'handleSave', 'handleNoticeClosed', 'handleOptionsChanged');
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.updateCanDiscuss();
  }
  /**
   * Updates canDiscuss state when subject or open changes. Results in the selected panel being
   * reset to reflect the actual discussability of the subject when re-opening the modal.
   * @param subject
   */
  updateCanDiscuss() {
    this.canDiscuss = isDiscussable(this.subject);
  }
  /**
   * Invoked when the modal is dismissed by either clicking close from header or cancel button
   */
  handleModalClosed() {
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.modal.details.discussionOptions);
    this.arcgisHubDiscussionsOptionsModalClosed.emit();
  }
  /**
   * Handles changes to the selected tile
   * @param evt A custom event whose details represent the updated checked state of the tiles
   */
  handleOptionsChanged(evt) {
    this.canDiscuss = evt.detail;
  }
  /**
   * Handles clicks to the cancel button, closes the modal
   */
  handleCloseModal() {
    this.open = false;
  }
  /**
   * True when the given subject is a group
   */
  get isGroup() {
    return this.subject.isInvitationOnly !== undefined;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * Handles clicks to the save button
   */
  async handleSave() {
    const { subject, _context, optionsElement, isGroup } = this;
    const { value } = optionsElement;
    const categoryKey = isGroup ? 'groups' : 'content';
    const detailsKey = value ? 'allowDiscussions' : 'blockDiscussions';
    const telemetry = dictionary.category[categoryKey].action.update.label.settings.details[detailsKey];
    this.saving = true;
    this.error = null;
    try {
      const updatedSubject = await updateDiscussable(Object.assign({ subject, discussable: optionsElement.value }, _context.requestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: telemetryConstants.response.SUCCESS }));
      this.subject = updatedSubject;
      this.arcgisHubDiscussionsOptionsModalUpdated.emit(updatedSubject);
    }
    catch (error) {
      this.error = error;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: telemetryConstants.response.FAILURE }));
    }
    finally {
      this.saving = false;
    }
  }
  /**
   * Resets error state
   */
  handleNoticeClosed() {
    this.error = null;
  }
  render() {
    const { intl, saving, open, error, isGroup, canDiscuss } = this;
    return (h(Host, null, h("arcgis-wormhole", null, h("calcite-modal", { closeButtonDisabled: saving, "data-element": "discussions-options-modal", onCalciteModalClose: this.handleModalClosed, open: open, outsideCloseDisabled: true }, h("header", { slot: "header" }, intl.t('header')), h("arcgis-hub-discussions-options", { disabled: saving, layout: "horizontal", onArcgisHubDiscussionsOptionsChange: this.handleOptionsChanged, ref: (optionsElement) => { this.optionsElement = optionsElement; }, slot: "content", value: canDiscuss, variant: isGroup ? DiscussionType.GROUP : DiscussionType.CONTENT }), error && (h("calcite-notice", { closable: true, kind: "danger", onCalciteNoticeClose: this.handleNoticeClosed, open: true, slot: "content" }, h("header", { slot: "title" }, this.intl.t('error.title')), h("p", { slot: "message" }, this.intl.t('error.message')))), h("calcite-button", { appearance: "outline", disabled: saving, onClick: this.handleCloseModal, slot: "secondary", type: "button" }, intl.t('secondary')), h("calcite-button", { disabled: saving, loading: saving, onClick: this.handleSave, slot: "primary", type: "submit" }, intl.t(saving ? 'pending' : 'primary'))))));
  }
  static get is() { return "arcgis-hub-discussions-options-modal"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-options-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-options-modal.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "subject": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "T",
          "resolved": "T",
          "references": {
            "T": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The discussion subject (content or group)"
        }
      },
      "open": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "True to open the modal"
        },
        "attribute": "open",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "saving": {},
      "error": {},
      "canDiscuss": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Telemetry event"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsOptionsModalClosed",
        "name": "arcgisHubDiscussionsOptionsModalClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the modal closed"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsOptionsModalUpdated",
        "name": "arcgisHubDiscussionsOptionsModalUpdated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the subject has been updated"
        },
        "complexType": {
          "original": "T",
          "resolved": "T",
          "references": {
            "T": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "updateCanDiscuss"
      }, {
        "propName": "subject",
        "methodName": "updateCanDiscuss"
      }];
  }
}
