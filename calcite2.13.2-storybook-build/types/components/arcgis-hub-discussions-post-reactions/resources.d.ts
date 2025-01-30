import { PostReaction } from '@esri/hub-discussions';
/**
 * A collection of reactions to render in the "default reactions" popover
 */
export declare const DEFAULT_REACTIONS: PostReaction[];
/**
 * The full collection of supported reactions.
 */
export declare const ALL_REACTIONS: PostReaction[];
/**
 * A map of reaction to emoji character and telemetry key values
 * See https://unicode.org/emoji/charts/full-emoji-list.html
 */
export declare const REACTIONS_MAP: Record<PostReaction, {
  emoji: string;
  telemetryKey: string;
}>;
