import { WorkspacePane } from "../../../utils";
import { EventEmitter } from '../../../stencil-public-runtime';
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
export declare const logWorkspaceLinkTelemetry: (options: {
  hubTelemetry: EventEmitter;
  pane?: WorkspacePane;
  href?: string;
  telemetry?: Record<string, any>;
}) => void;
