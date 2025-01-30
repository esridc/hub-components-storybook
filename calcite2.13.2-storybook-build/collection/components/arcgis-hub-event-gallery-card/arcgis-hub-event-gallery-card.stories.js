var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Events/Event Gallery Card',
  component: 'arcgis-hub-event-gallery-card',
  decorators: [
    withRenderCallback('arcgis-hub-event-gallery-card', ($el, _a) => {
      var _b = _a.args, { isMobile } = _b, cardConfig = __rest(_b, ["isMobile"]);
      if ($el) {
        Object.assign($el, { isMobile, cardConfig });
      }
    }),
    withCenteredLayout('50%'),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-event-gallery-card/index.html' }, undefined, { style: 'margin-block-end: 2rem;' }),
  ],
};
export const Default = () => `<arcgis-hub-event-gallery-card></arcgis-configuration-editor-field>`;
Default.args = {
  selectionMode: 'dynamic',
  entityIds: ['bb5c755c71e34d9996c6fa27271fbeb1'],
  eventIds: [],
  access: [],
  tags: [],
  categories: [],
  titleHeading: 'h4',
  corners: 'square',
  shadow: 'none',
  // showAdditionalInfo: true,
  openIn: 'same',
  isMobile: false,
  layout: 'list',
  schemaVersion: 3,
};
Default.argTypes = {
  selectionMode: {
    control: 'inline-radio',
    options: ['dynamic', 'manual'],
  },
  entityIds: {
    control: 'object',
  },
  eventIds: {
    control: 'object',
  },
  access: {
    control: 'inline-check',
    options: ['private', 'org', 'public'],
  },
  openIn: {
    control: 'inline-radio',
    options: ['same', 'new'],
  },
  tags: {
    control: 'object',
  },
  categories: {
    control: 'object',
  },
  titleHeading: {
    control: 'select',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  corners: {
    control: 'inline-radio',
    options: ['square', 'round'],
  },
  shadow: {
    control: 'select',
    options: ['none', 'low', 'medium', 'heavy'],
  },
  // showAdditionalInfo: {
  //   control: 'boolean',
  // },
  layout: {
    control: 'select',
    options: ['list', 'map'],
  },
  cardConfig: { control: false },
  schemaVersion: { control: false },
  isMobile: { control: 'boolean' },
};
Default.storyName = 'Event Gallery Card';
