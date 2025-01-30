import { Host, h } from '@stencil/core';
import ckeditor from '@esri/hub-ckeditor5-custom-build';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { unique, hubSearch } from '@esri/hub-common';
import './translations';
import { getGlobalContext } from '../../utils/state';
var ToolbarItem;
(function (ToolbarItem) {
  ToolbarItem["heading"] = "heading";
  ToolbarItem["|"] = "|";
  ToolbarItem["bold"] = "bold";
  ToolbarItem["italic"] = "italic";
  ToolbarItem["blockQuote"] = "blockQuote";
  ToolbarItem["removeFormat"] = "removeFormat";
  ToolbarItem["link"] = "link";
  ToolbarItem["bulletedList"] = "bulletedList";
  ToolbarItem["numberedList"] = "numberedList";
  ToolbarItem["alignment"] = "alignment";
  ToolbarItem["outdent"] = "outdent";
  ToolbarItem["indent"] = "indent";
  ToolbarItem["undo"] = "undo";
  ToolbarItem["redo"] = "redo";
})(ToolbarItem || (ToolbarItem = {}));
const ToolbarPluginMappings = {
  [ToolbarItem.heading]: [ckeditor.PLUGINS.Heading],
  [ToolbarItem.bold]: [ckeditor.PLUGINS.Bold],
  [ToolbarItem.italic]: [ckeditor.PLUGINS.Italic],
  [ToolbarItem.blockQuote]: [ckeditor.PLUGINS.BlockQuote],
  [ToolbarItem.removeFormat]: [ckeditor.PLUGINS.RemoveFormat],
  [ToolbarItem.link]: [ckeditor.PLUGINS.Link],
  [ToolbarItem.bulletedList]: [ckeditor.PLUGINS.List],
  [ToolbarItem.numberedList]: [ckeditor.PLUGINS.List],
  [ToolbarItem.alignment]: [ckeditor.PLUGINS.Alignment],
  [ToolbarItem.outdent]: [ckeditor.PLUGINS.Indent],
  [ToolbarItem.indent]: [ckeditor.PLUGINS.Indent, ckeditor.PLUGINS.IndentBlock],
  [ToolbarItem.undo]: [ckeditor.PLUGINS.Essentials],
  [ToolbarItem.redo]: [ckeditor.PLUGINS.Essentials],
};
// applies a custom CSS class to the editor's wrapper element
// adapted from https://github.com/ckeditor/ckeditor5/issues/9539#issuecomment-833491911
function WrapperClassPlugin(editor) {
  editor.ui.on('ready', () => {
    const className = editor.config.get('wrapperClass');
    const wrapper = document.querySelector('.ck-body-wrapper');
    if (wrapper) {
      wrapper.classList.add(className);
    }
  });
}
export class ArcgisHubRichText {
  /**
   * Constructor
   */
  constructor() {
    this.disabled = undefined;
    this.label = undefined;
    this.mention = undefined;
    this.getMentionQuery = undefined;
    this.mentionCount = 10;
    this.name = undefined;
    this.placeholder = '';
    this.readonly = undefined;
    this.scale = 'm';
    this.status = 'idle';
    this.textTransform = undefined;
    this.pasteFromOffice = undefined;
    this.toolbar = 'heading,|,bold,italic,blockQuote,removeFormat,link,|,bulletedList,numberedList,alignment,outdent,indent,|,undo,redo';
    this.value = '';
    this.wrapperClass = undefined;
    this.rows = undefined;
    bind(this, 'handleDataChange', '_searchUsers', '_renderUser', '_getMentionQuery');
  }
  /**
   * Updates the editors disabled state
   * @param disabled A boolean representing if the editor should be disabled
   */
  updateDisabled(disabled) {
    this.toggleReadOnly(disabled, `${this.element.nodeName}-DISABLED`);
  }
  /**
   * Updates the editors readonly state
   * @param readonly A boolean representing if the editor should be read only
   */
  updateReadOnly(readonly) {
    this.toggleReadOnly(readonly, `${this.element.nodeName}-READ-ONLY`);
  }
  /**
   * Updates the editors value
   * @param value A string representing the editor value
   */
  async updateValue(value) {
    const { skipDataUpdate, editor } = this;
    if (editor && !skipDataUpdate) {
      editor.setData(value);
    }
    this.skipDataUpdate = false;
  }
  /**
   * Connected callback lifecycle method
   */
  async connectedCallback() {
    await this.createEditor();
  }
  /**
   * Disconnected callback lifecycle method
   */
  async disconnectedCallback() {
    await this.destroyEditor();
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Component did load lifecycle method
   */
  async componentDidLoad() {
    await this.createEditor();
  }
  /**
   * Sets focus on the editor
   */
  async setFocus() {
    const { editor } = this;
    if (editor) {
      editor.focus();
    }
  }
  /**
   * Handles the change:data event emitted by the editor,
   * mutates the `value` prop to keep it in sync with the
   * editor and emits a arcgisHubRichTextChange event
   */
  async handleDataChange() {
    const { editor, arcgisHubRichTextChange } = this;
    if (editor) {
      const data = await editor.getData();
      this.skipDataUpdate = true;
      this.value = data;
      arcgisHubRichTextChange.emit();
    }
  }
  /**
   * Creates the editor instance
   */
  _createEditor() {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, textareaEl } = this;
        const editor = await ckeditor.ClassicEditor.create(textareaEl, config);
        resolve(editor);
      }
      catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Overrides a11y label, creates editor instance, assigns
   * events, and updates readonly and disabled state
   */
  async createEditor() {
    const { textareaEl } = this;
    if (textareaEl) {
      try {
        const { handleDataChange, disabled, readonly, label } = this;
        this.updateAriaLabel(label);
        this.editor = await this._createEditor();
        this.editor.model.document.on('change:data', handleDataChange);
        this.updateDisabled(disabled);
        this.updateReadOnly(readonly);
        this.setHeight();
      }
      catch (error) {
        console.error('Failed to load CKEditor5:', error);
      }
    }
  }
  /**
   * Sets the initial height of the rich text editor
   */
  setHeight() {
    this.element.style.setProperty('--arcgis-hub-rich-text-height', `${(this.rows || 2) * 40}px`);
  }
  /**
   * Garbage collects event listeners and editor reference
   */
  async destroyEditor() {
    const { editor, handleDataChange } = this;
    if (editor) {
      try {
        editor.model.document.off('change:data', handleDataChange);
        await editor.destroy();
        this.editor = null;
      }
      catch (error) {
        console.warn('Failed to destroy CKEditor5:', error.message);
      }
    }
  }
  /**
   * Derives the CKEditor5 language from intl.locale.
   */
  get language() {
    const dialects = ['pt-br', 'zh-cn'];
    const locale = this.intl.locale.toLowerCase();
    return dialects.includes(locale) ? locale : locale.split('-')[0];
  }
  /**
   * Getter for the global ArcGISContext
   */
  get _context() {
    return getGlobalContext();
  }
  /**
   * Updates translations used for the aria-label text. This needs to be invoked before
   * the CKEditor5 instance is created. The editor only reads this string from the
   * global CKEDITOR_TRANSLATIONS object once and does not appear to expose that
   * reference or provide an API so it can be updated asynchronously.
   *
   * @param label A string to be used as the aria-label text
   */
  updateAriaLabel(label) {
    const { CKEDITOR_TRANSLATIONS } = window;
    const { intl, language } = this;
    if (label) {
      if (CKEDITOR_TRANSLATIONS === null || CKEDITOR_TRANSLATIONS === void 0 ? void 0 : CKEDITOR_TRANSLATIONS[language]) {
        const labelWithLandmarkPlaceholder = intl.direction === 'ltr' ? `${label}: %0` : `%0 :${label}`;
        CKEDITOR_TRANSLATIONS[language].dictionary = Object.assign(Object.assign({}, CKEDITOR_TRANSLATIONS[language].dictionary), { 'Rich Text Editor': label, 'Editor editing area: %0': labelWithLandmarkPlaceholder });
      }
    }
  }
  /**
   * Builds an IQuery to search for all users whose username or fullName match the given input
   * that are not the current user
   * @param input The search string, matches against user's username and fullName.
   * @returns
   */
  _getMentionQuery(input) {
    return {
      targetEntity: 'communityUser',
      filters: [
        {
          predicates: [{ username: input }, { fullname: input }, { username: { not: this._context.currentUser.username } }],
        },
      ],
    };
  }
  /**
   * Performs the mention user search. By default will search all users whose username or fullName
   * contain the given `input`
   * @param input The text to search by
   * @returns a promise that resolves an IUserMention[]
   */
  async _searchUsers(input) {
    const { _context, getMentionQuery, _getMentionQuery, mentionCount, mention } = this;
    const toUserMention = (user) => ({
      id: `@${user.id}`,
      name: user.id,
      username: user.id,
      fullName: user.name,
      thumbnail: user.thumbnail,
    });
    if (!mention) {
      return [];
    }
    let users = [];
    try {
      const query = (getMentionQuery !== null && getMentionQuery !== void 0 ? getMentionQuery : _getMentionQuery)(input);
      ({ results: users } = await hubSearch(query, {
        num: mentionCount,
        start: 1,
        sortField: 'fullName',
        sortOrder: 'desc',
        requestOptions: _context.hubRequestOptions,
      }));
    }
    catch (e) {
      console.warn('Failed to fetch mentions');
      users = [];
    }
    return users.map(toUserMention);
  }
  _renderUser(mention) {
    const div = document.createElement('div');
    div.className = 'mention-result';
    const avatar = document.createElement('calcite-avatar');
    avatar.scale = 'l';
    avatar.username = mention.username;
    avatar.thumbnail = mention.thumbnail;
    avatar.fullName = mention.fullName;
    div.appendChild(avatar);
    const fullName = document.createElement('div');
    fullName.textContent = mention.fullName;
    fullName.className = 'full-name';
    div.appendChild(fullName);
    const username = document.createElement('div');
    username.textContent = mention.username;
    username.className = 'username';
    div.appendChild(username);
    return div;
  }
  /**
   * Derived mention config
   */
  get mentionConfig() {
    var _a;
    let config;
    if (this.mention && ((_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser)) {
      config = {
        dropdownLimit: this.mentionCount,
        feeds: [
          {
            marker: '@',
            feed: this._searchUsers,
            minimumCharacters: 1,
            itemRenderer: this._renderUser,
          },
        ],
      };
    }
    return config;
  }
  /**
   * Derived CK5Editor config
   */
  get config() {
    const { value: initialData, toolbarConfig: toolbar, plugins, placeholder, language, mentionConfig: mention, wrapperClass } = this;
    return {
      licenseKey: window.arcGISCKEditorLicense,
      plugins,
      placeholder,
      toolbar,
      initialData,
      language,
      mention,
      wrapperClass,
    };
  }
  /**
   * Derived toolbar configuration
   */
  get toolbarConfig() {
    const { toolbar } = this;
    const toolbarItems = toolbar.split(',').filter(item => Boolean(ToolbarItem[item]));
    return { items: toolbarItems };
  }
  /**
   * Derived plugin configuration
   */
  get plugins() {
    const { toolbarConfig, pasteFromOffice, textTransform, mention, wrapperClass } = this;
    const toolbarItemsToPlugins = (acc, toolbarItem) => (ToolbarPluginMappings[toolbarItem] ? [...acc, ...ToolbarPluginMappings[toolbarItem]] : acc);
    const plugins = [ckeditor.PLUGINS.Essentials, ckeditor.PLUGINS.Paragraph];
    if (textTransform) {
      plugins.push(ckeditor.PLUGINS.TextTransformation);
    }
    if (pasteFromOffice) {
      plugins.push(ckeditor.PLUGINS.PasteFromOffice);
    }
    if (mention) {
      plugins.push(ckeditor.PLUGINS.Mention, MentionCustomization);
    }
    if (wrapperClass) {
      plugins.push(WrapperClassPlugin);
    }
    return toolbarConfig.items.reduce(toolbarItemsToPlugins, plugins).filter(unique);
  }
  /**
   * Toggles the read only state of the editor
   * @param readonly A boolean representing if the component should be in read only state
   * @param lockId A string representing a specific lock ID
   */
  toggleReadOnly(readonly, lockId) {
    const { editor } = this;
    if (editor) {
      readonly ? editor.enableReadOnlyMode(lockId) : editor.disableReadOnlyMode(lockId);
    }
  }
  /**
   * Primary render method
   */
  render() {
    const { name, config } = this;
    return (h(Host, { class: { toolbar: config.toolbar.items.length } }, h("textarea", { name: name, ref: (textareaEl) => {
        this.textareaEl = textareaEl;
      } })));
  }
  static get is() { return "arcgis-hub-rich-text"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-rich-text.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-rich-text.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Disables the editor"
        },
        "attribute": "disabled",
        "reflect": true
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A text to be used for aria-label of the editor"
        },
        "attribute": "label",
        "reflect": false
      },
      "mention": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enables at-mention capabilities when true"
        },
        "attribute": "mention",
        "reflect": false
      },
      "getMentionQuery": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(input: string) => IQuery",
          "resolved": "(input: string) => IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A function that returns an IQuery to override default mention search behavior"
        }
      },
      "mentionCount": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The maximum number"
        },
        "attribute": "mention-count",
        "reflect": false,
        "defaultValue": "10"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A name attribute value for the underlying textarea"
        },
        "attribute": "name",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A placeholder string"
        },
        "attribute": "placeholder",
        "reflect": true,
        "defaultValue": "''"
      },
      "readonly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Makes the editor read only"
        },
        "attribute": "readonly",
        "reflect": true
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Calcite Scale"
        },
        "attribute": "scale",
        "reflect": true,
        "defaultValue": "'m'"
      },
      "status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Status",
          "resolved": "\"idle\" | \"invalid\" | \"valid\"",
          "references": {
            "Status": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Calcite Status"
        },
        "attribute": "status",
        "reflect": true,
        "defaultValue": "'idle'"
      },
      "textTransform": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enables automatic text transformation, e.g.\n\"(tm)\" => \"\u2122\", \"...\" => \"\u2026\", etc"
        },
        "attribute": "text-transform",
        "reflect": false
      },
      "pasteFromOffice": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enables automatic transformation of content pasted from\nms office products to valid html"
        },
        "attribute": "paste-from-office",
        "reflect": false
      },
      "toolbar": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A string representing the toolbar configuration"
        },
        "attribute": "toolbar",
        "reflect": false,
        "defaultValue": "'heading,|,bold,italic,blockQuote,removeFormat,link,|,bulletedList,numberedList,alignment,outdent,indent,|,undo,redo'"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value attribute of the editor"
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
      },
      "wrapperClass": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "a custom CSS class to be applied to the editor's wrapper element"
        },
        "attribute": "wrapper-class",
        "reflect": false
      },
      "rows": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The number of rows to display in the rich text editor"
        },
        "attribute": "rows",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubRichTextChange",
        "name": "arcgisHubRichTextChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the editors content changes"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets focus on the editor",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "disabled",
        "methodName": "updateDisabled"
      }, {
        "propName": "readonly",
        "methodName": "updateReadOnly"
      }, {
        "propName": "value",
        "methodName": "updateValue"
      }];
  }
}
function MentionCustomization(editor) {
  editor.conversion.for('upcast').elementToAttribute({
    view: {
      name: 'calcite-link',
      key: 'data-mention',
    },
    model: {
      key: 'mention',
      value: viewItem => {
        const mentionAttribute = editor.plugins.get('Mention').toMentionAttribute(viewItem);
        return mentionAttribute;
      },
    },
    converterPriority: 'high',
  });
  editor.conversion.for('downcast').attributeToElement({
    model: 'mention',
    view: (modelAttributeValue, { writer }) => {
      if (!modelAttributeValue) {
        return;
      }
      return writer.createAttributeElement('calcite-link', {
        'data-mention': modelAttributeValue.name || modelAttributeValue.id,
      }, {
        priority: 20,
        id: modelAttributeValue.uid,
      });
    },
    converterPriority: 'high',
  });
}
