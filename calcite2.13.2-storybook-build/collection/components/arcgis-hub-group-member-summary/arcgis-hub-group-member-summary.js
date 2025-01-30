import { searchGroupUsers } from '@esri/arcgis-rest-portal';
import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { connectContext, getGlobalContext } from '../../utils/state';
import { HubUserAvatar } from '../functional/hub-user-avatar';
export class ArcgisHubGroupMemberSummary {
  constructor() {
    this._context = getGlobalContext();
    this.identifier = undefined;
    this.membershipSummary = undefined;
    this.limit = 3;
    this.memberType = undefined;
    this.hasMembersError = false;
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (!this.membershipSummary) {
      this.fetchMembers();
    }
  }
  async fetchMembers() {
    try {
      const context = this._context;
      this.hasMembersError = false;
      if (context && (this === null || this === void 0 ? void 0 : this.identifier)) {
        const options = {
          num: this.limit,
          sortField: 'memberType',
          memberType: this.memberType
        };
        if (context === null || context === void 0 ? void 0 : context.session) {
          options.authentication = context.session;
        }
        else {
          options.portal = context.sharingApiUrl;
        }
        const result = await searchGroupUsers(this.identifier, options);
        this.membershipSummary = { total: result.total, users: result.users };
      }
    }
    catch (error) {
      this.hasMembersError = true;
      console.error('Error fetching group members:', error.message);
    }
  }
  getMemberCount(count) {
    const i18nBase = this.memberType === 'admin' ? 'managers' : 'members';
    if (count === 0) {
      return this.intl.t(`${i18nBase}.noMember`);
    }
    else if (count === 1) {
      return this.intl.t(`${i18nBase}.oneMember`);
    }
    else {
      return this.intl.t(`${i18nBase}.members`, { count });
    }
  }
  renderMembers(summary) {
    const context = this._context;
    // if we got an error fetching members, do not try to render members
    if (!this.hasMembersError) {
      // if we got context but do not yet have members it means we are fetching them but don't have them yet (we will set a loading class below)
      let result = '&nbsp;';
      if (summary) {
        result = h(Fragment, null, h("div", { class: "members-inner" }, summary.users.map(member => {
          return h(HubUserAvatar, { context: context, key: member.username, scale: 's', user: member });
        })), h("span", { class: "members-count" }, this.getMemberCount(summary.total)));
      }
      return (h("div", { class: {
          ["members-container"]: true,
          loading: !summary
        }, slot: "subtitle" }, result));
    }
  }
  render() {
    return (h(Host, null, this.renderMembers(this.membershipSummary)));
  }
  static get is() { return "arcgis-hub-group-member-summary"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-group-member-summary.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-group-member-summary.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "identifier": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "identifier",
        "reflect": false
      },
      "membershipSummary": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IGroupMembershipSummary",
          "resolved": "IGroupMembershipSummary",
          "references": {
            "IGroupMembershipSummary": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "3"
      },
      "memberType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'member' | 'admin'",
          "resolved": "\"admin\" | \"member\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "member-type",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "hasMembersError": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "identifier",
        "methodName": "fetchMembers"
      }, {
        "propName": "_context",
        "methodName": "fetchMembers"
      }];
  }
}
