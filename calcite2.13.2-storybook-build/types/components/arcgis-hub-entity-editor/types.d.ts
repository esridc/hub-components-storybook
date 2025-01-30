import { HubEntity } from "@esri/hub-common";
/**
 * We must re-define item entity interfaces in such a way
 * that they can be consumed by the entity editor.
 *
 * For example: an item entity can have a view.featuredImageUrl
 * property, but the image picker field of the configuration
 * editor doesn't emit a url. It emits an image object with
 * a blob that needs to be upserted as an item resource in
 * order for us to get a featuredImageUrl to persist on the
 * entity. As such, we add a featuredImage property to the
 * editor schema to temporarily store this information until
 * the editor is saved and the image is added as a resource.
 *
 * TODO: exclude group and user entities if they are
 * added to the HubEntity type
 */
declare type HubItemEntityEditor = Partial<HubEntity> & {
  groups?: string[];
  view?: {
    featuredImage?: any;
  };
};
/**
 * We must re-define entity interfaces in such a way
 * that they can be consumed by the entity editor
 *
 * TODO: in the future, we may need to make this a
 * union type with group and user entity editor types
 */
export declare type HubEntityEditor = HubItemEntityEditor;
export interface IArcgisHubEntityEditorSavedEvent {
  entity: HubEntity;
  isSuccess: boolean;
  error?: string;
}
export {};
