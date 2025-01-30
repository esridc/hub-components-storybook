import { Host, getAssetPath, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getGlobalContext, getSiteHomeUrl } from '../../utils';
const getStateDefaultValue = (state, key, context) => {
  // default prop values for the above pre-defined states
  // NOTE: default strings are in locales and use _getMessage()
  const stateDefaults = {
    // NOTE: default image URLs should be a relative path to the assets folder
    // and will have the asset path appended at runtime
    unauthenticated: {
      // NOTE: before using the fallback, the hub app tries to get
      // appSettings.portalInfo.portalProperties.sharedTheme.logo.small
      imageUrl: './assets/sign-in-generic.svg',
      // add default telemetry?
    },
    'not-found': {
      icon: 'file-magnifying-glass',
      actionLink: getSiteHomeUrl(window.location.href, window.location.origin, context),
      // add default icon and/or telemetry?
    },
    'unsupported-device': {
      icon: 'mobile-off',
      telemetry: dictionary.category.navigation.action.view.label.content,
      viewedTelemetry: dictionary.category.interaction.action.viewed.label.notice.details.unsupportedDevice,
    },
    'access-denied': {
      icon: 'lock',
      actionLink: getSiteHomeUrl(window.location.href, window.location.origin, context),
    },
    loading: {}
  };
  const defaults = stateDefaults[state] || {};
  return defaults[key];
};
export class ArcgisHubHelpState {
  constructor() {
    this.heading = undefined;
    this.icon = undefined;
    this.imageUrl = undefined;
    this.message = undefined;
    this.actionText = undefined;
    this.actionLink = undefined;
    this.loadingLabel = undefined;
    this.telemetry = undefined;
    this.viewedTelemetry = undefined;
    this.state = undefined;
    this.headingLevel = 3;
    this.scale = 'm';
    this.kind = undefined;
    this.isMain = true;
    bind(this, 'handleClick');
  }
  get _context() { return getGlobalContext(); }
  get _imageUrl() {
    const { imageUrl } = this;
    return imageUrl
      ? imageUrl
      : this._fallbackImageUrl;
  }
  get _fallbackImageUrl() {
    const fallbackImageUrl = getStateDefaultValue(this.state, 'imageUrl', this._context);
    return fallbackImageUrl
      ? getAssetPath(fallbackImageUrl)
      : undefined;
  }
  _getProp(name) {
    const value = this[name];
    return value !== undefined
      // override with prop value
      ? value
      // get default value for state, if any
      : getStateDefaultValue(this.state, name, this._context);
  }
  _getMessage(name) {
    const value = this[name];
    return typeof value === 'string'
      // override with prop value
      ? value
      : this.state
        // get translated string for state
        ? this.intl.t(`${this.state}.${name}`)
        : undefined;
  }
  handleClick(e) {
    // prevent any further handlers from being called
    e.stopPropagation();
    const telemetry = this._getProp('telemetry');
    this.arcgisHubHelpStateActionClick.emit();
    if (telemetry) {
      this.hubTelemetry.emit(telemetry);
    }
  }
  async componentWillLoad() {
    // set up intl
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  async componentDidLoad() {
    const telemetry = this._getProp('viewedTelemetry');
    if (telemetry) {
      this.hubTelemetry.emit(telemetry);
    }
  }
  _renderLoader() {
    if (this.state === 'loading') {
      return h("calcite-loader", { active: true, label: this._getMessage('loadingLabel'), scale: this.scale });
    }
  }
  _renderImage() {
    let result;
    const heading = this._getMessage('heading');
    const icon = this._getProp('icon');
    if (!!this._imageUrl) {
      result = h("img", { alt: heading, src: this._imageUrl });
    }
    else if (!!icon) {
      result = h("calcite-icon", { icon: icon, id: "help-icon", scale: this.scale });
    }
    return result;
  }
  render() {
    const heading = this._getMessage('heading');
    const actionText = this._getMessage('actionText');
    // styles and aria role may need to change
    // for in-line vs "splash" screen use
    const HeadingTag = `h${this.headingLevel}`;
    return (h(Host, { "aria-live": "polite", "data-element": "help-state", role: this.isMain ? "main" : "" }, this._renderLoader(), this._renderImage(), h("slot", { name: "heading" }, h(HeadingTag, null, heading)), h("slot", { name: "message" }, h("p", null, this._getMessage('message'))), h("slot", { name: "actions" }, !!actionText &&
      h("div", { class: "actions" }, h("calcite-button", { href: this._getProp('actionLink'), onClick: this.handleClick, round: true, scale: this.scale }, actionText)))));
  }
  static get is() { return "arcgis-hub-help-state"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-help-state.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-help-state.css"]
    };
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  static get properties() {
    return {
      "heading": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Heading text"
        },
        "attribute": "heading",
        "reflect": false
      },
      "icon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Name of Calcite icon to show above header. If both `icon` and `imageUrl` are set the image is shown."
        },
        "attribute": "icon",
        "reflect": false
      },
      "imageUrl": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "URL to an image to show above header."
        },
        "attribute": "image-url",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "More detailed message"
        },
        "attribute": "message",
        "reflect": false
      },
      "actionText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Button text for action. If not set, no button will show."
        },
        "attribute": "action-text",
        "reflect": false
      },
      "actionLink": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "URL for action. If provided the action will be rendered as and behave like a link."
        },
        "attribute": "action-link",
        "reflect": false
      },
      "loadingLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A label to apply to the calcite laoder. Only applies to the loading state."
        },
        "attribute": "loading-label",
        "reflect": false
      },
      "telemetry": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, string>",
          "resolved": "{ [x: string]: string; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Telemetry to log when an action is clicked.\nNOTE: telemetry events passed into this\nprop should come from our telemetry dictionary."
        }
      },
      "viewedTelemetry": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, string>",
          "resolved": "{ [x: string]: string; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "state": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HelpState",
          "resolved": "\"access-denied\" | \"loading\" | \"not-found\" | \"unauthenticated\" | \"unsupported-device\"",
          "references": {
            "HelpState": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Pre-defined help state w/ default properties"
        },
        "attribute": "state",
        "reflect": false
      },
      "headingLevel": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "HeadingLevel",
          "resolved": "1 | 2 | 3 | 4 | 5 | 6",
          "references": {
            "HeadingLevel": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "heading-level",
        "reflect": false,
        "defaultValue": "3"
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": true,
        "defaultValue": "'m'"
      },
      "kind": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Exclude<Kind, \"inverse | neutral\">",
          "resolved": "\"brand\" | \"danger\" | \"info\" | \"inverse\" | \"neutral\" | \"success\" | \"warning\"",
          "references": {
            "Exclude": {
              "location": "global"
            },
            "Kind": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "kind",
        "reflect": true
      },
      "isMain": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-main",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubHelpStateActionClick",
        "name": "arcgisHubHelpStateActionClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
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
          "original": "Record<string, string>",
          "resolved": "{ [x: string]: string; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
}
