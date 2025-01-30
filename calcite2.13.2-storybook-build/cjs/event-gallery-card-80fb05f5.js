'use strict';

const interfaces = require('./interfaces-fc0046ff.js');

/**
 * TODO: consider hoisting these to Hub.js
 */
/**
 * A general purpose migration utility used to transform an object from one schemaVersion to another that supports strict typings
 * @param schema The original schema to be transformed
 * @param transforms A map of supported transforms where the key is the schemaVersion and the value is the transform fn
 * @returns A transformed schema reflecting the latest supported schema version
 */
function migrateSchema(schema, transforms) {
  const versions = Object.keys(transforms) // get an array of schemaVersion keys defined on the map
    .map(key => Number.parseFloat(key)) // coerce the schemaVersions from string to number, supporting decimals
    .sort(); // sort the schema versions ascending
  // loop over the schema versions and conditionally apply their related transform based on schemaVersion value of the input
  return versions.reduce((acc, version) => { var _a; return ((_a = acc.schemaVersion) !== null && _a !== void 0 ? _a : 1) < version ? transforms[version](acc) : acc; }, schema);
}

/**
 * Transform fn to migrate a V1 event gallery card schema to V2. Specifically, it adds
 * sane defaults and coerces previous values for `corners` from `rounded|squared` to
 * `round|square` to better align with the gallery's `corners` property values.
 * @param schema A IEventGalleryCardSchemaV1 object
 * @returns a IEventGalleryCardSchemaV2 object
 */
function eventGalleryCardTransformV1ToV2(schema) {
  var _a, _b, _c;
  return Object.assign(Object.assign({}, schema), { entityIds: Array.isArray(schema.entityIds) ? schema.entityIds : [], eventIds: Array.isArray(schema.eventIds) ? schema.eventIds : [], access: Array.isArray(schema.access) ? schema.access : [], selectionMode: schema.selectionMode === 'manual' ? schema.selectionMode : 'dynamic', titleHeading: (_a = schema.titleHeading) !== null && _a !== void 0 ? _a : 'h4', shadow: (_b = schema.shadow) !== null && _b !== void 0 ? _b : interfaces.DROP_SHADOWS.none, showAdditionalInfo: typeof schema.showAdditionalInfo === 'boolean'
      ? schema.showAdditionalInfo
      : true, openIn: (_c = schema.openIn) !== null && _c !== void 0 ? _c : 'same', tags: Array.isArray(schema.tags) ? schema.tags : [], categories: Array.isArray(schema.categories) ? schema.categories : [], corners: schema.corners === 'rounded' ? interfaces.CORNERS.round : interfaces.CORNERS.square, schemaVersion: 2 });
}
/**
 * Transform fn to migrate V2 event gallery card schema to V3. Specifically, it adds
 * a `layout` property with a default value of `list`.
 * @param schema A IEventGalleryCardSchemaV2 object
 * @returns A IEventGalleryCardSchemaV3 object
 */
function eventGalleryCardTransformV2ToV3(schema) {
  return Object.assign(Object.assign({}, schema), { layout: 'list', schemaVersion: 3 });
}
const EVENT_GALLERY_CARD_TRANSFORM_MAP = {
  2: eventGalleryCardTransformV1ToV2,
  3: eventGalleryCardTransformV2ToV3,
  // we'll need to add support for an additional transform when we circle back to updating the card editor
  // to use the new query builder component
};
/**
 * Applies migrations to EventGalleryCardSchema objects, ensuring we're working with the latest supported version
 * @param schema An EventGalleryCardSchema object
 * @returns a migrated EventGalleryCardSchema conforming to latest schema version
 */
function migrateEventGalleryCardSchema(schema) {
  return migrateSchema(schema, EVENT_GALLERY_CARD_TRANSFORM_MAP);
}

exports.migrateEventGalleryCardSchema = migrateEventGalleryCardSchema;
