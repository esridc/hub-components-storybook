// import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Visualization/Map TimeSlider',
  component: 'arcgis-time-slider',
  argTypes: {
    actions: {
      control: { type: null }
    },
    fullTimeExtent: {
      control: { type: null }
    },
    stops: {
      control: { type: null }
    },
    tickConfigs: {
      control: { type: null }
    },
    timeExtent: {
      control: { type: null }
    },
    view: {
      control: { type: null }
    },
    viewModel: {
      control: { type: null }
    },
    labelFormatFunction: {
      control: { type: null }
    },
    disabled: {
      control: 'boolean'
    },
    timeVisible: {
      control: 'boolean'
    },
    loop: {
      control: 'boolean'
    },
    visible: {
      control: 'boolean'
    },
    viewType: {
      control: 'radio',
      options: ['MapView', 'SceneView']
    },
    position: {
      control: 'radio',
      options: [
        'bottom-leading',
        'bottom-left',
        'bottom-right',
        'bottom-end',
        'top-leading',
        'top-left',
        'top-right',
        'top-trailing',
        'manual'
      ]
    }
  },
  decorators: [
    withNotice('As written, this story massively over-renders. It needs to be re-writtten in a declarative manner more consistent with storybook conventions.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-time-slider/index.html' }, undefined, undefined)
    // withRenderCallback('arcgis-time-slider', ($el, { args }) => {
    //   if ($el) {
    //     Object.entries(args).forEach(([key, value]) => {
    //       $el[key] = value;
    //     });
    //   }
    // })
  ],
  parameters: {
    layout: 'centered' // 'fullscreen'
  }
};
const defaultArgs = {
  webmapId: '35455386cc97453197a61bd20eb46816',
  viewType: 'MapView',
  visible: true,
  timeVisible: true,
  playRate: 1000,
  loop: true,
  layout: 'wide',
  label: 'my label',
  disabled: false,
  mode: 'instant',
  position: 'manual'
};
// const _cache = {
//   viewType: null,
//   webmapId: null,
//   slider: null,
//   view: null,
//   map: null,
//   container: null
// };
export const Default = ( /*{ viewType, webmapId, ...args }: any*/) => {
  // if (viewType !== _cache.viewType || webmapId !== _cache.webmapId) {
  //   if (_cache.slider) {
  //     _cache.slider.remove();
  //     _cache.slider = null;
  //   }
  //   if (_cache.view) {
  //     _cache.view.destroy();
  //     _cache.view = null;
  //   }
  //   if (_cache.map) {
  //     _cache.map.destroy();
  //     _cache.map = null;
  //   }
  //   if (_cache.container) {
  //     _cache.container.remove();
  //     _cache.container = null;
  //   }
  // }
  // const loader = document.createElement('arcgis-loader');
  // document.body.appendChild(loader);
  // loader.addEventListener('arcgisLoaderReady', async () => {
  //   const [ MapView, SceneView, WebMap, esriConfig, TimeSlider ] = await loader.get(['MapView', 'SceneView', 'WebMap', 'esriConfig', 'TimeSlider']);
  //   esriConfig.portalUrl = 'https://qaext.arcgis.com/sharing/rest/content/items';
  //   const container = document.createElement('div');
  //   debugger;
  //   document.body.insertBefore(container, document.body.firstChild);
  //   const map = new WebMap({ portalItem: { id: webmapId } });
  //   const view = viewType === 'MapView'
  //     ? new MapView({ map, container })
  //     : new SceneView({ map, container });
  //   view.zoom = 4;
  //   container.dataset.webmapId = webmapId;
  //   container.dataset.viewType = viewType;
  //   const slider = document.createElement('arcgis-time-slider');
  //   slider.view = view;
  //   const timeProperties = await TimeSlider.getPropertiesFromWebMap(map);
  //   Object.entries({ ...timeProperties, ...args }).forEach(([key, value]) => {
  //     slider[key] = value;
  //   });
  //   document.body.appendChild(slider);
  //   Object.assign(_cache, {
  //     map,
  //     view,
  //     webmapId,
  //     viewType,
  //     slider,
  //     container
  //   });
  // });
  // return `
  //   <style>
  //     [data-webmap-id] {
  //       height: 100%;
  //       width: 100%;
  //     }
  //     .esri-ui-manual-container arcgis-time-slider {
  //       position: absolute;
  //       left: 1rem;
  //       right: 1rem;
  //       bottom: 2rem;
  //       width: calc(100% - 2rem);
  //     }
  //   </style>
  // `;
  return ``;
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Time Slider';
