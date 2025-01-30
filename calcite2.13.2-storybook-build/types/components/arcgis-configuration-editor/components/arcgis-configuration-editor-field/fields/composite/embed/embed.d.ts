import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IFacet } from '../../../../../../../utils/types';
import { ConfigurableViewport, _IHubEmbed } from './resources';
import { IChangeEventDetail, IConfigurationSchema, IHubCatalog, IUiSchema, IHubEmbed } from '@esri/hub-common';
/** Field to configure an embed */
export declare class Embed {
  element: HTMLElement;
  /** configured embed */
  embed: IHubEmbed;
  /** catalogs to populate the embed picker */
  catalogs: IHubCatalog[];
  /** facets to filter the embed picker */
  facets: IFacet[];
  /** title for the embed picker button + modal */
  pickerTitle: string;
  /** event emitted when the embed is updated */
  arcgisCompositeEmbedFieldChange: EventEmitter<IHubEmbed>;
  _schema: IConfigurationSchema;
  /** internal state of configured embed */
  _embed: _IHubEmbed;
  _intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  private get _context();
  get _uiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * helper function to get values from an embed based
   * on a provided viewport and path
   */
  getEmbedValue(embed: IHubEmbed | _IHubEmbed, viewport: ConfigurableViewport, path: string): any;
  /**
   * helper function to set values on an embed based
   * on a provided viewport and path
   */
  setEmbedValue(embed: IHubEmbed | _IHubEmbed, viewport: ConfigurableViewport, path: string, value: any): void;
  /**
   * function to transform the embed into a format that is
   * consistent with the underlying embed editor
   */
  transformEmbedForEditor(embed: IHubEmbed): _IHubEmbed;
  /**
   * function to transform the editor values back into
   * a IHubEmbed before emitting
   */
  transformEmbedToEmit(embed: _IHubEmbed): IHubEmbed;
  handleEmbedEditorChange: (evt: CustomEvent<IChangeEventDetail>) => Promise<void>;
  render(): any;
}
