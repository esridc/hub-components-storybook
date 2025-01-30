import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteDropdownElement, HTMLCalciteDropdownGroupElement, HTMLCalciteDropdownItemElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../utils/stencil-intl';
import { Scale, Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { ButtonColor } from '../../utils/calcite';
import { IHubNewContentEntityConfig, IHubNewContentResourceLink } from './resources';
import { IArcgisHubEntityEditorSavedEvent } from '../arcgis-hub-entity-editor/types';
import { EntityEditorType, IEntityEditorContext } from '@esri/hub-common';
/**
 * The arcgis-hub-new-content renders a dropdown or
 * standalone button to initiate the creation of new
 * hub entities. The component allows you to configure
 * in-place creation workflows (using the entity-editor
 * under the hood) OR redirect to an integrated creation UI
 */
export declare class ArcgisHubNewContent {
  element: HTMLElement;
  /**
   * calcite-button appearance
   * @type {Appearance}
   * @memberof ArcgisHubNewContent
   */
  buttonAppearance: Appearance;
  /**
   * TODO: deprecate this and replace w/ buttonKind
   * calcite-button color
   * @type {ButtonColor}
   * @memberof ArcgisHubNewContent
   */
  buttonColor: ButtonColor;
  /**
   * optional hub-specific contextual information to help
   * pre-populate the editor
   */
  editorContext: IEntityEditorContext;
  /**
   * array of content entities
   * @type {IHubNewContentEntityConfig[]}
   * @memberof ArcgisHubNewContent
   */
  entityConfigs: IHubNewContentEntityConfig[];
  /**
   * array of resource links to render below
   * the content create buttons in the dropdown
   * @type {IHubNewContentResourceLink[]}
   * @memberof ArcgisHubNewContent
   */
  resourceLinks: IHubNewContentResourceLink[];
  /**
   * optional prop to force button to render as a
   * dropdown even if there's only a single entity.
   * If there's more than 1 entity, a dropdown will
   * render by default
   * @type {boolean}
   * @memberof ArcgisHubNewContent
   */
  renderAsDropdown: boolean;
  /**
   * calcite-button scale
   * @type {Scale}
   * @memberof ArcgisHubNewContent
   */
  buttonScale: Scale;
  isMobile: boolean;
  selectedEntityIdx: number;
  /** whether the new content form is open */
  isFormOpen: boolean;
  /**
   * whether the form's modal has actually been
   * opened - we use this to conditionally render
   * the form's slotted content, otherwise there's
   * a small glitch where the content renders
   * prematurely (outside of the form) when the
   * form opens
   */
  isFormModalOpen: boolean;
  isMobileDropdownOpen: boolean;
  arcgisHubNewContentSuccess: EventEmitter<Record<string, any>>;
  arcgisHubNewContentError: EventEmitter<string>;
  hubTelemetry: EventEmitter<any>;
  handleArcgisHubNewContentModalOpen(): void;
  handleArcgisHubNewContentModalClosed(): void;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  get isSingleEntity(): boolean;
  /**
   * keep track of the selected entity based on what the user
   * selects from the dropdown menu. Or, if there is only a
   * single entity, set that as the selected entity
   */
  get selectedEntity(): IHubNewContentEntityConfig;
  get hasResourceLinks(): boolean;
  get formTitle(): string;
  get formDescription(): string;
  get editorType(): EntityEditorType;
  getIcon(entityConfig: IHubNewContentEntityConfig): string;
  handleDropdownSelect: (evt: MouseEvent) => void;
  handleResourceLinkClick: (evt: MouseEvent) => void;
  /**
   * when an entity is selected from the dropdown, we either
   * redirect to the entity's provided href, or we open the
   * creation form in-place
   */
  handleEntitySelected: () => void;
  /**
   * workaround for dropdown scrolling issue. Technically this should be addressed
   * by passing in the max-items prop to the dropdown, but there are a couple issues
   * on calcite's end:
   * https://github.com/Esri/calcite-components/issues/6230
   * https://github.com/Esri/calcite-components/issues/6242
   * TODO: remove when calcite issues are addressed
   */
  handleCalciteDropdownRef: (dropdown: HTMLCalciteDropdownElement) => void;
  handleEntityEditorSaved: (evt: CustomEvent<IArcgisHubEntityEditorSavedEvent>) => Promise<void>;
  /**
   * because we wrap the arcgis-hub-entity-editor in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't loose the DOM context
   */
  handleHubTelemetry: (evt: CustomEvent<Record<string, any>>) => void;
  /**
   * if an entity has an in-place creation form (rather than a
   * redirect link), we open that form in a modal
   */
  toggleForm: (isOpen: boolean) => Promise<void>;
  onOpenMobileDropdownButtonClick: () => void;
  onCloseMobileDropdownButttonClick: () => void;
  /**
   * render the main "New" dropdown button:
   * - if we're on a mobile device, this will render as a "+" button
   * - if there's only a single entity, and we haven't specified that
   * it should render as a dropdown, we render a simple calcite button
   * - if there are multiple entities, we render a calcite dropdown
   */
  renderNewDropdownButton(entityConfigs: IHubNewContentEntityConfig[], resourceLinks: IHubNewContentResourceLink[]): HTMLElement;
  renderDropdown(entityConfigs: IHubNewContentEntityConfig[], resourceLinks: IHubNewContentResourceLink[]): HTMLCalciteDropdownElement;
  /**
   * render the "dropdown" modal that opens when a user
   * is on a mobile device. We render the entities and
   * resource links in exactly the same way as non-mobile,
   * we just render them in a modal instead of a dropdown
   */
  renderMobileDropdown(entityConfigs: IHubNewContentEntityConfig[], resourceLinks: IHubNewContentResourceLink[]): HTMLElement;
  renderDropdownContent(entityConfigs: IHubNewContentEntityConfig[], resourceLinks: IHubNewContentResourceLink[]): HTMLElement;
  renderEntityItems(entityConfigs: IHubNewContentEntityConfig[]): HTMLCalciteDropdownGroupElement;
  renderEntityItem(entity: IHubNewContentEntityConfig, index: number): HTMLCalciteDropdownItemElement;
  renderResourceLinks(resourceLinks: IHubNewContentResourceLink[]): HTMLCalciteDropdownGroupElement;
  renderResourceLink(resourceLink: IHubNewContentResourceLink): HTMLCalciteDropdownItemElement;
  renderFormHeader(): HTMLElement;
  /**
   * if an entity has an in-place creation form, we render
   * the form in a modal
   */
  renderForm(): HTMLElement;
  render(): any;
}
