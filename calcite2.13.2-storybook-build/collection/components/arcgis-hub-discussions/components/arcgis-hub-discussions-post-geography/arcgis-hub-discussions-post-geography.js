var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { canModifyPost } from '@esri/hub-discussions';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { Host, h, Fragment } from '@stencil/core';
import { bind } from '../../../../utils/context';
import { fetchRelatedFeatures, pluckDiscussionFeatureIds, convertGeometryTypeToTelemetryString } from '../../utils/discussions';
import intlManager from '../../../../utils/intl-manager';
import MinPromiseDelay from '../../../../decorators/min-promise-delay';
import CallWhen from '../../../../decorators/call-when';
import { getGlobalContext } from '../../../../utils/state';
/** @internal */
export class ArcgisHubDiscussionsPostGeography {
  constructor() {
    /**
     * Default value for maxEntryCount
     */
    this.defaultMaxEntryCount = 4;
    this.intl = undefined;
    this.maxEntryCount = this.defaultMaxEntryCount;
    this.relatedFeatures = undefined;
    this.relatedFeatureIds = [];
    this.activeEditIndex = -1;
    this.loading = true;
    this.postId = undefined;
    this.post = undefined;
    this.parentId = undefined;
    this.channel = undefined;
    this.channelId = undefined;
    this.disabled = undefined;
    this.disabledActions = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldKey = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.hasMap = undefined;
    this.expandable = undefined;
    this.toggleable = undefined;
    this.url = undefined;
    this.renderedInEditor = undefined;
    this.isMobile = undefined;
    this.showLocationDescriptionText = undefined;
    this.locationDescriptionText = undefined;
    bind(this, 'handleGeometrySelected', 'handleToggleAllGeography', 'handleViewAllGeography', 'handleGeometryHovered', 'renderButton', 'renderGeographyItem', 'renderGeographies', 'handleDelete', 'handleEdit');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get _context() {
    return getGlobalContext();
  }
  get featuresLoaded() {
    var _a;
    return this.relatedFeatureIds.length
      ? this.relatedFeatureIds.length === ((_a = this.relatedFeatures) === null || _a === void 0 ? void 0 : _a.length)
      : true;
  }
  componentWillLoad() {
    this.initialize();
  }
  async initialize() {
    this.fetchRelatedFeatures();
    this.updateFeatures();
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  updateFeatures() {
    var _a;
    const ids = pluckDiscussionFeatureIds((_a = this === null || this === void 0 ? void 0 : this.post) === null || _a === void 0 ? void 0 : _a.discussion);
    if (JSON.stringify(ids) !== JSON.stringify(this.relatedFeatureIds)) {
      this.relatedFeatureIds = ids || [];
    }
  }
  handleRelatedFeatureIdsChange() {
    this.relatedFeatures = [];
    this.fetchRelatedFeatures();
  }
  updateLoading() {
    const { intl, featuresLoaded } = this;
    this.loading = !Boolean(intl && featuresLoaded);
  }
  handleFeatureUpdated() {
    this.activeEditIndex = -1;
  }
  async fetchRelatedFeatures() {
    const { url, relatedFeatureIds } = this;
    this.relatedFeatures = relatedFeatureIds.length
      ? (await fetchRelatedFeatures(url, relatedFeatureIds))
      : [];
  }
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channel } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
  }
  /**
   * Get specific details related to geography list item in the list
   * @param evt Mouse Event
   * @returns IFeaturePositionDetails object
   */
  findGeometryFromClickEvent(evt) {
    var _a;
    const { relatedFeatures, unsavedFeatures, unsavedRelatedFeatures, geometries, post } = this;
    const { dataset: { index: _index, related, unsaved } } = evt.target;
    const index = Number(_index);
    const isRelatedFeature = related !== undefined;
    const isStaged = unsaved !== undefined;
    let featureGeometry, relatedFeatureId, featureIndex;
    if (isStaged) {
      featureGeometry = isRelatedFeature
        ? unsavedRelatedFeatures[index - relatedFeatures.length - geometries.length].feature.geometry
        : unsavedFeatures[index - relatedFeatures.length - geometries.length - unsavedRelatedFeatures.length].geometry;
      relatedFeatureId = isRelatedFeature
        ? unsavedRelatedFeatures[index - relatedFeatures.length - geometries.length].objectId
        : null;
      featureIndex = (!isRelatedFeature)
        ? index - unsavedRelatedFeatures.length - geometries.length - relatedFeatures.length
        : null;
    }
    else {
      featureGeometry = isRelatedFeature
        ? relatedFeatures[index].geometry
        : post === null || post === void 0 ? void 0 : post.geometry;
      relatedFeatureId = isRelatedFeature
        ? relatedFeatures[index].id
        : null;
      featureIndex = (!isRelatedFeature && ((_a = post === null || post === void 0 ? void 0 : post.geometry) === null || _a === void 0 ? void 0 : _a.type) === 'GeometryCollection')
        ? index - relatedFeatures.length
        : null;
    }
    return {
      featureGeometry,
      relatedFeatureId,
      featureIndex,
      isStaged,
      originalIndex: index,
      isRelatedFeature
    };
  }
  handleGeometrySelected(evt) {
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.emitHubTelemetry(dictionary.category.interaction.action.zoom.label.in);
    this.arcgisHubDiscussionsPostGeographySelect.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
  }
  /**
   * Emits event when geometry is hovered over
   * @param evt MouseEvent
   */
  handleGeometryHovered(evt) {
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.arcgisHubDiscussionsPostGeographyHover.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
  }
  /**
   * Emits event when geometry is removed
   * @param evt MouseEvent
   */
  handleDelete(evt) {
    evt.stopPropagation();
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.arcgisHubDiscussionsFeatureRemove.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
    if (relatedFeatureId) {
      this.emitHubTelemetry(dictionary.category.interaction.action.deselect.label.content);
    }
    else {
      const type = convertGeometryTypeToTelemetryString(featureGeometry);
      this.emitHubTelemetry(dictionary.category.content.action.delete.label.location.details[type]);
    }
  }
  handleEdit(evt) {
    evt.stopPropagation();
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged, originalIndex: index } = this.findGeometryFromClickEvent(evt);
    const el = evt.target;
    this.activeEditIndex = !el.active ? index : -1;
    if (this.activeEditIndex > -1) {
      this.arcgisHubDiscussionsGeometryDrawEdit.emit({
        type: 'Feature',
        geometry: featureGeometry,
        properties: {
          id: post === null || post === void 0 ? void 0 : post.id,
          relatedFeatureId,
          index: featureIndex,
          unsaved: isStaged,
        }
      });
    }
    else {
      this.arcgisHubDiscussionsGeometryDrawEditCancel.emit();
    }
  }
  handleViewAllGeography() {
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.thread);
    this.arcgisHubDiscussionsPostViewAllGeography.emit();
  }
  handleToggleAllGeography() {
    const { relatedFeatures, maxEntryCount, defaultMaxEntryCount, geometries } = this;
    if (maxEntryCount === defaultMaxEntryCount) {
      this.emitHubTelemetry(dictionary.category.interaction.action.open.label.locations);
      this.maxEntryCount = relatedFeatures.length + geometries.length;
    }
    else {
      this.emitHubTelemetry(dictionary.category.interaction.action.close.label.locations);
      this.maxEntryCount = defaultMaxEntryCount;
    }
  }
  get geometries() {
    const { post } = this;
    const geometries = [];
    if (post === null || post === void 0 ? void 0 : post.geometry) {
      post.geometry.type === 'GeometryCollection'
        ? geometries.push(...post.geometry.geometries)
        : geometries.push(post.geometry);
    }
    return geometries;
  }
  renderActions(index, isRelatedFeature, isStaged) {
    const { intl, activeEditIndex, hasMap, isMobile, disabledActions } = this;
    const isActive = index === activeEditIndex;
    const actions = [
      h("calcite-action", { active: isActive, class: "discussions-post-geography-edit", "data-index": index, "data-related": isRelatedFeature, "data-unsaved": isStaged, disabled: disabledActions, key: "pencil", onClick: this.handleEdit, scale: "m", slot: "actions-end", text: intl.t('action.update') }, h("calcite-icon", { class: "discussions-post-geography-edit-icon", icon: "pencil", scale: "s" })),
      h("calcite-action", { class: "discussions-post-geography-delete", "data-index": index, "data-related": isRelatedFeature, "data-unsaved": isStaged, disabled: disabledActions, key: "trash", onClick: this.handleDelete, scale: "m", slot: "actions-end", text: intl.t('action.remove') }, h("calcite-icon", { class: "discussions-post-geography-delete-icon", icon: "trash", scale: "s" }))
    ];
    if (isRelatedFeature || !hasMap || isMobile) {
      // Edit actions only available on unsaved drawn geometries
      actions.shift();
    }
    return actions;
  }
  renderGeographyItem(feature, index, isRelatedFeature = false, isStaged = false) {
    const { intl, displayFieldValid, displayFieldKey, locationDescriptionText, showLocationDescriptionText } = this;
    const { geometry, properties } = feature;
    let desc;
    if (showLocationDescriptionText) {
      desc = (locationDescriptionText)
        ? locationDescriptionText
        : intl.t('description');
    }
    let label;
    let icon;
    let text;
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
      label = isRelatedFeature ? intl.t('displayField.existing') : intl.t('displayField.added');
      icon = 'pin';
      text = intl.t('point');
    }
    else if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
      label = isRelatedFeature ? intl.t('displayField.existing') : intl.t('displayField.added');
      icon = 'freehand';
      text = intl.t('line');
    }
    else if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
      label = isRelatedFeature ? intl.t('displayField.existing.area') : intl.t('displayField.added.area');
      icon = 'freehand-area';
      text = intl.t('area');
    }
    if (isRelatedFeature && displayFieldValid) {
      // Use displayField if available to reference location
      label = properties[displayFieldKey];
    }
    return (h("calcite-list-item", { "data-index": index, "data-related": isRelatedFeature, "data-unsaved": isStaged, description: desc, label: label, onClick: this.handleGeometrySelected, onMouseOver: this.handleGeometryHovered }, h("calcite-icon", { icon: icon, scale: "s", slot: "content-start", textLabel: text }), this.renderActions(index, isRelatedFeature, isStaged)));
  }
  renderButton(listLength) {
    const { intl, maxEntryCount, defaultMaxEntryCount, expandable, toggleable } = this;
    if (expandable && listLength > maxEntryCount) {
      return h("calcite-action", { class: "overflow", onClick: this.handleViewAllGeography, scale: "s", text: intl.t('viewAll'), "text-enabled": true });
    }
    else if (toggleable && listLength > defaultMaxEntryCount) {
      return (h("calcite-action", { class: "overflow", onClick: this.handleToggleAllGeography, scale: "s", text: listLength > maxEntryCount ? intl.t('viewAll') : intl.t('viewLess'), "text-enabled": true }));
    }
  }
  get listItems() {
    const { geometries, relatedFeatures, maxEntryCount, expandable, toggleable, unsavedFeatures, unsavedRelatedFeatures, renderedInEditor } = this;
    const toGeographyItem = (acc, feature, isRelatedFeature = false, isStaged = false) => (acc.length < maxEntryCount || (!expandable && !toggleable))
      ? [...acc, this.renderGeographyItem(feature, acc.length, isRelatedFeature, isStaged)]
      : acc;
    // Related Features
    let listItems = relatedFeatures.reduce((acc, feature) => toGeographyItem(acc, feature, true), []);
    // Drawn Geometries
    listItems = geometries.reduce((acc, geometry) => toGeographyItem(acc, { geometry }), listItems);
    if (renderedInEditor) {
      // Unsaved Related Features
      listItems = unsavedRelatedFeatures.reduce((acc, { feature }) => toGeographyItem(acc, feature, true, true), listItems);
      // Unsaved Drawn Geometries
      listItems = unsavedFeatures.reduce((acc, feature) => toGeographyItem(acc, feature, false, true), listItems);
    }
    return listItems;
  }
  renderGeographies() {
    const { geometries, relatedFeatures, listItems, disabled } = this;
    return (h(Fragment, null, h("calcite-list", { disabled: disabled }, listItems), this.renderButton(relatedFeatures.length + geometries.length)));
  }
  renderSkeleton() {
    const { relatedFeatureIds, geometries } = this;
    const entries = relatedFeatureIds.length + geometries.length > 4 ? 4 : relatedFeatureIds.length + geometries.length;
    return Array.from({ length: entries }, (_, idx) => {
      return (h("arcgis-skeleton-loader", { active: true, key: idx, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, h("div", null), h("div", null, h("div", null), h("div", null))));
    });
  }
  render() {
    return (h(Host, { "data-count": this.loading ? 0 : this.listItems.length, "data-element": "discussions-post-geography" }, this.loading
      ? this.renderSkeleton()
      : this.renderGeographies()));
  }
  static get is() { return "arcgis-hub-discussions-post-geography"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-geography.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-geography.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "loading": {
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
          "text": "Should display loading state"
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "true"
      },
      "postId": {
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
        "attribute": "post-id",
        "reflect": false
      },
      "post": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
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
      "parentId": {
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
        "attribute": "parent-id",
        "reflect": false
      },
      "channel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IChannel",
          "resolved": "IChannel",
          "references": {
            "IChannel": {
              "location": "import",
              "path": "@esri/hub-discussions"
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
      "channelId": {
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
        "attribute": "channel-id",
        "reflect": false
      },
      "disabled": {
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
          "text": "If the list should be in a disabled state"
        },
        "attribute": "disabled",
        "reflect": false
      },
      "disabledActions": {
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
          "text": "If the geometry edit / delete actions should be rendered in a disabled state"
        },
        "attribute": "disabled-actions",
        "reflect": false
      },
      "displayFieldValid": {
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
        "attribute": "display-field-valid",
        "reflect": false
      },
      "displayFieldKey": {
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
        "attribute": "display-field-key",
        "reflect": false
      },
      "unsavedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Features (geometries) unsaved for location updates"
        }
      },
      "unsavedRelatedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPostRelatedFeatureDetails[]",
          "resolved": "IPostRelatedFeatureDetails[]",
          "references": {
            "IPostRelatedFeatureDetails": {
              "location": "import",
              "path": "../../utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Related Features (ID's of features in associated feature service) unsaved for location updates"
        }
      },
      "unsavedExistingFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Feature geometry edits for existing post locations"
        },
        "defaultValue": "[]"
      },
      "hasMap": {
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
          "text": "If a map is present on the page"
        },
        "attribute": "has-map",
        "reflect": false
      },
      "expandable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If the component should truncate geography"
        },
        "attribute": "expandable",
        "reflect": false
      },
      "toggleable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If the button should toggle between \"view all\" and \"view less\""
        },
        "attribute": "toggleable",
        "reflect": false
      },
      "url": {
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
          "text": "URL to fetch related features"
        },
        "attribute": "url",
        "reflect": false
      },
      "renderedInEditor": {
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
          "text": "If component is rendered inside post-editor or reply-editor"
        },
        "attribute": "rendered-in-editor",
        "reflect": false
      },
      "isMobile": {
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
          "text": "If the body width is < 768px"
        },
        "attribute": "is-mobile",
        "reflect": false
      },
      "showLocationDescriptionText": {
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
          "text": "If the location description should render"
        },
        "attribute": "show-location-description-text",
        "reflect": false
      },
      "locationDescriptionText": {
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
          "text": "An alternative location description string"
        },
        "attribute": "location-description-text",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "intl": {},
      "maxEntryCount": {},
      "relatedFeatures": {},
      "relatedFeatureIds": {},
      "activeEditIndex": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsPostGeographySelect",
        "name": "arcgisHubDiscussionsPostGeographySelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user selects a geometry item"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsPostGeographyHover",
        "name": "arcgisHubDiscussionsPostGeographyHover",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user hovers over a geometry item"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsPostViewAllGeography",
        "name": "arcgisHubDiscussionsPostViewAllGeography",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user selects the \"View all locations\" action"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostEdit",
        "name": "arcgisHubDiscussionsPostEdit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user successfully removes or updates a post geography"
        },
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDrawEdit",
        "name": "arcgisHubDiscussionsGeometryDrawEdit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user edits a drawn geometry for the post"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDrawEditCancel",
        "name": "arcgisHubDiscussionsGeometryDrawEditCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user edits a drawn geometry for the post"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsFeatureRemove",
        "name": "arcgisHubDiscussionsFeatureRemove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted during an editing session to remove unsaved graphics from the map"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
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
          "text": "Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "post",
        "methodName": "updateFeatures"
      }, {
        "propName": "relatedFeatureIds",
        "methodName": "handleRelatedFeatureIdsChange"
      }, {
        "propName": "intl",
        "methodName": "updateLoading"
      }, {
        "propName": "relatedFeatures",
        "methodName": "updateLoading"
      }, {
        "propName": "unsavedFeatures",
        "methodName": "handleFeatureUpdated"
      }, {
        "propName": "unsavedExistingFeatures",
        "methodName": "handleFeatureUpdated"
      }];
  }
}
__decorate([
  CallWhen({ when() { return this.activeEditIndex > -1; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleFeatureUpdated", null);
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsPostGeography.prototype, "fetchRelatedFeatures", null);
__decorate([
  CallWhen({ when() { return !this.disabled; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleGeometrySelected", null);
__decorate([
  CallWhen({ when() { return !this.disabled; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleGeometryHovered", null);
__decorate([
  CallWhen({ when() {
      const { _context: { currentUser }, channel, renderedInEditor } = this;
      const { post } = this;
      return renderedInEditor && (!post || canModifyPost(post, currentUser, channel));
    } })
], ArcgisHubDiscussionsPostGeography.prototype, "renderActions", null);
__decorate([
  CallWhen({ when: function ({ geometry }) { return Boolean(geometry); } })
], ArcgisHubDiscussionsPostGeography.prototype, "renderGeographyItem", null);
