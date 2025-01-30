import { E2EPage } from "@stencil/core/testing";
import { HubComponentPage } from "../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../test/e2e/utils";
import { AlignmentPage } from "../../../components/arcgis-configuration-editor-field/fields/alignment/test/alignment.e2e.page";
import { ColorPickerPage } from "../../../components/arcgis-configuration-editor-field/fields/color-picker/test/color-picker.e2e.page";
import { DatePickerPage } from "../../../components/arcgis-configuration-editor-field/fields/date-picker/test/date-picker.e2e.page";
import { InputPage } from "../../../components/arcgis-configuration-editor-field/fields/input/test/input.e2e.page";
import { MultiselectPage } from "../../../components/arcgis-configuration-editor-field/fields/multiselect/test/multiselect.e2e.page";
import { RichTextPage } from "../../../components/arcgis-configuration-editor-field/fields/rich-text/test/rich-text.e2e.page";
import { SelectPage } from "../../../components/arcgis-configuration-editor-field/fields/select/test/select.e2e.page";
import { SchedulerPage } from "../fields/scheduler/test/scheduler.e2e.page";
declare type FieldPage = InputPage | RichTextPage | SelectPage | MultiselectPage | AlignmentPage | ColorPickerPage | DatePickerPage | SchedulerPage;
export declare class ArcgisConfigurationEditorFieldPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private _fieldConfig;
  field: FieldPage;
  constructor(page: E2EPage, options: any);
  initialize(): Promise<void>;
  private get _label();
  private get _messageContainer();
  private _getMessage;
  verifyExists(): Promise<void>;
  verifyNotExists(): Promise<void>;
  verifyDisabled(): Promise<void>;
  verifyNotDisabled(): Promise<void>;
  verifyRequired(): Promise<void>;
  verifyNoValidationMessages(): Promise<void>;
  verifyValidationMessages(messages: {
    type: 'SUCCESS' | 'ERROR' | 'CUSTOM';
    icon?: boolean | string;
    message?: string;
  }[]): Promise<void>;
}
export {};
