export default {
  title: 'Access/App Identity',
  component: 'arcgis-app-identity',
};
const defaultArgs = {
  clientId: 'u3KZUyh6wbCQtuCj',
  redirectUri: "http://localhost:3333/html/arcgis-app-identity/redirect.html",
  portal: "https://qaext.arcgis.com"
};
export const Default = (args) => `
  <arcgis-app-identity
    client-id="${args.clientId}"
    redirect-uri="${args.redirectUri}"
    portal="${args.portal}
  ></arcgis-app-identity>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'App Identity';
