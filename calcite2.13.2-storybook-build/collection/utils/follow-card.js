import { cloneObject, createId } from '@esri/hub-common';
/**
 * Apply the follow card migration to the card
 * config that's passed in
 * @param config config to apply the migration to
 * @param entity entity that the card is following
 * @returns migrated card config
 */
export function applyFollowCardMigrations(config = {}, entity) {
  const c = migrateFollowCardConfigV1(config, entity);
  // future migrations could be added here, e.g.
  // c = migrateFollowCardConfigV2(config, entity);
  return c;
}
/**
 * Migrate the card to V1
 */
function migrateFollowCardConfigV1(config = {}, entity) {
  let c = cloneObject(config);
  let entityId;
  let entityType;
  // Existing Follow initiative card (w/o schemaVersion)
  if (!c.schemaVersion) {
    // card following the site's parent initiative,
    // we use the the site info as entity info
    if (isFollowingParentInitiative(config, entity)) {
      entityId = entity.id;
      entityType = 'site';
    }
    else {
      // card following an external initiative,
      // we use the same initiative info as entity info
      entityId = config.initiativeId;
      entityType = 'initiative';
    }
    c = {
      // initiativeId is a prop that exists in the old
      // follow initiative card schema. Since we can't
      // remove props from card schema, we are overwriting
      // its value here so the post processing function
      // can walk through the site object and delete all
      // the props with a 'delete-this-property' value
      initiativeId: 'delete-this-property',
      entityId,
      entityType,
      callToActionText: config.callToActionText,
      callToActionAlign: migrateAlignment(config.callToActionAlign),
      buttonText: config.buttonText,
      unfollowButtonText: config.unfollowButtonText,
      buttonAlign: migrateAlignment(config.buttonAlign),
      buttonStyle: migrateButtonStyle(config.buttonStyle),
      cardId: config.cardId || createId(),
      schemaVersion: 1
    };
  }
  // for new sites we can't get the site id off the
  // initiative during activation as the site is not
  // created yet, so in the case where the card's
  // 'schemaVersion' is 0 AND the card config entity
  // type is 'site' we leverage the existing migration
  // to set the appropriate entity id of the site
  // and remove the initiativeId prop time
  if (config.schemaVersion === 0) {
    c.schemaVersion = 1;
    c.entityType = 'site';
    c.entityId = entity.id;
    delete c.initiativeId;
  }
  // for new and migrated follow cards (with schemaVersion),
  // return the same config.
  return c;
}
function migrateAlignment(align) {
  if (align === 'left') {
    return 'start';
  }
  if (align === 'right') {
    return 'end';
  }
  return 'center';
}
function migrateButtonStyle(style) {
  if (style === 'outline') {
    return 'outline-fill';
  }
  return style;
}
function isFollowingParentInitiative(config, entity) {
  return config.initiativeId === entity.properties.parentInitiativeId;
}
