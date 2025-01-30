'use strict';

const state = require('./state-6637df8c.js');
const contextManager = require('./context-manager-487e7fe6.js');

// initialize store w/ context, either from local storage, or
// TODO: unauthenticated w/ the environment's default portal
const appGlobalScript = async () => {
  // TODO: get default portal from environment variable, see:
  // https://medium.com/learnwithrahul/using-environment-variables-with-stenciljs-d3425592fa18
  // const portalUrl = process.env.PORTAL_URL
  const portalUrl = undefined;
  const contextManager$1 = await contextManager.retrieveContextManager(portalUrl);
  state.setGlobalContext(contextManager$1 === null || contextManager$1 === void 0 ? void 0 : contextManager$1.context);
};

const globalScripts = appGlobalScript;

exports.globalScripts = globalScripts;
