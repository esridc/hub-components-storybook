import { PostReaction } from '@esri/hub-discussions';
/**
 * A collection of reactions to render in the "default reactions" popover
 */
export const DEFAULT_REACTIONS = [
  PostReaction.THUMBS_UP,
  PostReaction.THINKING,
  PostReaction.GRINNING,
  PostReaction.PARTY_POPPER,
];
/**
 * The full collection of supported reactions.
 */
export const ALL_REACTIONS = [
  ...DEFAULT_REACTIONS,
  PostReaction.SLIGHTLY_SMILING,
  PostReaction.CONFUSED,
  PostReaction.LAUGH,
  PostReaction.FACE_WITH_TEARS_OF_JOY,
  PostReaction.WINKING,
  PostReaction.PARTYING,
  PostReaction.SAD,
  PostReaction.SURPRISED,
  PostReaction.THUMBS_DOWN,
  PostReaction.CLAPPING_HANDS,
  PostReaction.RAISING_HANDS,
  PostReaction.WAVING_HAND,
  PostReaction.HEART,
  PostReaction.ONE_HUNDRED,
  PostReaction.FIRE,
  PostReaction.ROCKET,
  PostReaction.UP_ARROW,
  PostReaction.DOWN_ARROW,
  PostReaction.EYES,
  PostReaction.TROPHY,
  PostReaction.WORLD_MAP,
];
/**
 * A map of reaction to emoji character and telemetry key values
 * See https://unicode.org/emoji/charts/full-emoji-list.html
 */
export const REACTIONS_MAP = {
  [PostReaction.SLIGHTLY_SMILING]: {
    emoji: '🙂',
    telemetryKey: 'smilingFace',
  },
  [PostReaction.CONFUSED]: {
    emoji: '😕',
    telemetryKey: 'confusedFace',
  },
  [PostReaction.LAUGH]: {
    emoji: '😀',
    telemetryKey: 'laughingFace',
  },
  [PostReaction.GRINNING]: {
    emoji: '😆',
    telemetryKey: 'grinningFace',
  },
  [PostReaction.FACE_WITH_TEARS_OF_JOY]: {
    emoji: '😂',
    telemetryKey: 'faceWithTearsOfJoy',
  },
  [PostReaction.THINKING]: {
    emoji: '🤔',
    telemetryKey: 'thinkingFace',
  },
  [PostReaction.WINKING]: {
    emoji: '😉',
    telemetryKey: 'winkingFace',
  },
  [PostReaction.PARTYING]: {
    emoji: '🥳',
    telemetryKey: 'partyingFace',
  },
  [PostReaction.SAD]: {
    emoji: '😥',
    telemetryKey: 'sadFace',
  },
  [PostReaction.SURPRISED]: {
    emoji: '😲',
    telemetryKey: 'shockedFace',
  },
  [PostReaction.THUMBS_UP]: {
    emoji: '👍',
    telemetryKey: 'thumbsUp',
  },
  [PostReaction.THUMBS_DOWN]: {
    emoji: '👎',
    telemetryKey: 'thumbsDown',
  },
  [PostReaction.CLAPPING_HANDS]: {
    emoji: '👏',
    telemetryKey: 'clappingHands',
  },
  [PostReaction.RAISING_HANDS]: {
    emoji: '🙌',
    telemetryKey: 'raisingHands',
  },
  [PostReaction.WAVING_HAND]: {
    emoji: '👋',
    telemetryKey: 'wavingHand',
  },
  [PostReaction.HEART]: {
    emoji: '❤️',
    telemetryKey: 'redHeart',
  },
  [PostReaction.ONE_HUNDRED]: {
    emoji: '💯',
    telemetryKey: 'hundredPoints',
  },
  [PostReaction.FIRE]: {
    emoji: '🔥',
    telemetryKey: 'fire',
  },
  [PostReaction.PARTY_POPPER]: {
    emoji: '🎉',
    telemetryKey: 'partyPopper',
  },
  [PostReaction.ROCKET]: {
    emoji: '🚀',
    telemetryKey: 'rocket',
  },
  [PostReaction.UP_ARROW]: {
    emoji: '⬆',
    telemetryKey: 'upArrow',
  },
  [PostReaction.DOWN_ARROW]: {
    emoji: '⬇',
    telemetryKey: 'downArrow',
  },
  [PostReaction.EYES]: {
    emoji: '👀',
    telemetryKey: 'eyes',
  },
  [PostReaction.TROPHY]: {
    emoji: '🏆',
    telemetryKey: 'trophy',
  },
  [PostReaction.WORLD_MAP]: {
    emoji: '🗺',
    telemetryKey: 'worldMap',
  },
};
