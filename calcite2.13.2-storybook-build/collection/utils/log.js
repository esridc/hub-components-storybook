/**
 * get the tag name for the chart component to use
 * for a given ArcGIS chart config
 * @param config ArcGIS chart config
 * @returns chart component tag name
 */
export const maybeLogEvent = (event, shouldLog = true) => {
  if (shouldLog) {
    const { type } = event;
    console.log(type, event);
  }
};
