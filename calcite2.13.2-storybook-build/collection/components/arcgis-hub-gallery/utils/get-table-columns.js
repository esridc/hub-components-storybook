import { Fragment, h } from "@stencil/core";
import { sanitizeHtml } from "../../../utils/hubSanitizer";
import { getFallbackUrl, getThumbnailUrl } from "./thumbnail";
import { ALIGNMENTS } from "../../interfaces";
const DEFAULT_ITEM_COLUMNS = ['thumbnail', 'title', 'type', 'source', 'updated', 'actions'];
const DEFAULT_GROUP_COLUMNS = ['thumbnail', 'title', 'managers', 'sharedUpdate', 'updated', 'actions'];
const DEFAULT_EVENT_COLUMNS = ['thumbnail', 'title', 'owner', 'access', 'summary', 'start', 'end', 'actions'];
const DEFAULT_CHANNEL_COLUMNS = ['thumbnail', 'title', 'source', 'access', 'created', 'actions'];
const DEFAULT_USER_COLUMNS = ['thumbnail', 'title', 'username', 'actions'];
const DEFAULT_COLUMNS = ['title', 'created', 'updated', 'actions'];
const DEFAULT_COLUMNS_BY_ENTITY_TYPE = {
  item: DEFAULT_ITEM_COLUMNS,
  group: DEFAULT_GROUP_COLUMNS,
  event: DEFAULT_EVENT_COLUMNS,
  eventAttendee: DEFAULT_USER_COLUMNS,
  channel: DEFAULT_CHANNEL_COLUMNS,
  discussionPost: DEFAULT_COLUMNS,
  communityUser: DEFAULT_USER_COLUMNS,
  groupMember: DEFAULT_USER_COLUMNS,
  portalUser: DEFAULT_USER_COLUMNS,
  user: DEFAULT_USER_COLUMNS
};
// get the default table columns array for a given entity type
export const getTableColumns = (entityType, opts, context, columns = DEFAULT_COLUMNS_BY_ENTITY_TYPE[entityType]) => {
  const result = columns.map(col => {
    var _a;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (typeof col === 'string') {
      return (_a = COLUMN_NAME_MAP[col]) === null || _a === void 0 ? void 0 : _a.call(COLUMN_NAME_MAP, opts, context);
    }
    else {
      return col;
    }
  });
  return result.filter(Boolean);
};
const getThumbnailColumn = (opts, context) => {
  return opts.showThumbnail && {
    header: '{{thumbnail:translate}}',
    key: "thumbnail",
    formatter: (_thumbnailUrl, { viewModel }) => {
      // TODO: we should have an entitythumbnail component - possibly a function component
      let image;
      // eslint-disable-next-line unicorn/prefer-ternary
      if (viewModel.type === "User" || viewModel.type === "channel") {
        image = h("calcite-avatar", { fullName: viewModel.title, label: "avatar", scale: "s", thumbnail: viewModel.thumbnailUrl, userId: viewModel.id, username: viewModel.source });
      }
      else {
        image = h("arcgis-hub-image", { alt: viewModel.title, fallback: getFallbackUrl(viewModel), lazy: true, src: getThumbnailUrl(viewModel, 40, context) });
      }
      return image;
    },
    contentCellAlignment: ALIGNMENTS.center,
    headerCellAlignment: ALIGNMENTS.center
  };
};
const formatTitle = (model, newTab) => {
  let title = h(Fragment, null, model.title);
  const href = model.titleUrl;
  if (href) {
    title = h("calcite-link", { href: href, iconEnd: newTab ? "launch-2" : "", target: newTab ? "_blank" : "_self" }, model.title);
  }
  return title;
};
const getTitleColumn = (opts, _context) => {
  return {
    header: '{{title:translate}}',
    key: "viewModel.title",
    formatter: (_title, model) => formatTitle(model.viewModel, opts.newTab)
  };
};
const getTypeColumn = (_opts, _context) => {
  return {
    header: '{{type:translate}}',
    key: "searchResult.type"
  };
};
const getSourceColumn = (_opts, _context) => {
  return {
    header: '{{owner:translate}}',
    key: "viewModel.source"
  };
};
const getSharedUpdateColumn = (_opts, _context) => {
  return {
    header: '{{sharedUpdate:translate}}',
    key: "searchResult.isSharedUpdate",
    formatter: (val, _model, _key, intl) => val ? intl.t('yes') : intl.t('no'),
    contentCellAlignment: ALIGNMENTS.center,
    headerCellAlignment: ALIGNMENTS.center
  };
};
const getManagersColumn = (_opts, _context) => {
  return {
    header: '{{managers:translate}}',
    key: 'searchResult.id',
    formatter: (val, _model, _key, _intl) => {
      return h("arcgis-hub-group-member-summary", { identifier: val, memberType: "admin", slot: 'subtitle' });
    }
  };
};
const getCreatedDateColumn = (_opts, _context) => {
  return {
    header: '{{dateCreated:translate}}',
    key: "searchResult.createdDate",
    formatter: (val, _model, _key, intl) => intl.formatDate(val)
  };
};
const getUpdatedDateColumn = (_opts, _context) => {
  return {
    header: '{{dateUpdated:translate}}',
    key: "searchResult.updatedDate",
    formatter: (val, _model, _key, intl) => intl.formatDate(val)
  };
};
const getOwnerColumn = (_opts, _context) => {
  return {
    header: '{{owner:translate}}',
    key: "searchResult.owner"
  };
};
const getAccessColumn = (_opts, _context) => {
  return {
    header: '{{access:translate}}',
    key: "searchResult.access",
  };
};
const getSummaryColumn = (_opts, _context) => {
  return {
    header: '{{description:translate}}',
    key: "searchResult.summary",
    formatter: (val) => sanitizeHtml(val, 'noHtml'),
    multilineCellEllipsis: { lines: 1 }
  };
};
const getStartColumn = (_opts, _context) => {
  return {
    header: '{{start:translate}}',
    key: "searchResult.rawResult.startDateTime",
    formatter: (val, _model, _key, intl) => intl.formatDate(val, { dateStyle: 'medium', timeStyle: 'short' })
  };
};
const getEndColumn = (_opts, _context) => {
  return {
    header: '{{end:translate}}',
    key: "searchResult.rawResult.endDateTime",
    formatter: (val, _model, _key, intl) => intl.formatDate(val, { dateStyle: 'medium', timeStyle: 'short' })
  };
};
const getUsernameColumn = (_opts, _context) => {
  return {
    header: '{{username:translate}}',
    key: "searchResult.id",
    formatter: (val) => `@${val}`
  };
};
const getActionsColumn = (opts, _context) => {
  return opts.showRowActions && {
    header: '{{actionsHeader:translate}}',
    key: "cardActions"
  };
};
const COLUMN_NAME_MAP = {
  thumbnail: getThumbnailColumn,
  title: getTitleColumn,
  source: getSourceColumn,
  owner: getOwnerColumn,
  type: getTypeColumn,
  access: getAccessColumn,
  summary: getSummaryColumn,
  sharedUpdate: getSharedUpdateColumn,
  managers: getManagersColumn,
  created: getCreatedDateColumn,
  updated: getUpdatedDateColumn,
  start: getStartColumn,
  end: getEndColumn,
  username: getUsernameColumn,
  actions: getActionsColumn
};
