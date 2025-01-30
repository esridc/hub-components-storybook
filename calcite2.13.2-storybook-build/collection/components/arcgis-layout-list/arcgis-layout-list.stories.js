export default {
  title: 'Layouts/Layout List',
  component: 'arcgis-layout-list',
};
export const Basic = (args) => `
  <style>.layout-list-cell { border: 1px solid #666; padding: 1rem; text-align: center; }</style>
  <arcgis-layout-list
    scale="${args.scale}"
    layout="${args.layout}"
    disabled="${args.disabled}"
    style="width:${args.width}px;--arcgis-hub-layout-list-gap:${args['--arcgis-hub-layout-list-gap']}px;--arcgis-hub-layout-list-min-column-width:${args['--arcgis-hub-layout-list-min-column-width']}px;--arcgis-hub-layout-list-actions-gap:${args['--arcgis-hub-layout-list-actions-gap']}px;--arcgis-hub-layout-list-actions-margin:${args['--arcgis-hub-layout-list-actions-margin']}px;"
  >
    <div class="layout-list-cell">one</div>
    <div class="layout-list-cell">two</div>
    <div class="layout-list-cell">three</div>
    <div class="layout-list-cell">four</div>
    <div class="layout-list-cell">five</div>
    <div class="layout-list-cell">six</div>
    <div class="layout-list-cell">seven</div>
    <div class="layout-list-cell">eight</div>
    <div class="layout-list-cell">nine</div>
  </arcgis-layout-list>
`;
Basic.args = {
  layout: 'grid',
  scale: 's',
  disabled: false,
  width: 1000,
  '--arcgis-hub-layout-list-gap': 16,
  '--arcgis-hub-layout-list-min-column-width': 320,
  '--arcgis-hub-layout-list-actions-gap': 4,
  '--arcgis-hub-layout-list-actions-margin': 16,
};
Basic.argTypes = {
  scale: {
    control: { type: 'inline-radio' },
    options: ['s', 'm', 'l'],
  },
  layout: {
    control: { type: 'inline-radio' },
    options: ['list', 'grid'],
  },
  width: {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-gap': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-min-column-width': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-actions-gap': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-actions-margin': {
    control: { type: 'number' }
  },
};
Basic.storyName = 'Basic usage';
export const LayoutListWithControls = (args) => `
  <style>
    .layout-list-cell { border: 1px solid #666; padding: 1rem; text-align: center; }
    [slot="actions"] { display: flex; justify-content: end; flex-direction: row; gap: 4px; align-items: center; }
    [slot="actions"] span { flex-grow: 1; }
  </style>
  <arcgis-layout-list
    scale="${args.scale}"
    layout="${args.layout}"
    disabled="${args.disabled}"
    style="width:${args.width}px;--arcgis-hub-layout-list-gap:${args['--arcgis-hub-layout-list-gap']}px;--arcgis-hub-layout-list-min-column-width:${args['--arcgis-hub-layout-list-min-column-width']}px;--arcgis-hub-layout-list-actions-gap:${args['--arcgis-hub-layout-list-actions-gap']}px;--arcgis-hub-layout-list-actions-margin:${args['--arcgis-hub-layout-list-actions-margin']}px;"
  >
    <div slot="actions">
      <span>1 of 10 of 100</span>
      <calcite-action scale="m" text="Learn more" text-enabled></calcite-action>
      <calcite-button scale="m">Add</calcite-button>
    </div>
    <div class="layout-list-cell">one</div>
    <div class="layout-list-cell">two</div>
    <div class="layout-list-cell">three</div>
    <div class="layout-list-cell">four</div>
    <div class="layout-list-cell">five</div>
    <div class="layout-list-cell">six</div>
    <div class="layout-list-cell">seven</div>
    <div class="layout-list-cell">eight</div>
    <div class="layout-list-cell">nine</div>
  </arcgis-layout-list>
`;
LayoutListWithControls.args = {
  layout: 'grid',
  scale: 's',
  disabled: false,
  width: 1000,
  '--arcgis-hub-layout-list-gap': 16,
  '--arcgis-hub-layout-list-min-column-width': 320,
  '--arcgis-hub-layout-list-actions-gap': 4,
  '--arcgis-hub-layout-list-actions-margin': 16,
};
LayoutListWithControls.argTypes = {
  scale: {
    control: { type: 'inline-radio' },
    options: ['s', 'm', 'l'],
  },
  layout: {
    control: { type: 'inline-radio' },
    options: ['list', 'grid'],
  },
  width: {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-gap': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-min-column-width': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-actions-gap': {
    control: { type: 'number' }
  },
  '--arcgis-hub-layout-list-actions-margin': {
    control: { type: 'number' }
  },
};
LayoutListWithControls.storyName = 'With slotted actions';
