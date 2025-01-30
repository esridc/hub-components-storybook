import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IFacet } from '../../../../../../../utils/types';
import { CalciteSortableListCustomEvent } from '@esri/calcite-components';
import { _IActionLink, _IActionLinkSection, _IContentActionLink } from './types';
import { IChangeEventDetail, IConfigurationSchema, IHubCatalog, IUiSchema, HubActionLink } from '@esri/hub-common';
/**
 * This component is for configuring action links. Action
 * links can be configured as buttons or blocks.
 *
 * Note: this can be used as a standalone component
 * or within the context of a configuration editor.
 */
export declare class ActionLinks {
  element: HTMLElement;
  /** configured action links */
  links: HubActionLink[];
  /** catalogs to populate the "existing content" picker */
  catalogs: IHubCatalog[];
  /** facets to filter the "existing content" picker */
  facets: IFacet[];
  /** specifies the type of action links being configured */
  type: 'button' | 'block';
  /** internal copy of the links */
  _links: _IActionLink[];
  /** unique identifier of the link being edited */
  _editKey: string;
  _showDeleteWarning: boolean;
  /** event emitted when links are updated/added/removed */
  arcgisCompositeActionLinksFieldChange: EventEmitter<HubActionLink[]>;
  intl: ComponentIntl;
  _linkSchema: IConfigurationSchema;
  _sectionSchema: IConfigurationSchema;
  _sectionUiSchema: IUiSchema;
  _unsavedChanges: _IActionLink[];
  componentWillLoad(): Promise<void>;
  private get _context();
  get _linkUiSchema(): IUiSchema;
  /**
   * helper util to recursively traverse an array of
   * links and find one by its unique key
   */
  findLinkByKey: (key: string, links?: _IActionLink[]) => _IActionLink;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * we keep track of any changes made to a link that's
   * being edited before the "save" button is clicked.
   * This resets the internal state to effectively
   * discard the changes and collapse the open editor
   */
  resetUnsavedChanges: () => void;
  /**
   * we map over the links that are passed into the
   * component and transform them into a format that
   * is consistent with the underlying link editor
   * schema.
   */
  transformLinksForEditor(links: HubActionLink[], parent?: _IActionLink): Promise<_IActionLink[]>;
  /**
   * we map over the updated links and transform them
   * back into HubActionLinks to emit to the consumer
   */
  transformLinksToEmit(links: _IActionLink[]): HubActionLink[];
  /**
   * Function to set the internal _href property on a content link to allow the user
   * to preview the link in the editing experience
   * @param link
   * @returns
   */
  setInternalLinkHref: (link: _IContentActionLink) => Promise<_IContentActionLink>;
  handleAddLink: (evt: CustomEvent<void>) => void;
  handleEditLink: (evt: MouseEvent) => void;
  handleDeleteLink: () => void;
  handleSaveLink: () => void;
  handleLinkEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  handleCancelLink: () => void;
  handleLinkEditorAction: (evt: CustomEvent<{
    action: string;
    model: IChangeEventDetail;
  }>) => void;
  handleLinkOrderChange: (evt: CalciteSortableListCustomEvent<void>) => void;
  renderLinks(links?: _IActionLink[]): HTMLCalciteSortableListElement;
  renderSection(section: _IActionLinkSection, showDragHandle: boolean): HTMLCalciteBlockElement | HTMLArcgisConfigurationEditorElement;
  renderLink(link: _IActionLink, showDragHandle: boolean): HTMLCalciteBlockElement | HTMLArcgisConfigurationEditorElement;
  renderBlockActions(linkKey: string): HTMLElement;
  renderSectionEditor(): HTMLArcgisConfigurationEditorElement;
  renderLinkEditor(): HTMLArcgisConfigurationEditorElement;
  renderAddButtons(): HTMLCalciteButtonElement[];
  render(): any;
}
