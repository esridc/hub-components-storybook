import { BaseHubComponentPage, newHubComponentPage, waitForVisible } from "../../../../test/e2e/utils";
import { ArcgisConfigurationEditorFieldPage } from "../components/arcgis-configuration-editor-field/test/arcgis-configuration-editor-field.e2e.page";
import { UiSchemaElementTypes } from "@esri/hub-common";
import { InputPage } from "../components/arcgis-configuration-editor-field/fields/input/test/input.e2e.page";
import { getPropertyPathFromScope } from "../utils/getPropertyFrom";
import { RichTextPage } from "../components/arcgis-configuration-editor-field/fields/rich-text/test/rich-text.e2e.page";
import { SelectPage } from "../components/arcgis-configuration-editor-field/fields/select/test/select.e2e.page";
import { MultiselectPage } from "../components/arcgis-configuration-editor-field/fields/multiselect/test/multiselect.e2e.page";
import { ColorPickerPage } from "../components/arcgis-configuration-editor-field/fields/color-picker/test/color-picker.e2e.page";
import { DatePickerPage } from "../components/arcgis-configuration-editor-field/fields/date-picker/test/date-picker.e2e.page";
import { AlignmentPage } from "../components/arcgis-configuration-editor-field/fields/alignment/test/alignment.e2e.page";
import { SwitchPage } from "../components/arcgis-configuration-editor-field/fields/switch/test/switch.e2e.page";
import { RadioPage } from "../components/arcgis-configuration-editor-field/fields/radio/test/radio.e2e.page";
import { RadioGroupPage } from "../components/arcgis-configuration-editor-field/fields/radio-group/test/radio-group.e2e.page";
import { ImagePickerPage } from "../components/arcgis-configuration-editor-field/fields/image-picker/test/image-picker.e2e.page";
import { GalleryPickerPage } from "../components/arcgis-configuration-editor-field/fields/gallery-picker/test/gallery-picker.e2e.page";
import { TileSelectPage } from "../components/arcgis-configuration-editor-field/fields/tile-select/test/tile-select.e2e.page";
import { SchedulerPage } from "../components/arcgis-configuration-editor-field/fields/scheduler/test/scheduler.e2e.page";
import { SiteUrlPage } from "../components/arcgis-configuration-editor-field/fields/composite/site-url/test/site-url.e2e.page";
export class ArcgisConfigurationEditorPage extends BaseHubComponentPage {
  constructor(page, options) {
    super(page, options);
    this._root = 'arcgis-configuration-editor';
    this._uiSchema = (options === null || options === void 0 ? void 0 : options.uiSchema) || {};
  }
  /**
   * dynamically construct the editor's page model based
   * on the uiSchema
   */
  async initialize() {
    this.controls = {};
    const getControlPage = (uiSchema) => {
      var _a;
      return {
        'hub-field-input-input': Object.assign({ page: InputPage }, (((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.type) && { type: uiSchema.options.type })),
        'hub-field-input-rich-text': { page: RichTextPage },
        'hub-field-input-select': { page: SelectPage },
        'hub-field-input-multiselect': { page: MultiselectPage },
        'hub-field-input-color': { page: ColorPickerPage },
        'hub-field-input-date': { page: DatePickerPage },
        'hub-field-input-alignment': { page: AlignmentPage },
        'hub-field-input-switch': { page: SwitchPage },
        'hub-field-input-radio': { page: RadioPage },
        'hub-field-input-radio-group': { page: RadioGroupPage },
        'hub-field-input-image-picker': { page: ImagePickerPage },
        'hub-field-input-gallery-picker': { page: GalleryPickerPage },
        'hub-field-input-tile-select': { page: TileSelectPage },
        'hub-field-input-scheduler': { page: SchedulerPage },
        'hub-composite-input-site-url': { page: SiteUrlPage }
      };
    };
    const _buildControls = async (uiSchema) => {
      uiSchema.elements.forEach(async (element) => {
        var _a;
        if (element.type === UiSchemaElementTypes.control) {
          const propertyPath = getPropertyPathFromScope(element.scope);
          const config = Object.assign(Object.assign({}, getControlPage(element)[((_a = element.options) === null || _a === void 0 ? void 0 : _a.control) || 'hub-field-input-input']), { propertyPath });
          this.controls[propertyPath] = await newHubComponentPage(ArcgisConfigurationEditorFieldPage, this.page, {
            parent: this,
            config
          });
        }
        if (element.type === UiSchemaElementTypes.section) {
          _buildControls(element);
        }
      });
    };
    _buildControls(this._uiSchema);
  }
  async verifyLoaded() {
    await waitForVisible(this.page, this.root);
  }
  verifyControls(expectedControls) {
    // verify that _only_ the expected controls are present
    return Object.keys(this.controls).every(control => expectedControls.includes(control));
  }
}
