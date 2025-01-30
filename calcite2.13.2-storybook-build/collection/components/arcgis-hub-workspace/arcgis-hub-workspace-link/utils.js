import { capitalize } from "@esri/hub-common";
import { isExternalLink } from "../../../utils";
import { dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * When the link is clicked, we log telemetry:
 * 1. For inter-pane workspace navigation (pane prop is provided),
 * we emit a pre-defined telemetry event. This cannot be overwritten
 * 2. For external navigation, we emit a pre-defined telemetry event
 * that the consumer can override or enhance with the telemetry prop
 * 3. For relative navigation, the user can provide a custom telemetry
 * event through the telemetry prop
 * @param pane
 * @param href
 * @param hubTelemetry
 * @param telemetry
 */
export const logWorkspaceLinkTelemetry = (options) => {
  const { hubTelemetry, pane, href, telemetry = {} } = options;
  const isExternal = !pane && !!href && isExternalLink(href);
  if (pane) {
    hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.navigation.action.manage), { label: capitalize(pane) }));
  }
  else if (isExternal) {
    hubTelemetry.emit(Object.assign(Object.assign(Object.assign({}, dictionary.category.navigation.action.external), { details: href }), telemetry));
  }
  else if (Object.keys(telemetry).length) {
    hubTelemetry.emit(telemetry);
  }
};
