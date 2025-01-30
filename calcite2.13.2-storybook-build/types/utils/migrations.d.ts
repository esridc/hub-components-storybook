/**
 * TODO: consider hoisting these to Hub.js
 */
/**
 * Base interface for migratable schemas
 */
export interface IMigratableSchema {
  schemaVersion?: number;
}
/**
 * Interface representing a map of key/value pairs where the key represents the output schema version
 * and the value represents a transform function that returns an object for that schema version.
 */
export declare type MigratableSchemaTransformMap = Record<string, (input: IMigratableSchema) => IMigratableSchema>;
/**
 * A general purpose migration utility used to transform an object from one schemaVersion to another that supports strict typings
 * @param schema The original schema to be transformed
 * @param transforms A map of supported transforms where the key is the schemaVersion and the value is the transform fn
 * @returns A transformed schema reflecting the latest supported schema version
 */
export declare function migrateSchema<Input extends IMigratableSchema, Output extends IMigratableSchema, Transforms extends MigratableSchemaTransformMap>(schema: Input, transforms: Transforms): Output;
