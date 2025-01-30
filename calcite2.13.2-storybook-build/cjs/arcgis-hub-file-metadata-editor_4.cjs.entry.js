'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const util = require('./util-38e73510.js');
const types = require('./types-097b54b1.js');
const extent = require('./extent-715f7c8d.js');
const debounce = require('./debounce-bd990e9f.js');
const validateUrl = require('./validate-url-3bd483e6.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');
require('./logger-5db3d659.js');
require('./is-service-9b8238d2.js');

const SCHEMA = {
  required: ['title'],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1
    },
    snippet: {
      type: 'string',
      maxLength: 2048
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'snippet',
      scope: '/properties/snippet',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      labelKey: 'tags',
      scope: '/properties/tags',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect'
      }
    }
  ]
};

const ArcgisHubFileMetadataEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubFileMetadataEditorChange = index.createEvent(this, "arcgisHubFileMetadataEditorChange", 7);
    this._schema = util.cloneObject(SCHEMA);
    this._uiSchema = util.cloneObject(UI_SCHEMA);
    this.values = {};
    context.bind(this, 'translationFunc');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  handleValuesChanged() {
    // clone values to avoid mutation
    this.internalValues = util.cloneObject(this.values);
  }
  /**
   * Emit an event with the updated item metadata values when a field in
   * the arcgis-configuration-editor is changed
   * @param event
   */
  handleEditorChangeEvent(event) {
    event.stopPropagation();
    this.arcgisHubFileMetadataEditorChange.emit(event.detail);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (index.h("div", null, index.h("arcgis-configuration-editor", { schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.internalValues })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "values": ["handleValuesChanged"]
  }; }
};

/**
 * Takes a file name and compares it against a list of extensions from online to extract the
 * extension itself.
 * @param name File name
 * @returns Object containing filename without extension, the full file name, and the extension
 */
function sanitizeFileName(name) {
  // Regex to extract extension.
  const expression = /(?:\.([^.]+))?$/;
  // if there is another period or dash regex
  const invalidTitleCharacters = /\.|-/g;
  // Cleans up the filename.
  const fileName = name.replace(/^.*(\\|\/|:)/, "");
  // Get the extension
  let extension = (fileName && expression.exec(fileName)[1] ? expression.exec(fileName)[1].toLowerCase() : "");
  // Default title
  let title = "";
  // Handles RFT file extension
  if (fileName.indexOf(".rft.") > -1) {
    const [name, suffix] = fileName.split(".rft.");
    extension = `rft.${suffix}`;
    title = name;
  }
  // Files name without extension
  if (fileName && !title) {
    title = fileName.lastIndexOf(".") === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf("."));
  }
  // Replace any invalid characters with an underscore
  title = title.replace(invalidTitleCharacters, "_");
  // Return object
  return { title, fileName, extension };
}
/**
 * Compare files extension to the master list of possibilities. Returns an array of possible item types
 *
 * @export
 * @param {FileExtension} extension Files extension
 * @param {AllowedFileTypes} allowedFileTypes File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {FileType[]}
 */
function findPossibleItemTypesByExtension(extension, allowedFileTypes) {
  // Get the list of item types from the list of options.
  const itemTypes = Object.keys(types.addCreateItemTypes);
  // empty array to add to.
  const possibleItemTypes = [];
  // Iterate item types
  itemTypes.forEach((type) => {
    var _a, _b, _c;
    // If the type has a file extension and the files extension is present.
    if (((_a = types.addCreateItemTypes[type].fileExt) === null || _a === void 0 ? void 0 : _a.indexOf(extension)) >= 0) {
      // If the validate function was passed a smaller list of item types that can be used
      // We want to compare against that as well, though the master list is the first gate keeper.
      // If those file types were passed down...
      if (allowedFileTypes) {
        if (
        // If that smaller subset includes the extension
        ((_b = allowedFileTypes.extensions) === null || _b === void 0 ? void 0 : _b.indexOf(extension)) >= 0
          // Of if it matches the types name (for example type === 'Image' actually matches jpg, jpeg, png, tif, and tiff)
          || ((_c = allowedFileTypes.types) === null || _c === void 0 ? void 0 : _c.indexOf(types.addCreateItemTypes[type].type)) >= 0) {
          // Then add the specific type fo possibleItemTypes.
          possibleItemTypes.push(types.addCreateItemTypes[type]);
        }
      }
      else {
        // If allowedFileTypes was not passed in then add the type to possibleItemTypes.
        possibleItemTypes.push(types.addCreateItemTypes[type]);
      }
    }
  });
  return possibleItemTypes;
}
/**
 * Validate passed in file/files bbased on number of files, size of the file, and file extension
 *
 * @export
 * @param {FileList} files File/files passed in
 * @param {number} maxFileSize Maximum size of file
 * @param {AllowedFileTypes} [allowedFileTypes] File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {{ success: boolean; errorMessage?: string }}
 */
