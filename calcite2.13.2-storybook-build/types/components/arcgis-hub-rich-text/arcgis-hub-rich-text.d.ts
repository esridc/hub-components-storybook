import { EventEmitter } from '../../stencil-public-runtime';
import { Scale, Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IQuery, IArcGISContext } from '@esri/hub-common';
import './translations';
export interface IUserMention {
  id: string;
  name: string;
  username: string;
  fullName: string;
  thumbnail?: string;
}
declare enum ToolbarItem {
  heading = "heading",
  '|' = "|",
  bold = "bold",
  italic = "italic",
  blockQuote = "blockQuote",
  removeFormat = "removeFormat",
  link = "link",
  bulletedList = "bulletedList",
  numberedList = "numberedList",
  alignment = "alignment",
  outdent = "outdent",
  indent = "indent",
  undo = "undo",
  redo = "redo"
}
interface IToolbarConfig {
  items: ToolbarItem[];
}
export declare class ArcgisHubRichText {
  /**
   * Used to prevent unnecessarily updating the editor data when
   * the editor triggers a mutaton to the value property
   */
  skipDataUpdate: boolean;
  /**
   * A reference to the ClassicEditor instance
   */
  editor: ClassicEditor;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * A reference to the textarea element
   */
  textareaEl: HTMLTextAreaElement;
  /**
   * Host element reference
   */
  element: HTMLArcgisHubRichTextElement;
  /**
   * Disables the editor
   */
  disabled: boolean;
  /**
   * Updates the editors disabled state
   * @param disabled A boolean representing if the editor should be disabled
   */
  updateDisabled(disabled: boolean): void;
  /**
   * A text to be used for aria-label of the editor
   */
  label: string;
  /**
   * Enables at-mention capabilities when true
   */
  mention: boolean;
  /**
   * A function that returns an IQuery to override default mention search behavior
   */
  getMentionQuery: (input: string) => IQuery;
  /**
   * The maximum number
   */
  mentionCount: number;
  /**
   * A name attribute value for the underlying textarea
   */
  name: string;
  /**
   * A placeholder string
   */
  placeholder: string;
  /**
   * Makes the editor read only
   */
  readonly: boolean;
  /**
   * Updates the editors readonly state
   * @param readonly A boolean representing if the editor should be read only
   */
  updateReadOnly(readonly: boolean): void;
  /**
   * Calcite Scale
   */
  scale: Scale;
  /**
   * Calcite Status
   */
  status: Status;
  /**
   * Enables automatic text transformation, e.g.
   * "(tm)" => "™", "..." => "…", etc
   */
  textTransform: boolean;
  /**
   * Enables automatic transformation of content pasted from
   * ms office products to valid html
   */
  pasteFromOffice: boolean;
  /**
   * A string representing the toolbar configuration
   */
  toolbar: string;
  /**
   * Value attribute of the editor
   */
  value: string;
  /**
   * a custom CSS class to be applied to the editor's wrapper element
   */
  wrapperClass: string;
  /**
   * The number of rows to display in the rich text editor
   */
  rows: number;
  /**
   * Updates the editors value
   * @param value A string representing the editor value
   */
  updateValue(value: string): Promise<void>;
  /**
   * Emitted when the editors content changes
   */
  arcgisHubRichTextChange: EventEmitter<void>;
  /**
   * Constructor
   */
  constructor();
  /**
   * Connected callback lifecycle method
   */
  connectedCallback(): Promise<void>;
  /**
   * Disconnected callback lifecycle method
   */
  disconnectedCallback(): Promise<void>;
  /**
   * Component will load lifecycle method
   */
  componentWillLoad(): Promise<void>;
  /**
   * Component did load lifecycle method
   */
  componentDidLoad(): Promise<void>;
  /**
   * Sets focus on the editor
   */
  setFocus(): Promise<void>;
  /**
   * Handles the change:data event emitted by the editor,
   * mutates the `value` prop to keep it in sync with the
   * editor and emits a arcgisHubRichTextChange event
   */
  handleDataChange(): Promise<void>;
  /**
   * Creates the editor instance
   */
  _createEditor(): Promise<ClassicEditor>;
  /**
   * Overrides a11y label, creates editor instance, assigns
   * events, and updates readonly and disabled state
   */
  createEditor(): Promise<void>;
  /**
   * Sets the initial height of the rich text editor
   */
  setHeight(): void;
  /**
   * Garbage collects event listeners and editor reference
   */
  destroyEditor(): Promise<void>;
  /**
   * Derives the CKEditor5 language from intl.locale.
   */
  get language(): string;
  /**
   * Getter for the global ArcGISContext
   */
  get _context(): IArcGISContext;
  /**
   * Updates translations used for the aria-label text. This needs to be invoked before
   * the CKEditor5 instance is created. The editor only reads this string from the
   * global CKEDITOR_TRANSLATIONS object once and does not appear to expose that
   * reference or provide an API so it can be updated asynchronously.
   *
   * @param label A string to be used as the aria-label text
   */
  updateAriaLabel(label: string): void;
  /**
   * Builds an IQuery to search for all users whose username or fullName match the given input
   * that are not the current user
   * @param input The search string, matches against user's username and fullName.
   * @returns
   */
  _getMentionQuery(input: string): IQuery;
  /**
   * Performs the mention user search. By default will search all users whose username or fullName
   * contain the given `input`
   * @param input The text to search by
   * @returns a promise that resolves an IUserMention[]
   */
  _searchUsers(input: string): Promise<IUserMention[]>;
  _renderUser(mention: IUserMention): HTMLElement;
  /**
   * Derived mention config
   */
  get mentionConfig(): any;
  /**
   * Derived CK5Editor config
   */
  get config(): any;
  /**
   * Derived toolbar configuration
   */
  get toolbarConfig(): IToolbarConfig;
  /**
   * Derived plugin configuration
   */
  get plugins(): any[];
  /**
   * Toggles the read only state of the editor
   * @param readonly A boolean representing if the component should be in read only state
   * @param lockId A string representing a specific lock ID
   */
  toggleReadOnly(readonly: boolean, lockId: string): void;
  /**
   * Primary render method
   */
  render(): any;
}
export {};
