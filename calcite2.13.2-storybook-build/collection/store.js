import { createStore } from "@stencil/store";
const store = createStore({
  // NOTE: context is initialized in the global script
  context: null,
  // NOTE: site is populated by the global script
  site: null,
  notices: [],
  urlState: {},
});
export default store;
