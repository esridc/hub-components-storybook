import { IChangeEventDetail, IUiSchema } from '@esri/hub-common';
import { ISectionParams } from './resources';
import { CONFIGURATION_VARIANTS, TranslationFunc } from '../../resources';
import { Scale } from '@esri/calcite-components';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisConfigurationEditorSection {
  element: HTMLElement;
  /**
   * whether the section is disabled - this is only
   * relevant for collapsible block sections and
   * step sections
   */
  disabled: boolean;
  /** section label */
  label: string;
  /** the editor's current state (values + validity) */
  model: IChangeEventDetail;
  /** section uiSchema */
  uiSchema: IUiSchema;
  scale: Scale;
  /** translation function */
  t: TranslationFunc;
  /** optionally adds preset styling for well-known contexts */
  variant: CONFIGURATION_VARIANTS;
  _intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * Determines if the current section is either:
   * a. the last section in a series of sections/fields
   * b. a section before a field
   *
   * we use this to stamp a class onto the child
   * section component to conditionally apply
   * bottom margins to sections
   */
  get isLastSection(): boolean;
  /**
   * The following provides a mapping of section
   * types to section component names
   */
  get sectionComponent(): string;
  /**
   * compiled parameters that get passed down to the
   * individual section component
   */
  get sectionParams(): ISectionParams;
  /** section helper text */
  get helperText(): Record<string, string>;
  renderNestedSection(): HTMLElement;
  renderSectionContent(): HTMLElement;
  render(): any;
}
