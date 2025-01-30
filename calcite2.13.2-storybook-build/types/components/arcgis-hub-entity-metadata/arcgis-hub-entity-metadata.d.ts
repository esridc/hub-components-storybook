import { HubEntity, HubEntityType, IHubContent } from '@esri/hub-common';
import { VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { HeadingLevel } from '@esri/calcite-components';
import { IHubNotice } from '../../utils';
interface IMetadataItem {
  icon: string;
  title: string;
  description?: {
    value: string;
    link?: {
      url: string;
      target?: string;
      iconStart?: string;
      iconEnd?: string;
    };
    modal?: IHubNotice;
  };
  tooltip?: string;
  type?: metadataType;
}
/**
 * Different metadata type we support
 */
declare type metadataType = 'access' | 'updatedDate' | 'owner' | 'createdDate' | 'type' | 'license' | 'size' | 'members' | 'location' | 'recordCount' | 'metadataModified';
export declare class ArcgisHubEntityMetadata {
  element: HTMLElement;
  intl: ComponentIntl;
  /**
   * HubEntity Definition Json object
   */
  entity: HubEntity | IHubContent;
  /**
   * A list of the metadata to exclude
   */
  exclude: metadataType[];
  /**
   * Configure additional metadata items to display below the default metadata items. See IMetadataItem[].
   */
  additionalMetadata: IMetadataItem[];
  /**
   * The text for the list header
   */
  listHeader?: string;
  /**
   * The heading level of the list header, default is 2
   */
  headingLevel: HeadingLevel;
  hasMapFooterSlot: boolean;
  openModal: string;
  componentWillLoad(): Promise<void>;
  /**
   * Format a date for metadata display
   * @param date
   * @param precision
   * @returns
   */
  formatMetadataDate(date: string, precision: string): string;
  get licenseModal(): IHubNotice;
  /**
   * Return the entity's true type
   */
  get _entityType(): HubEntityType;
  /**
   * Get the metadata items for the access metadata field
   */
  get accessMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the created date metadata field
   */
  get createdDateMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the updated date metadata field
   */
  get updatedDateMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the owner field
   * Note: we are not really rendering an "owner" icon,
   * we use it as an identifier here for so we can render
   * a calcite avatar instead of a calcite icon for owners
   */
  get ownerMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the type field
   */
  get typeMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the license field. This includes a link to more details and a tooltip!
   */
  get licenseMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the location field, returning a location name if it exists
   */
  get locationMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the size field
   */
  get sizeMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the members field
   */
  get membersMetadataItem(): IMetadataItem;
  /**
   * Get the metadata items for the record count field. Will not show if the record count is not set.
   */
  get recordCountMetadataItem(): IMetadataItem;
  get metadataModifiedMetadataItem(): IMetadataItem;
  /**
   * Default lists of metadata for entity types
   */
  defaultMetadataList: metadataType[];
  templateMetadataList: metadataType[];
  initiativeTemplateMetadataList: metadataType[];
  groupMetadataList: metadataType[];
  userMetadataList: metadataType[];
  surveyMetadataList: metadataType[];
  /**
   * A list of metadata to render for the content type
   */
  get contentMetadataList(): metadataType[];
  /**
   * A list of metadata items to render,
   * if exclude is pass, exclude the metadata in that list
   */
  get metadata(): IMetadataItem[];
  /**
   * Render a calcite avatar for owner and a calcite icon for all other metadata
   * TODO: add fullname and thumbnail props to the calcite-avatar once we have access to them
   */
  renderIcon(metadata: IMetadataItem): HTMLElement;
  /**
   * Render the description of the metadata item, which can contain a link, modal, or just text (see IMetadataItem)
   * @param metadata the IMetadataItem to render
   * @returns a calcite-link or a span
   */
  renderDescription(metadata: IMetadataItem): HTMLElement;
  /**
   * Render the title of the metadata item
   * @param metadata the IMetadataItem to render
   * @returns a div
   */
  renderTitle(metadata: IMetadataItem): HTMLElement;
  /**
   * Render a single metadata item in the metadata field
   * @param metadata entity medadata
   */
  renderMetadataItem(metadata: IMetadataItem, id: number | string): VNode;
  /**
   * Render the footer of the metadata list
   * @returns a IMetadataItem for the map-footer slot (slot included in returned node)
   */
  renderFooter(): VNode;
  render(): any;
}
export {};
