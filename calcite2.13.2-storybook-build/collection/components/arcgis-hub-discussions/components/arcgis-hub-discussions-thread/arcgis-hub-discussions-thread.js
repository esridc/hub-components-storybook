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
import { Host, h, Fragment } from '@stencil/core';
import { isDiscussable } from '@esri/hub-discussions';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import CallOnce from '../../../../decorators/call-once';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from '../arcgis-hub-discussions-blocked-notice/resources';
import MinPromiseDelay from '../../../../decorators/min-promise-delay';
import { fetchEnvironmentDetails } from '../../../../utils/discussions/fetch-environment-details';
import { fetchEntityDetails } from '../../../../utils/discussions/fetch-entity-details';
import { fetchChannelDetails } from '../../../../utils/discussions/fetch-channel-details';
import { fetchPostDetails } from '../../../../utils/discussions/fetch-post-details';
import { fetchParentDetails } from '../../../../utils/discussions/fetch-parent-details';
import { fetchParentUserDetails } from '../../../../utils/discussions/fetch-parent-user-details';
import { connectContext, getGlobalContext } from '../../../../utils/state';
// TODO: e2e test updates
var ThreadView;
(function (ThreadView) {
  ThreadView["Loading"] = "loading";
  ThreadView["ParentAndReply"] = "parent_and_reply";
  ThreadView["ParentAndReplies"] = "parent_and_replies";
  ThreadView["ThreadDeleted"] = "thread_deleted";
  ThreadView["ChannelDeleted"] = "channel_deleted";
})(ThreadView || (ThreadView = {}));
export class ArcgisHubDiscussionsThread {
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor() {
    this.hasMap = undefined;
    this.isHub = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.postId = undefined;
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.parent = undefined;
    this.parentId = undefined;
    this.parentCreator = undefined;
    this.parentCreatorOrg = undefined;
    this.channelId = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.discussion = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entity = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.isMobile = undefined;
    this.locationId = undefined;
    this.showLocations = undefined;
    this.disableSelectExistingLocation = undefined;
    this.locationDescriptionText = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this._context = getGlobalContext();
    this.intl = undefined;
    this._loading = undefined;
    this.parentReady = false;
    this.postReady = false;
    this.postListReady = false;
    this.postEditorReady = false;
    this.ready = false;
    bind(this, 'renderParentAndReply', 'renderParentAndReplies', 'renderThreadDeleted', 'handleViewAllReplies', 'handleViewAllPosts', 'renderLoading', 'handleParentReady', 'handlePostReady', 'handlePostListReady', 'handlePostEditorReady', 'handleSignInClicked');
  }
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad() {
    this.initialize();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations and dependencies
   */
  async initialize() {
    this.loadTranslations();
    if (this._context) {
      this.loadDependencies();
    }
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies
   */
  async loadDependencies() {
    this._loading = true;
    return this.fetchDependencies().then(dependencies => {
      Object.assign(this, dependencies);
      this._loading = false;
    });
  }
  /**
   * Wraps the _fetchDependencies method with a minimum delay so
   * skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Watches for changes to context and loads dependencies
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loadDependencies();
    }
  }
  /**
   * Handles parent post's arcgisHubDiscussionsPostReady event
   */
  handleParentReady() {
    this.parentReady = true;
    this.updateReady();
  }
  /**
   * Handles reply post's arcgisHubDiscussionsPostReady event
   */
  handlePostReady() {
    this.postReady = true;
    this.updateReady();
  }
  /**
   * Handles arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady() {
    this.postEditorReady = true;
    this.updateReady();
  }
  /**
   * Handles arcgisHubDiscussionsPostListReady event
   */
  handlePostListReady() {
    this.postListReady = true;
    this.updateReady();
  }
  /**
   * Watches for change to ready and fires arcgisHubDiscussionsThreadReady when true
   */
  handleReadyChange(ready) {
    if (ready) {
      this.arcgisHubDiscussionsThreadReady.emit();
    }
  }
  /**
   * Updates ready state when elements (parent, post editor, reply or post list) fire their ready event
   */
  updateReady() {
    const elementReadyStates = [
      [this.postEditorRef, this.postEditorReady],
      [this.parentRef, this.parentReady],
      [this.postRef, this.postReady],
      [this.postListRef, this.postListReady],
    ];
    this.ready = elementReadyStates
      .filter(([elRef]) => Boolean(elRef))
      .every(([_elRef, elReady]) => elReady);
  }
  /**
   * Method that resolves a reference to the post editor component
   */
  async getPostEditorRef() {
    return this.postEditorRef;
  }
  /**
   * Method that resolves a reference to the post list component
   */
  async getPostListRef() {
    return this.postListRef;
  }
  /**
   * Fetches dependencies
   */
  async _fetchDependencies() {
    const { isHub, _context, postId, post, parent, parentId, discussion, entityId, entityType, entity, locationId, parentCreator, channelId, channel, channelGroups, displayFieldKey, displayFieldValid, displayFieldValue, } = this;
    const [postDetails, environmentDetails] = await Promise.all([
      fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const parentDetails = await fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions);
    const [parentUserDetails, entityDetails, channelDetails] = await Promise.all([
      fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
      fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, locationId, displayFieldKey, displayFieldValid, displayFieldValue }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails(Object.assign(Object.assign({ channelId, channel, channelGroups }, postDetails), parentDetails), _context.hubRequestOptions),
    ]);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, postDetails), parentDetails), parentUserDetails), environmentDetails), entityDetails), channelDetails);
  }
  /**
   * Computes true when no context provided or dependencies are
   * being fetched
   */
  get loading() {
    const { intl, _loading, _context, channel } = this;
    return !intl || !_context || _loading || channel === undefined;
  }
  /**
   * Handles arcgisHubDiscussionsPostDelete events and updates state if the deleted
   * post is rendered within this thread
   * @param evt arcgisHubDiscussionsPostDelete event
   */
  handlePostOrReplyDeleted(evt) {
    const { parent, post } = this;
    if (evt.detail.id === (parent === null || parent === void 0 ? void 0 : parent.id) || evt.detail.id === (post === null || post === void 0 ? void 0 : post.id)) {
      if (evt.detail.id === (parent === null || parent === void 0 ? void 0 : parent.id)) {
        this.parent = null;
      }
      else {
        this.post = null;
      }
      this.deletedDuringSession = true;
    }
  }
  /**
   * Handles clicks to the View All Replies action
   */
  handleViewAllReplies() {
    const { channelId, channel, channelGroups, parent, parentId, postId, parentCreator, parentCreatorOrg } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      channel,
      channelId,
      channelGroups,
      parentId,
      parent,
      parentCreator,
      parentCreatorOrg,
    });
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.thread), { postId,
      parentId }));
  }
  /**
   * Handles clicks to the View All Posts action
   */
  handleViewAllPosts() {
    const { parentId, postId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      channelId: null,
      channel: null,
      channelGroups: null,
      parent: null,
      parentId: null,
      parentCreator: null,
      parentCreatorOrg: null,
    });
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.close.label.thread), { postId,
      parentId }));
  }
  /**
   * Emits hub telemetry events, adding common properties
   */
  emitHubTelemetry(telemetry) {
    const { channelId, channel } = this;
    this.hubTelemetry.emit(Object.assign({ channelId: channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }, telemetry));
  }
  /**
   * Computes map of views to render methods
   */
  get views() {
    const { renderLoading, renderParentAndReply, renderParentAndReplies, renderThreadDeleted, renderChannelDeleted } = this;
    return {
      [ThreadView.Loading]: {
        render: renderLoading,
      },
      [ThreadView.ParentAndReply]: {
        render: renderParentAndReply,
      },
      [ThreadView.ParentAndReplies]: {
        render: renderParentAndReplies,
      },
      [ThreadView.ThreadDeleted]: {
        render: renderThreadDeleted,
      },
      [ThreadView.ChannelDeleted]: {
        render: renderChannelDeleted,
      },
    };
  }
  /**
   * Computes the correct view to render
   */
  get view() {
    const { views, parentId, postId, parent, post, loading, channel } = this;
    let target;
    if (loading) {
      target = ThreadView.Loading;
    }
    else if (channel === null) {
      target = ThreadView.ChannelDeleted;
    }
    else if (parentId && postId && parent === null && post === null) {
      target = ThreadView.ThreadDeleted;
    }
    else if (postId) {
      target = ThreadView.ParentAndReply;
    }
    else {
      target = ThreadView.ParentAndReplies;
    }
    return views[target];
  }
  /**
   * Overrides or suppresses specific telemetry events that vary when viewing within
   * a thread. This is not ideal, but avoids the need to pass telemetry-only props after
   * consolidation refactor
   * @param evt hubTelemetry event
   */
  handleHubTelemetry(evt) {
    const eventsToOverride = [
      {
        from: dictionary.category.interaction.action.viewed.label.post.details.postList,
        to: dictionary.category.interaction.action.viewed.label.post.details.thread,
      },
      {
        from: dictionary.category.interaction.action.open.label.postList,
        to: null,
      },
    ];
    const isEvent = (details) => Object.entries(details).every(([key, val]) => { var _a; return ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a[key]) === val; });
    const eventToOverride = eventsToOverride.find(({ from }) => isEvent(from));
    if (eventToOverride) {
      if (eventToOverride.to) {
        Object.assign(evt.detail, eventToOverride.to);
      }
      else {
        evt.stopPropagation();
      }
    }
  }
  /**
   * Captures thread deleted impression
   */
  captureThreadDeletedImpression() {
    const { postId, parentId } = this;
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.post.details.thread), { postId,
      parentId, response: telemetryConstants.response.FAILURE }));
  }
  /**
   * Computes blocked notice configuration
   */
  get blockedNotice() {
    const { entity, entityType, channelGroups } = this;
    const areGroupsDiscussable = (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length)
      ? channelGroups.every(group => !group || isDiscussable(group))
      : true;
    const isSubjectDiscussable = isDiscussable(entity);
    let variant;
    if (!areGroupsDiscussable && !isSubjectDiscussable) {
      variant = ArcgisHubDiscussionsBlockedNoticeVariant.Reply;
    }
    else if (!areGroupsDiscussable) {
      variant = ArcgisHubDiscussionsBlockedNoticeVariant.Group;
    }
    else if (!isSubjectDiscussable) {
      variant = entityType === 'group' ? ArcgisHubDiscussionsBlockedNoticeVariant.Group : ArcgisHubDiscussionsBlockedNoticeVariant.Item;
    }
    return variant;
  }
  /**
   * Renders when deep linking to a thread or reply but the channel was deleted.
   * TODO: add long-term UI.
   */
  renderChannelDeleted() {
    return h("p", null, "channel deleted");
  }
  /**
   * Renders the parent post
   */
  renderParent() {
    const { channel, channelGroups, channelId, discussion, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, entity, entityId, entityType, hasMap, isHub, isMobile, locationDescriptionText, locationId, parentId, parent, unsavedExistingFeatures, unsavedFeatures, unsavedRelatedFeatures, parentCreator, parentCreatorOrg, handleParentReady, showLocations, } = this;
    return (h("arcgis-hub-discussions-post", { channel: channel, channelGroups: channelGroups, channelId: channelId, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostReady: handleParentReady, parentCreatorOrg: parentCreatorOrg, post: parent, postCreator: parentCreator, postId: parentId, ref: (parentRef) => { this.parentRef = parentRef; }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
  }
  /**
   * Renders the reply editor
   */
  renderReplyEditor() {
    const { _context, hasMap, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, isHub, discussion, parentId, parent, entity, entityId, entityType, channelId, channel, channelGroups, isMobile, locationId, handlePostEditorReady, showLocations, disableSelectExistingLocation, blockedNotice, } = this;
    if (Boolean(parent) && !blockedNotice && _context.currentUser) {
      return (h("arcgis-hub-discussions-post-editor", { channel: channel, channelGroups: channelGroups, channelId: channelId, disableSelectExistingLocation: disableSelectExistingLocation, discussion: discussion, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationId: locationId, onArcgisHubDiscussionsPostEditorReady: handlePostEditorReady, parent: parent, parentId: parentId, ref: (postEditorRef) => {
          this.postEditorRef = postEditorRef;
        }, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
    }
  }
  handleSignInClicked() {
    this.arcgisAppIdentityStartSignIn.emit();
  }
  /**
   * Renders applicable notice
   */
  renderNotice() {
    const { blockedNotice, intl, _context } = this;
    let notice;
    if (blockedNotice) {
      notice = (h("arcgis-hub-discussions-blocked-notice", { variant: blockedNotice }));
    }
    else if (!_context.currentUser) {
      notice = (h("calcite-notice", { icon: "information", kind: "info", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('signInTitle')), h("calcite-link", { onClick: this.handleSignInClicked, slot: "link" }, intl.t('signInAction'))));
    }
    return notice;
  }
  /**
   * Renders the post + replies view
   */
  renderParentAndReplies() {
    const { hasMap, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, displayFieldKey, displayFieldValid, displayFieldValue, intl, isHub, discussion, parentId, entity, entityId, entityType, isMobile, locationDescriptionText, locationId, handlePostListReady, showLocations, } = this;
    return (h(Fragment, null, this.renderParent(), this.renderReplyEditor(), this.renderNotice(), h("arcgis-hub-discussions-post-list", { discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostListReady: handlePostListReady, parentIds: [parentId], ref: (postListRef) => {
        this.postListRef = postListRef;
      }, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }, h("calcite-notice", { kind: "danger", open: true, scale: "m", slot: "error" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t('repliesFailure'))))));
  }
  /**
   * Renders deep-linked reply view
   */
  renderParentAndReply() {
    const { intl, handleViewAllReplies, post, postCreator, postCreatorOrg, unsavedFeatures, hasMap, isHub, unsavedRelatedFeatures, unsavedExistingFeatures, channel, channelGroups, channelId, isMobile, locationId, discussion, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, entity, entityId, entityType, parentId, parent, parentCreator, parentCreatorOrg, postId, handlePostReady, } = this;
    return (h(Fragment, null, this.renderParent(), Boolean(post) && (h("calcite-notice", { open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('reply.single.title')), h("calcite-link", { onClick: handleViewAllReplies, slot: "link" }, intl.t('reply.single.link')))), h("arcgis-hub-discussions-post", { channel: channel, channelGroups: channelGroups, channelId: channelId, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: this.locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostReady: handlePostReady, parent: parent, parentCreator: parentCreator, parentCreatorOrg: parentCreatorOrg, parentId: parentId, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, postId: postId, ref: (postRef) => { this.postRef = postRef; }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: this.showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures })));
  }
  /**
   * Renders thread deleted notice
   */
  renderThreadDeleted() {
    const { intl, deletedDuringSession } = this;
    if (!deletedDuringSession) {
      this.captureThreadDeletedImpression();
    }
    return (h("calcite-notice", { kind: "danger", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('thread.deleted.title')), h("div", { slot: "message" }, intl.t('thread.deleted.message')), h("calcite-link", { onClick: this.handleViewAllPosts, slot: "link" }, intl.t('thread.deleted.action'))));
  }
  /**
   * Renders loading state
   */
  renderLoading() {
    // TODO: skeleton state?
    return null;
  }
  /**
   * Primary render method
   */
  render() {
    const { view } = this;
    return h(Host, { "data-element": "discussions-thread" }, view.render());
  }
  static get is() { return "arcgis-hub-discussions-thread"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-thread.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-thread.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
      "isHub": {
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
          "text": "If this component is embedded in a Hub site"
        },
        "attribute": "is-hub",
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
          "text": "A Feature selected from a map"
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
          "text": "A related Feature from a map"
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
      "postId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an existing reply."
        },
        "attribute": "post-id",
        "reflect": true
      },
      "post": {
        "type": "unknown",
        "mutable": true,
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to a reply IPost. If not\nprovided, the IPost record will be fetched."
        }
      },
      "postCreator": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IUser",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IUser representing the reply post author. If not\nprovided, the IUser record will be fetched."
        }
      },
      "postCreatorOrg": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPortal",
          "resolved": "IPortal",
          "references": {
            "IPortal": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IPortal representing the reply post author's org. If not\nprovided, the IPortal record will be fetched."
        }
      },
      "parent": {
        "type": "unknown",
        "mutable": true,
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to a parent IPost."
        }
      },
      "parentId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of a parent IPost."
        },
        "attribute": "parent-id",
        "reflect": true
      },
      "parentCreator": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IUser",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IUser representing the parent post author. If not\nprovided, the IUser record will be fetched."
        }
      },
      "parentCreatorOrg": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPortal",
          "resolved": "IPortal",
          "references": {
            "IPortal": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IPortal representing the parent post author's org. If not\nprovided, the IPortal record will be fetched."
        }
      },
      "channelId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of post's IChannel."
        },
        "attribute": "channel-id",
        "reflect": true
      },
      "channel": {
        "type": "unknown",
        "mutable": true,
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
          "text": "An optional reference to an IChannel representing the channel the post was created within.\nIf not provided, will be fetched."
        }
      },
      "channelGroups": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional Array of IGroup objects representing a private IChannel groups. If `channelGroups` is\nnot provided, it will be fetched."
        }
      },
      "discussion": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.\nWhen `entity`, `entityId`, and `entityType` are not provided, they will be fetched by parsing the URI."
        },
        "attribute": "discussion",
        "reflect": true
      },
      "entityId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an IHubContent or IGroup representing the subject entity of the discussion.\nIf `entityId` and `entityType` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-id",
        "reflect": true
      },
      "entityType": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional string representing the type (`content` or `group`) of subject entity of the discussion.\nIf `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-type",
        "reflect": true
      },
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubContent | IGroup",
          "resolved": "IGroup | IHubContent",
          "references": {
            "IHubContent": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.\nIf `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given\n`discussion`."
        }
      },
      "displayFieldValid": {
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
          "text": "An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent"
        },
        "attribute": "display-field-valid",
        "reflect": false
      },
      "displayFieldValue": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-value",
        "reflect": false
      },
      "displayFieldKey": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-key",
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
          "text": "If the component is being rendered within a mobile layout"
        },
        "attribute": "is-mobile",
        "reflect": false
      },
      "locationId": {
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
          "text": "A UUID string representing a feature ID on the map that is the target of the discussion"
        },
        "attribute": "location-id",
        "reflect": false
      },
      "showLocations": {
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
          "text": "Controls whether the Add Location button and arcgis-hub-discussions-post-geography component render on posts"
        },
        "attribute": "show-locations",
        "reflect": false
      },
      "disableSelectExistingLocation": {
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
          "text": "Disable 'Select' location draw action"
        },
        "attribute": "disable-select-existing-location",
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
      },
      "showChannelAvatar": {
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
          "text": "Whether to render channel avatar in the post header"
        },
        "attribute": "show-channel-avatar",
        "reflect": false
      },
      "showChannelName": {
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
          "text": "Whether to render channel name in the post header"
        },
        "attribute": "show-channel-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "intl": {},
      "_loading": {},
      "parentReady": {},
      "postReady": {},
      "postListReady": {},
      "postEditorReady": {},
      "ready": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsPostSelect",
        "name": "arcgisHubDiscussionsPostSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the View All Posts or View All Replies actions"
        },
        "complexType": {
          "original": "IPostSelectDetails",
          "resolved": "IPostSelectDetails",
          "references": {
            "IPostSelectDetails": {
              "location": "import",
              "path": "../../../../utils/discussions/types"
            }
          }
        }
      }, {
        "method": "arcgisAppIdentityStartSignIn",
        "name": "arcgisAppIdentityStartSignIn",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Prompts the app identity manager to start sign in process"
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
          "text": "Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsThreadReady",
        "name": "arcgisHubDiscussionsThreadReady",
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
      }];
  }
  static get methods() {
    return {
      "getPostEditorRef": {
        "complexType": {
          "signature": "() => Promise<HTMLArcgisHubDiscussionsPostEditorElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HTMLArcgisHubDiscussionsPostEditorElement": {
              "location": "global"
            }
          },
          "return": "Promise<HTMLArcgisHubDiscussionsPostEditorElement>"
        },
        "docs": {
          "text": "Method that resolves a reference to the post editor component",
          "tags": []
        }
      },
      "getPostListRef": {
        "complexType": {
          "signature": "() => Promise<HTMLArcgisHubDiscussionsPostListElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HTMLArcgisHubDiscussionsPostListElement": {
              "location": "global"
            }
          },
          "return": "Promise<HTMLArcgisHubDiscussionsPostListElement>"
        },
        "docs": {
          "text": "Method that resolves a reference to the post list component",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "handleContextChanged"
      }, {
        "propName": "ready",
        "methodName": "handleReadyChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubDiscussionsPostDelete",
        "method": "handlePostOrReplyDeleted",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "hubTelemetry",
        "method": "handleHubTelemetry",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsThread.prototype, "fetchDependencies", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussionsThread.prototype, "captureThreadDeletedImpression", null);