function validateAddedFile(files, maxFileSize, allowedFileTypes) {
  let valid = false;
  let errorMessage;
  // Check if multiple files uploaded,
  if (files.length > 1) {
    errorMessage = 'multipleFilesError';
    // Check if file is too big
  }
  else if (files[0].size > maxFileSize) {
    errorMessage = 'fileTooLargeError';
    // If it passes then update to true
  }
  else {
    // Get possible types.
    const possibleTypes = findPossibleItemTypesByExtension(sanitizeFileName(files[0].name).extension, allowedFileTypes);
    // is it valid?
    const validType = possibleTypes.length > 0; // May be extended to vet orgOnly / public user
    if (!validType) {
      errorMessage = 'unsupportedFileTypeError';
    }
    else {
      valid = true;
    }
  }
  // Check if file extension is supported
  return { success: valid, errorMessage };
}

const arcgisHubFileSelectCss = ":host{box-sizing:border-box;display:block;width:100%;border-width:1px;border-style:dashed;padding-top:2rem;padding-bottom:2rem;text-align:center;transition:all 200ms ease-in-out;border-color:#828282;background-color:var(--calcite-color-foreground-1)}:host(.dragging){border-color:var(--calcite-color-brand);background-color:rgba(0, 121, 193, 0.05)}:host(.error){background-color:#FFF1EF;border-color:var(--calcite-color-status-danger)}:host(.success){border-color:var(--calcite-color-status-success);color:var(--calcite-color-status-success)}header{margin-bottom:5px;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}p{margin-top:5px;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}a{display:block}input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}";

/**
 * Maps type from the file (mime type) to a human readable type and extension.
 */
