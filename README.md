# hub-components-storybook
A (hopefully) temporary storage location for the hub-components storybook build using Calcite v2.13.2

| Link | Latest commit in Opendata-ui | Reason |
|----------|----------|----------|
| [Storybook](https://esridc.github.io/hub-components-storybook/calcite2.13.2-storybook-build/?path=/story/guides-overview--page) 📕  |  https://github.com/ArcGIS/opendata-ui/pull/14410  | Calcite v3 bump prevents Storybook from compiling correctly |


<details>
  <summary>Click to expand for reproduction details</summary>
  
## To reproduce
1. In opendata-ui, run `yarn hc storybook:static:copy`
1. Move the copy into a repository that you are comfortable converting into a GitHub repo
1. `npm init` - create the package.json
1. `npm i @storybook/cli` - install Storybook CLI
1. `npm install http-server --save-dev` - install http-server
1. `npm install` - initialize node_modules
1. Add `"start": "npx http-server calcite2.13.2-storybook-build"` to your package.json
1. Run `npm start` to run your http-server with your build
1. View at http://localhost:8080/

</details>
