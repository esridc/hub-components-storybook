export default {
  title: 'Visualization/Embed',
  component: 'arcgis-hub-embed',
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  src: 'https://www.youtube.com/embed/m80E1K75vDI',
  iframeTitle: 'Youtube video',
  height: 750,
  autoplay: true,
  camera: true,
  clipboardRead: true,
  clipboardWrite: true,
  displayCapture: true,
  fullScreen: true,
  geolocation: true,
  microphone: true
};
export const Default = args => `
  <arcgis-hub-embed
    src="${args.src}"
    iframeTitle="${args.iframeTitle}"
    height="${args.height}"
    autoplay="${args.autoplay}"
    camera="${args.camera}"
    clipboard-read="${args.clipboardRead}"
    clipboard-write="${args.clipboardWrite}"
    display-capture="${args.displayCapture}"
    full-screen="${args.fullScreen}"
    geolocation="${args.geolocation}"
    microphone="${args.microphone}"
  ></arcgis-hub-embed>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Embed';
