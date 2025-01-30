import { EntityEditorType, HubEntity, HubEntityType, HubFamily } from '@esri/hub-common';
export interface IHubNewContentEntityConfig {
  /**
   * unique entity identifier
   */
  key: HubFamily | HubEntityType;
  /**
   * translated button label - used for both single-entity
   * creation buttons and multi-entity dropdown buttons. If
   * no label is provided, a default is provided for both
   * experiences
   */
  label?: string;
  /**
   * translated form label - this will be rendered in the
   * in-place creation form header (if applicable). If no
   * form label is provided, a default is provided based
   * on the entity type
   */
  formLabel?: string;
  /**
   * translated description explaining the purpose of the
   * entity to be created - this will be used on both
   * the in-place creation form (if applicable) and in
   * the new dropdown menu. If no description is provided,
   * a default is provided based on the entity type
   */
  description?: string;
  /**
   * icon representing the entity to be created - this
   * will be used in both the in-place creation form (if
   * applicable) and in the new dropdown menu. If no icon
   * is provided, a fallback is derived
   */
  icon?: string;
  /**
   * for in-place creation, optionally provide the editor type
   * identifier - this determines which uiSchema is used to
   * render the form. By default, we will render the form
   * associated with the hub:<entityConfig.key>:create editorType
   */
  editorType?: EntityEditorType;
  /**
   * optional link to redirect to. This allows us to link to
   * the existing /edit/new routes for entities that we don't
   * yet have a modal-based editor workflow for
   */
  href?: string;
  /**
   * for in-place creation, optionally provide context-specific
   * default values to the form
   */
  defaults?: Partial<HubEntity>;
  disabled?: boolean;
  disabledTooltip?: string;
}
export interface IHubNewContentResourceLink {
  /**
   * unique resource link identifier
   */
  key: string;
  /**
   * translated resource link label
   */
  label: string;
  /**
   * resource link
   */
  href: string;
}
