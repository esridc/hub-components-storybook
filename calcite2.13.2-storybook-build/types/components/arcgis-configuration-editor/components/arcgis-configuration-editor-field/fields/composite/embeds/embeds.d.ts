import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IFacet } from '../../../../../../../utils/types';
import { IChangeEventDetail, IConfigurationSchema, IHubCatalog, IUiSchema, IHubEmbed } from '@esri/hub-common';
/**
 * Field to configure multiple embeds
 *
 * NOTE: for now, this is a basic implementation,
 * that only really supports configuring a single
 * embed. In the future, we will support configuring
 * multiple embeds in a similar fashion to how
 * we support configuring multiple action links.
 * This was created for the purposes of emitting
 * an array of embeds
 */
export declare class Embeds {
  element: HTMLElement;
  /** configured embed */
  embeds: IHubEmbed[];
  /** catalogs to populate the embed picker */
  catalogs: IHubCatalog[];
  /** facets to filter the embed picker */
  facets: IFacet[];
  /** title for the embed picker button + modal */
  pickerTitle: string;
  /** internal state of configured embeds */
  _embeds: IHubEmbed[];
  /** event emitted when the embed is updated */
  arcgisCompositeEmbedsFieldChange: EventEmitter<IHubEmbed[]>;
  _intl: ComponentIntl;
  _schema: IConfigurationSchema;
  componentWillLoad(): Promise<void>;
  get _uiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  handleEmbedEditorChange: (evt: CustomEvent<IChangeEventDetail>) => Promise<void>;
  render(): any;
}
