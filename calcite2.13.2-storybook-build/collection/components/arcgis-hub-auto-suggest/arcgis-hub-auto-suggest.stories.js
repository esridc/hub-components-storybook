import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Auto Suggest',
  component: 'arcgis-hub-auto-suggest',
  decorators: [
    withCenteredLayout('75%'),
    withRenderCallback('arcgis-hub-gallery', ($el, { args }) => {
      args.query && ($el.query = args.query);
      args.facets && ($el.facets = args.facets);
    })
  ],
};
const itemSearchQuery = {
  targetEntity: 'item',
  filters: [
    {
      predicates: [
        {
          term: 'streets'
        }
      ]
    }
  ]
};
const defaultArgs = {
  term: '',
  searchApi: 'portal',
  matchRecent: true,
  matchSearch: true,
  matchLocation: false,
  clearButton: true,
  searchButton: true,
  showSearchIcon: true,
  disableTelemetry: true,
  placeholder: "Search for items (this is an optional placeholder)",
  scale: 'l',
  readOnly: 'false',
};
export const Default = args => `
  <arcgis-hub-auto-suggest
    term="${args.term}"
    search-api="${args.searchApi}"
    match-recent="${args.matchRecent}"
    match-search="${args.matchSearch}"
    match-location="${args.matchLocation}"
    clear-button="${args.clearButton}"
    search-button="${args.searchButton}"
    show-search-icon="${args.showSearchIcon}"
    disable-telemetry="${args.disableTelemetry}"
    scale="${args.scale}"
    read-only="${args.readOnly}"
    placeholder="${args.placeholder}"
  ></arcgis-hub-auto-suggest>
`;
Default.args = Object.assign({ query: itemSearchQuery }, defaultArgs);
Default.storyName = 'Auto Suggest';