const mimeTypes = {
  'image/png': types.ItemType.Image,
  'image/jpeg': types.ItemType.Image,
  'image/tiff': types.ItemType.Image,
  'image/tif': types.ItemType.Image,
  'text/csv': types.ItemType.CSV,
  'application/pdf': types.ItemType.PDF,
  'application/geo+json': types.ItemType.GeoJson,
  'application/vnd.ms-excel': types.ItemType["Microsoft Excel"],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': types.ItemType["Microsoft Excel"],
  'application/msword': types.ItemType["Microsoft Word"],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': types.ItemType["Microsoft Word"],
  'application/vnd.ms-powerpoint': types.ItemType["Microsoft Powerpoint"],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': types.ItemType["Microsoft Powerpoint"]
};
const dateFormatOptions$1 = { month: 'short', day: 'numeric', year: 'numeric' };
const ArcgisHubFileSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubFileSelected = index.createEvent(this, "arcgisHubFileSelected", 7);
    this.arcgisHubDragOver = index.createEvent(this, "arcgisHubDragOver", 7);
    this.componentType = 'content';
    this.maxSize = 200;
    this.owner = undefined;
    this.defaultExtent = undefined;
    this.allowedFileTypes = undefined;
    this.portalName = undefined;
    this.errorMessage = undefined;
    this.files = undefined;
    this.isDragging = undefined;
    context.bind(this, 'handleDragOver', 'handleDragLeave', 'handleDrop', 'setInputEl', 'onInputChange', 'buttonRef', 'onButtonClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  /**
   * Watches files State && validates selected file/files.
   * On success selected file is emitted
   * On failure error state.
   *
   * @memberof ArcgisHubFileSelect
   */
  validateFiles() {
    const { files, allowedFileTypes } = this;
    const maxSize = this.maxSize * 1000 * 1000;
    // If a file was selected...
    if (files) {
      // Validate file
      const { success, errorMessage } = validateAddedFile(files, maxSize, allowedFileTypes);
      // If successfully validated
      if (success) {
        // Reset error message
        this.errorMessage = undefined;
        // Choose file
        const file = files[0];
        // Create item for use in createItem call
        const mergedFileItem = {
          owner: this.owner,
          extent: extent.extentToBBox(this.defaultExtent),
          spatialReference: this.defaultExtent.spatialReference,
          source: this.portalName,
          publishedDate: this.intl.formatDate(new Date(), dateFormatOptions$1),
          access: 'private',
          title: this.trimExtension(file.name),
          type: mimeTypes[file.type],
          modified: file.lastModified,
          file
        };
        // Emit item.
        this.arcgisHubFileSelected.emit(mergedFileItem);
      }
      else {
        this.errorMessage = errorMessage;
      }
    }
  }
  /**
   * Removes extension from filename.
   */
  trimExtension(filename) {
    const spl = filename.split('.');
    // Filename may have more than one '.' in it.
    return spl.splice(0, spl.length - 1).join('.');
  }
  // Focus Main input
  async focusMainInput() {
    this.mainInputRef.focus();
  }
  // Clear selected file.
  async clearSelectedFile() {
    this.files = undefined;
  }
  /**
   * Takes passed in allowedFileTypes and returns a list of all possible extensions, made unique.
   * allowedFileTypes can have an array of human readable File Types And/OR an array of extensions
   * To compile this into one list the below is needed.
   *
   * @readonly
   * @type {string[]}
   * @memberof ArcgisHubFileSelect
   */
  get fileExtensionsFromAllowedFileTypes() {
    var _a, _b;
    const { allowedFileTypes } = this;
    // Start out with an empty array.
    let list = [];
    // If we passed in file types via allowedFileTypes then use those...
    if ((_a = allowedFileTypes === null || allowedFileTypes === void 0 ? void 0 : allowedFileTypes.extensions) === null || _a === void 0 ? void 0 : _a.length) {
      list = [...list, ...this.allowedFileTypes.extensions];
    }
    // Types could have also been passed in. In which case we should add the exts matched to them.
    // If types were passed in instead we'll need to look up them from addCreateItemTypes.
    if ((_b = allowedFileTypes === null || allowedFileTypes === void 0 ? void 0 : allowedFileTypes.types) === null || _b === void 0 ? void 0 : _b.length) {
      // Iterate over all types
      list = allowedFileTypes.types.reduce((exts, type) => {
        // If it exists on addCreateItemTypes
        return (types.addCreateItemTypes[type] && types.addCreateItemTypes[type].fileExt)
          // add the possible file extensions
          ? [...exts, ...types.addCreateItemTypes[type].fileExt]
          : exts;
      }, list);
    }
    // Numerous types may have overlapping extensions, so we create a new Set to get unique exts.
    list = [...new Set(list)];
    // Return list.
    return list;
  }
  // Is there a file selected AND no error?
  get isFileSelected() {
    return this.files && !this.errorMessage;
  }
  // Handles drag over event.
  handleDragOver(e) {
    if (e.dataTransfer.types.includes('Files') && !this.isFileSelected) {
      e.preventDefault();
      this.isDragging = true;
      this.arcgisHubDragOver.emit(this.isDragging);
    }
    return false;
  }
  handleDragLeave() {
    this.isDragging = false;
  }
  // Handles drop of drag event.
  handleDrop(e) {
    e.preventDefault();
    this.isDragging = false;
    this.files = e.dataTransfer.files;
  }
  // Handles the selection of file from clicking browse button
  onInputChange(e) {
    this.files = Object.assign({}, e.target.files);
  }
  // Input element ref
  setInputEl(el) {
    this.inputElement = el;
  }
  // Get list of file types for the input element accept attr.
  get inputAcceptList() {
    let list = this.fileExtensionsFromAllowedFileTypes;
    // If nothing was passed in via allowedFileTypes then we should grab the defaults from FileExtension
    if (!list.length) {
      list = Object.keys(types.FileExtension);
    }
    // Combine all together in a comma separated list
    return `.${list.join(', .')}`;
  }
  onButtonClick() {
    var _a;
    if (this.isFileSelected) {
      this.clearSelectedFile();
    }
    else {
      (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.click();
    }
  }
  buttonRef(el) {
    this.mainInputRef = el;
  }
  get buttonIntl() {
    const { isFileSelected, componentType } = this;
    let button = 'contentButton';
    if (isFileSelected) {
      button = 'clearButton';
    }
    else if (componentType === 'image') {
      button = 'imageButton';
    }
    return button;
  }
  // Handle heading intl because of the variety of options...
  get headingIntl() {
    const { componentType, errorMessage, files } = this;
    // If there's an error return error heading
    let heading = 'contentHeading';
    if (errorMessage) {
      heading = 'errorHeading';
    }
    else if (files && !errorMessage) {
      // Otherwise if files have been selected, but no error then we want the selected heading
      heading = 'selectedHeading';
    }
    else if (componentType === 'image') {
      heading = 'imageHeading';
    }
    return heading;
  }
  // Render details block.
  renderDetails() {
    // Destructure the things from this.
    const { errorMessage, files, isFileSelected, maxSize, fileExtensionsFromAllowedFileTypes, intl } = this;
    let fileTypes;
    // Determine if we should show link or not
    const showLink = !fileExtensionsFromAllowedFileTypes.length || fileExtensionsFromAllowedFileTypes.length > 15;
    // Which intl string should be used: error, just the max size part as we are showing a link, or max size && file types
    let bodyText = 'maxSizeAndSupportedTypes';
    if (errorMessage) {
      bodyText = errorMessage;
    }
    else if (showLink) {
      bodyText = 'maxSize';
    }
    // If we aren't showing a link or the error message we want a list of the file types.
    if (!showLink || errorMessage) {
      fileTypes = fileExtensionsFromAllowedFileTypes.join(', ');
    }
    // Get the strings
    let text = intl.t(bodyText, { maxSize, fileTypes });
    if (errorMessage) {
      text = intl.t(bodyText);
    }
    else if (isFileSelected) {
      text = files[0].name;
    }
    else if (showLink) {
      text = intl.t(bodyText, { maxSize });
    }
    // Return the DOM
    let dom = (index.h("p", null, text));
    if (showLink && !errorMessage) {
      // TODO: Link below doesn't exist, but will go to docs re supported file extensions in the future. Put it in
      // here when we get the url.
      dom = (index.h("p", null, text, index.h("a", { href: "" }, intl.t('linkText'))));
    }
    return dom;
  }
  render() {
    return (index.h(index.Host, { class: {
        ["file-select-zone"]: true,
        dragging: this.isDragging,
        error: !!this.errorMessage,
        success: this.isFileSelected
      }, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, onDrop: this.handleDrop }, index.h("calcite-icon", { "aria-hidden": "true", icon: `${this.isFileSelected ? "check-circle" : "upload"}`, scale: "l" }), index.h("header", null, this.intl.t(this.headingIntl)), this.renderDetails(), index.h("input", { accept: this.inputAcceptList, onChange: this.onInputChange, ref: this.setInputEl, tabIndex: -1, type: "file" }), index.h("calcite-button", { appearance: "outline", onClick: this.onButtonClick, ref: this.buttonRef }, this.intl.t(this.buttonIntl)), index.h("slot", null)));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "files": ["validateFiles"]
  }; }
};
ArcgisHubFileSelect.style = arcgisHubFileSelectCss;

