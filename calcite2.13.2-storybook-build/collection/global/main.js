import { setGlobalContext } from "../utils/state";
import { retrieveContextManager } from "../utils/context-manager";
// initialize store w/ context, either from local storage, or
// TODO: unauthenticated w/ the environment's default portal
export default async () => {
  // TODO: get default portal from environment variable, see:
  // https://medium.com/learnwithrahul/using-environment-variables-with-stenciljs-d3425592fa18
  // const portalUrl = process.env.PORTAL_URL
  const portalUrl = undefined;
  const contextManager = await retrieveContextManager(portalUrl);
  setGlobalContext(contextManager === null || contextManager === void 0 ? void 0 : contextManager.context);
};
