export var HUB_RELEASE;
(function (HUB_RELEASE) {
  HUB_RELEASE["DEV"] = "dev";
  HUB_RELEASE["QA"] = "qa";
})(HUB_RELEASE || (HUB_RELEASE = {}));
export function getHubRelease(status, context) {
  const allowedEnvironments = ['devext', 'qaext'];
  if (context) {
    if (allowedEnvironments.includes(context.environment)) {
      return status;
    }
  }
  else {
    console.warn(`Could not determine hub-release attribute value. "context" is not defined.`);
  }
}
