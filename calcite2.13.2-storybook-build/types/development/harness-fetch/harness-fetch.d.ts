import { HubEntity, HubEntityType } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
/**
 * The harness-fetch component is meant for use in dev harnesses
 * that require a full hub entity to be passed into their component.
 * This component accepts an identifier (id or slug) and type, and
 * will fetch the corresponding entity which it will:
 *
 * 1. emit in an event that a consuming harness can listen for
 * 2. pass into any slotted content
 */
export declare class HarnessFetch {
  /**
   * prop name on the slotted content to pass the
   * full entity into
   */
  entityProp: string;
  /** hub entity id or slug */
  identifier: string;
  /** hub entity type */
  type: HubEntityType;
  /** default entity identifiers */
  defaults: Record<HubEntityType, string>;
  /** whether to render the identifier input field */
  showIdentifierInput: boolean;
  /** whether to render the type input field */
  showTypeInput: boolean;
  /** Event containing the full entity once it's been fetched */
  harnessFetchEntity: EventEmitter<HubEntity>;
  /** portal auth information */
  _context: import("@esri/hub-common").IArcGISContext;
  /** internal copy of the identifier */
  _identifier: string;
  /** internal copy of the type */
  _type: HubEntityType;
  /** reference to the slotted content */
  _slottedElements: Element[];
  fetchEntity(): Promise<void>;
  componentWillLoad(): Promise<void>;
  /** append an "identifier" query param to the URL */
  handleIdentifierChange: (evt: CustomEvent<any>) => void;
  setIdentifier(identifier: string): Promise<void>;
  /** append a "type" query param to the URL */
  handleTypeChange: (evt: CustomEvent<any>) => void;
  /**
   * grab a reference to the slotted content so we can pass
   * the entity in once it's fetched
   */
  handleSlotChange: (evt: CustomEvent) => void;
  /**
   * helper function to append query params to the url
   *
   * note: normally this is not something a component
   * should handle, but since this is meant for harnesses
   * only, it takes away some of the burden on devs to
   * need to hook this up in their harness
   */
  appendParams: (params: Record<string, string>) => void;
  renderTypeInput(): HTMLCalciteComboboxElement;
  renderIdentifierInput(): HTMLCalciteInputElement;
  render(): any;
}
