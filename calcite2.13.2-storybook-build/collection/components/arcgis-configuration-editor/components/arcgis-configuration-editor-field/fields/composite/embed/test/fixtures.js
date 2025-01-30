import { EmbedKind } from "@esri/hub-common";
export const MAP_EMBED = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'map',
    source: 'content'
  }
};
export const MAP_EMBED_TO_EMIT = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'map'
  }
};
export const EDITOR_MAP_EMBED = {
  key: 'key-123',
  shouldApplyBreakpoints: false,
  viewportAll: {
    id: ['123'],
    kind: 'map',
    source: 'content'
  }
};
export const APP_EMBED = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'app',
    source: 'content'
  }
};
export const APP_EMBED_TO_EMIT = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'app'
  }
};
export const EDITOR_APP_EMBED = {
  key: 'key-123',
  shouldApplyBreakpoints: false,
  viewportAll: {
    id: ['123'],
    kind: 'app',
    source: 'content'
  }
};
export const FEEDBACK_EMBED = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'feedback',
    source: 'content'
  }
};
export const FEEDBACK_EMBED_TO_EMIT = {
  key: 'key-123',
  viewportAll: {
    id: '123',
    kind: 'feedback'
  }
};
export const EDITOR_FEEDBACK_EMBED = {
  key: 'key-123',
  shouldApplyBreakpoints: false,
  viewportAll: {
    id: ['123'],
    kind: 'feedback',
    source: 'content'
  }
};
export const EXTERNAL_EMBED = {
  key: 'key-123',
  viewportAll: {
    url: 'https://some-url.com',
    kind: 'external',
    source: 'external'
  }
};
export const EXTERNAL_EMBED_TO_EMIT = {
  key: 'key-123',
  viewportAll: {
    url: 'https://some-url.com',
    kind: 'external'
  }
};
export const EDITOR_EXTERNAL_EMBED = {
  key: 'key-123',
  shouldApplyBreakpoints: false,
  viewportAll: {
    url: 'https://some-url.com',
    kind: 'external',
    source: 'external'
  }
};
export const EMBED_WITH_BREAKPOINTS = {
  key: "key-123",
  viewportMobile: {
    id: "123",
    kind: EmbedKind.app,
    source: 'content'
  },
  viewportDesktop: {
    id: "456",
    kind: EmbedKind.map,
    source: 'content'
  }
};
export const EMBED_WITH_BREAKPOINTS_TO_EMIT = {
  key: "key-123",
  viewportMobile: {
    id: "123",
    kind: EmbedKind.app
  },
  viewportDesktop: {
    id: "456",
    kind: EmbedKind.map
  },
};
export const EDITOR_EMBED_WITH_BREAKPOINTS = {
  key: "key-123",
  shouldApplyBreakpoints: true,
  viewportMobile: {
    id: ["123"],
    kind: "app",
    source: 'content'
  },
  viewportDesktop: {
    kind: "map",
    id: ["456"],
    source: 'content'
  }
};
