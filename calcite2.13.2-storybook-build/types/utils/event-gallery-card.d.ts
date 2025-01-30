import { CORNERS, DROP_SHADOWS } from '../components/interfaces';
import { IMigratableSchema, MigratableSchemaTransformMap } from './migrations';
import { LayoutOptions } from './types';
/**
 * The V1 schema for event gallery cards
 */
export interface IEventGalleryCardSchemaV1 extends IMigratableSchema {
  entityIds: string[];
  eventIds: string[];
  cardId: string;
  selectionMode: 'dynamic' | 'manual';
  access: ('org' | 'public' | 'private')[];
  titleHeading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  corners: 'rounded' | 'squared';
  shadow: DROP_SHADOWS;
  showAdditionalInfo: boolean;
  openIn: 'same' | 'new';
  tags: string[];
  categories: string[];
}
/**
 * The V2 schema for event gallery cards
 */
export interface IEventGalleryCardSchemaV2 extends Omit<IEventGalleryCardSchemaV1, 'corners' | 'schemaVersion'> {
  schemaVersion: 2;
  corners: CORNERS;
}
/**
 * The V3 schema for event gallery cards
 */
export interface IEventGalleryCardSchemaV3 extends Omit<IEventGalleryCardSchemaV2, 'schemaVersion'> {
  schemaVersion: 3;
  layout: Extract<LayoutOptions, 'list' | 'map' | 'calendar'>;
}
/**
 * A union type of all supported event gallery card schema versions
 */
export declare type EventGalleryCardSchema = IEventGalleryCardSchemaV1 | IEventGalleryCardSchemaV2 | IEventGalleryCardSchemaV3;
/**
 * An interface representing a map of supported event gallery card schema migrations where
 * the key is the schema version and the value is a transform fn
 */
export interface EventGalleryCardSchemaTransformMap extends MigratableSchemaTransformMap {
  2: (input: IEventGalleryCardSchemaV1) => IEventGalleryCardSchemaV2;
  3: (input: IEventGalleryCardSchemaV2) => IEventGalleryCardSchemaV3;
}
/**
 * The latest supported schema event gallery card schema
 */
export declare type CurrentEventGalleryCardSchema = IEventGalleryCardSchemaV3;
/**
 * Transform fn to migrate a V1 event gallery card schema to V2. Specifically, it adds
 * sane defaults and coerces previous values for `corners` from `rounded|squared` to
 * `round|square` to better align with the gallery's `corners` property values.
 * @param schema A IEventGalleryCardSchemaV1 object
 * @returns a IEventGalleryCardSchemaV2 object
 */
export declare function eventGalleryCardTransformV1ToV2(schema: IEventGalleryCardSchemaV1): IEventGalleryCardSchemaV2;
/**
 * Transform fn to migrate V2 event gallery card schema to V3. Specifically, it adds
 * a `layout` property with a default value of `list`.
 * @param schema A IEventGalleryCardSchemaV2 object
 * @returns A IEventGalleryCardSchemaV3 object
 */
export declare function eventGalleryCardTransformV2ToV3(schema: IEventGalleryCardSchemaV2): IEventGalleryCardSchemaV3;
export declare const EVENT_GALLERY_CARD_TRANSFORM_MAP: EventGalleryCardSchemaTransformMap;
/**
 * Applies migrations to EventGalleryCardSchema objects, ensuring we're working with the latest supported version
 * @param schema An EventGalleryCardSchema object
 * @returns a migrated EventGalleryCardSchema conforming to latest schema version
 */
export declare function migrateEventGalleryCardSchema(schema: EventGalleryCardSchema): CurrentEventGalleryCardSchema;