const arcgisHubGroupsSharingCss = "header{font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);margin-bottom:0.375rem}calcite-label{--calcite-font-size--1:16px}";

const ArcgisHubGroupsSharing = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubSelectedGroupsChange = index.createEvent(this, "arcgisHubSelectedGroupsChange", 7);
    /**
     * Internal tracking of selected groups
     * Keep track of selected / deselected groups internally to keep things clean
     */
    this.internalSelectedGroups = [];
    this.internalDeselectedGroups = [];
    this.groups = [];
    this.selectedGroups = [];
    context.bind(this, 'updateSelectedGroups', '_shouldGroupBeSelected');
  }
  /**
   * Func bound to onCalciteCheckboxChange event.
   * Done this way because said event doesn't return anything, and this is needed to avoid
   * digging down the shadowdom tree to get at the correct target.
   */
  updateSelectedGroups(evt) {
    if (evt.target.checked) {
      this.internalSelectedGroups.push(evt.target.value);
      // remove it from deselected groups array
      this.internalDeselectedGroups = this.internalDeselectedGroups.filter(groupId => groupId !== evt.target.value);
    }
    else { // If deselected
      // Add it to deselected groups array
      this.internalDeselectedGroups.push(evt.target.value);
      // remove it from selected groups array.
      this.internalSelectedGroups = this.internalSelectedGroups.filter(groupId => groupId !== evt.target.value);
    }
    // Emit out results.
    this.arcgisHubSelectedGroupsChange.emit({
      share: this.internalSelectedGroups,
      unshare: this.internalDeselectedGroups
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // If any selected groups were passed down in
    if (this.selectedGroups.length) {
      // Add them to our internal tracking of selected groups.
      this.internalSelectedGroups = this.internalSelectedGroups.concat(this.selectedGroups);
    }
  }
  _shouldGroupBeSelected(id) {
    const val = this.internalSelectedGroups.find(internalGroup => internalGroup.id === id);
    return !!val;
  }
  render() {
    if (this.groups.length) {
      return (index.h("div", null, index.h("header", null, this.intl.t('heading')), this.groups.map((group) => index.h("calcite-label", { key: group.id, layout: "inline" }, index.h("calcite-checkbox", { checked: this._shouldGroupBeSelected(group.id), name: group.title, onCalciteCheckboxChange: this.updateSelectedGroups, value: group }), group.title))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubGroupsSharing.style = arcgisHubGroupsSharingCss;

const arcgisHubUrlContentFormCss = ":host{display:flex;flex-direction:column;align-items:center}header{margin-bottom:5px;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}calcite-input{width:100%}span{margin-top:5px;display:flex;align-items:center;justify-content:center;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}calcite-icon[class=\"error\"]{color:var(--calcite-color-status-danger)}calcite-icon[class=\"success\"]{color:var(--calcite-color-status-success)}calcite-icon{margin-right:0.625rem}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const dateFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
const ArcgisHubUrlContentForm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubUrlValidated = index.createEvent(this, "arcgisHubUrlValidated", 7);
    this.arcgisHubItemTypeSelected = index.createEvent(this, "arcgisHubItemTypeSelected", 7);
    // Types, intl and type mapping.
    this.types = [
      // since Doc Link is the default we need to set it to active in the dropdown
      { intl: 'doclink', type: 'Document Link', active: true },
      { intl: 'csv', type: 'CSV' },
      { intl: 'shp', type: 'Shapefile' },
      { intl: 'geojson', type: 'GeoJson' },
      { intl: 'featureservice', type: 'Feature Service' },
      { intl: 'xls', type: 'Microsoft Excel' },
      { intl: 'pdf', type: 'PDF' },
      { intl: 'png', type: 'Image' },
      { intl: 'jpg', type: 'Image' }
    ];
    this.owner = undefined;
    this.defaultExtent = undefined;
    this.portalName = undefined;
    this.selectedTypeText = undefined;
    this.errorString = undefined;
    this.showTypePicker = false;
    this.validatedUrlItem = undefined;
    this.mergedUrlItem = undefined;
    context.bind(this, 'setDropdownEl', 'setInputEl', 'handleOnInput', 'handleOnKeyDown');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  validateDebounced() {
    this.validateUrl();
  }
  /**
   * Listen to the calciteDropdownSelect event, gets the selected type,
   * sets the type on the validatedUrlItem, and then emits out the validatedUrl item.
   */
  handleItemTypeSelection() {
    const selectedItem = this.dropdownEl.selectedItems[0];
    if (selectedItem) {
      const selectedValue = selectedItem.dataset.value;
      // Update dom text with the title attr (it will already be translated)
      this.selectedTypeText = selectedItem.getAttribute('title');
      // If there's already a validatedUrlItem object...
      if (this.validatedUrlItem) {
        // Update the type on it to this new type.
        this.validatedUrlItem.type = selectedValue;
        // also add it to mergedUrlItem
        this.mergedUrlItem.type = selectedValue;
        // Emit out the object.
        this.arcgisHubItemTypeSelected.emit(this.mergedUrlItem);
      }
    }
  }
  /**
   * Handles url validation.
   * Gets the url from the inputEl element, if a URL is present
   * then it does validation, determines if the type picker should be shown,
   * and emits the urlValidatedItem.
   */
  async validateUrl() {
    // Get the input element value.
    const url = this.inputEl.value;
    if (url) {
      // Run validation.
      const validationResult = await validateUrl.validateUrl(url);
      // assign it to state
      this.validatedUrlItem = validationResult;
      // create merged item
      const extent$1 = validationResult.item.extent || this.defaultExtent;
      const mergedUrlItem = Object.assign({ owner: this.owner, extent: extent.extentToBBox(extent$1), spatialReference: extent$1.spatialReference, source: this.portalName, publishedDate: this.intl.formatDate(new Date(), dateFormatOptions), access: 'private' }, validationResult.item);
      // If the extent is in the wrong format from validateUrl then fix it.
      if (typeof mergedUrlItem.extent === 'object') {
        const mergedExtentObj = mergedUrlItem.extent;
        mergedUrlItem.extent = extent.extentToBBox(mergedExtentObj);
      }
      // update state
      this.mergedUrlItem = mergedUrlItem;
      // If there is no type then show type picker && set
      // default type to Web Link.
      if (!validationResult.type) {
        // Show type picker.
        this.showTypePicker = true;
        // set default type to Document Link
        this.validatedUrlItem.type = 'Document Link';
        this.mergedUrlItem.type = 'Document Link';
        // Make sure we know what type is selected.
        this.selectedTypeText = this.intl.t('doclink');
      }
      // Emit out event.
      this.arcgisHubUrlValidated.emit(this.mergedUrlItem);
    }
    else {
      // if there's no url then reset validatedUrlItem to return the UI
      // to default state. Needed if swapping between urls.
      this.validatedUrlItem = undefined;
    }
  }
  handleOnInput() {
    this.validateDebounced();
  }
  handleOnKeyDown(e) {
    if (e.key === "Enter") {
      this.validateDebounced();
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  setInputEl(el) {
    this.inputEl = el;
  }
  renderSubText() {
    const { intl, showTypePicker, validatedUrlItem } = this;
    // Set initial default state
    let dom = (index.h("span", null, intl.t('subText')));
    // Check if validation has been done && if there was an error.
    if (validatedUrlItem && validatedUrlItem.error) {
      dom = (index.h("span", null, index.h("calcite-icon", { class: "error", icon: "x-octagon", scale: "s" }), intl.t(validatedUrlItem.error)));
      // Otherwise if things passed and we need to show the type picker
    }
    else if (validatedUrlItem && validatedUrlItem.pass && showTypePicker) {
      dom = (index.h("span", null, index.h("calcite-icon", { class: validatedUrlItem.type ? "success" : "error", icon: validatedUrlItem.type ? "check-circle" : "x-octagon", scale: "s" }), validatedUrlItem.type && this.intl.t('recognizedType'), index.h("calcite-dropdown", { placement: "top", ref: this.setDropdownEl }, index.h("calcite-button", { appearance: "transparent", "icon-end": "caret-down", slot: "trigger" }, this.selectedTypeText || this.intl.t('fileTypeSelector')), index.h("calcite-dropdown-group", { "selection-mode": "single" }, this.types.map(type => index.h("calcite-dropdown-item", { "data-value": type.type, key: type.type, selected: type.active, title: this.intl.t(type.intl) }, this.intl.t(type.intl)))))));
      // Otherwise if it passed and we don't need to display type.
    }
    else if (validatedUrlItem && validatedUrlItem.pass) {
      const type = validatedUrlItem.type.toLowerCase().split(' ').join('');
      dom = (index.h("span", null, index.h("calcite-icon", { class: "success", icon: "check-circle", scale: "s" }), this.intl.t(type)));
    }
    return dom;
  }
  render() {
    return (index.h(index.Host, null, index.h("header", null, this.intl.t('heading')), index.h("calcite-input", { onInput: this.handleOnInput, onKeyDown: this.handleOnKeyDown, ref: this.setInputEl }), this.renderSubText()));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
};
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 300 })
], ArcgisHubUrlContentForm.prototype, "validateDebounced", null);
ArcgisHubUrlContentForm.style = arcgisHubUrlContentFormCss;

exports.arcgis_hub_file_metadata_editor = ArcgisHubFileMetadataEditor;
exports.arcgis_hub_file_select = ArcgisHubFileSelect;
exports.arcgis_hub_groups_sharing = ArcgisHubGroupsSharing;
exports.arcgis_hub_url_content_form = ArcgisHubUrlContentForm;
