import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Feeds List',
  component: 'arcgis-hub-feeds-list',
  decorators: [
    withCenteredLayout('500px'),
    withRenderCallback('arcgis-hub-feeds-list', ($el, { args }) => {
      $el.feeds = args.feeds;
    })
  ],
  parameters: {
    actions: {
      handles: ['hubTelemetry'],
    },
  },
};
const defaultArgs = {
  feeds: [
    {
      label: 'DCAT US 1.1',
      url: 'https://bri-guy-qa-pre-a-hub.opendataqa.arcgis.com/api/feed/dcat-us/1.1.json',
      telemetryName: 'DCAT-US-1.1'
    },
    {
      label: 'DCAT AP 2.1.1',
      url: 'https://bri-guy-qa-pre-a-hub.opendataqa.arcgis.com/api/feed/dcat-ap/2.1.1.json',
      telemetryName: 'DCAT-AP-2.1.1'
    },
    {
      label: 'OGC Records API',
      url: 'https://bri-guy-qa-pre-a-hub.opendataqa.arcgis.com/api/search/definition',
      copyUrl: 'https://bri-guy-qa-pre-a-hub.opendataqa.arcgis.com/api/search/v1',
      telemetryName: 'OGC Records API'
    }
  ]
};
export const Default = (args) => {
  if (args.feeds) {
    return `
      <arcgis-hub-feeds-list>
        Stay up to date on changes to the search catalog through the available feeds. You can use these feeds to <a href=\"https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm#GUID-EAF833F8-FADA-4EC7-A1CA-F704DC987362\" target=\"_blank\">federate this site's content </a> with external catalogs like <a href=\"https://www.data.gov/\" target=\"_blank\">data.gov</a> or <a href=\"https://inspire-geoportal.ec.europa.eu/\" target=\"_blank\">INSPIRE GeoPortal</a>
      </arcgis-hub-feeds-list>
    `;
  }
  return `<div> The <b>feeds</b> property cannot be empty. </div>`;
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Feeds List';
