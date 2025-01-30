import { HubEntity } from '@esri/hub-common';
/**
 * Apply the follow card migration to the card
 * config that's passed in
 * @param config config to apply the migration to
 * @param entity entity that the card is following
 * @returns migrated card config
 */
export declare function applyFollowCardMigrations(config: Record<string, any>, entity: HubEntity): Record<string, any>;
