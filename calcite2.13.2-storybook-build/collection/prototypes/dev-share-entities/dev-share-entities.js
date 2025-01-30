import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { fetchHubEntity, fetchHubGroup } from '@esri/hub-common';
import { shareEntitiesToGroups, unshareEntitiesToGroups } from '../../utils/add-content/utils';
import { bind } from '../../utils/context';
export class DevShareEntities {
  constructor() {
    this.groups = undefined;
    this.ids = undefined;
    this.results = undefined;
    this.loading = true;
    bind(this, 'unshare', 'share');
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    const groups = this.groups.split(',');
    const ids = this.ids.split(',');
    // fetch all the groups and entities
    this.hubGroups = await Promise.all(groups.map(async (groupId) => {
      return await fetchHubGroup(groupId, this._context.hubRequestOptions);
    }));
    this.hubEntities = await Promise.all(ids.map(async (id) => {
      return await fetchHubEntity("content", id, this._context);
    }));
    this.results = {
      groups: this.hubGroups.map((g) => { return { id: g.id, title: g.name }; }),
      entities: this.hubEntities.map((g) => { return { id: g.id, title: g.name, owner: g.owner }; }),
    };
    this.loading = false;
  }
  async unshare() {
    this.loading = true;
    this.results = await unshareEntitiesToGroups(this.hubGroups, this.hubEntities, this._context);
    this.loading = false;
  }
  async share() {
    this.loading = true;
    this.results = await shareEntitiesToGroups(this.hubGroups, this.hubEntities, this._context);
    this.loading = false;
  }
  render() {
    return (h(Host, { "data-element": "dev-share-entities" }, this.loading
      ? h("div", null, "Loading...")
      : h("div", null, h("h2", null, "Complete"), h("button", { onClick: this.share }, "Share"), h("button", { onClick: this.unshare }, "UnShare"), h("pre", null, JSON.stringify(this.results, null, 2)))));
  }
  static get is() { return "dev-share-entities"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "groups": {
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
        "attribute": "groups",
        "reflect": false
      },
      "ids": {
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
        "attribute": "ids",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "results": {},
      "loading": {}
    };
  }
}
