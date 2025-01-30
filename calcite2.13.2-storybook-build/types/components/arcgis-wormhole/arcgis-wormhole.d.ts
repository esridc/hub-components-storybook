/**
 * @slot default - Content provided will be transported to the root of the body.
 */
export declare class ElementPortal {
  element: HTMLElement;
  /**
   * The z-index to set on the wormhole element
   *
   * @memberof ElementPortal
   */
  zIndex: string;
  /**
   * Additional CSS style object to set on the wormhole element
   */
  styles: Record<string, string | number>;
  /**
   * The element into which you wish to move the provided
   * child elements. By default we move them to the top
   * of the DOM in the document body
   */
  target: HTMLElement;
  /**
   * Attributes to add to the element
   */
  elAttributes: Record<string, string>;
  /**
   * when false, does not include the wormhole element wrapper
   * and instead appends the children directly to the target element
    */
  includeWormholeElement?: boolean;
  /**
   * The element into which we will move the provided child elements
   *
   * @private
   * @type {HTMLElement}
   * @memberof ElementPortal
   */
  private wormholeElement;
  /**
   * The elements provided in the default slot
   * These will be moved to the wormhole element
   *
   * @private
   * @type {Element[]}
   * @memberof ElementPortal
   */
  private transportedElements;
  componentWillLoad(): void;
  moveChildren(): Promise<void>;
  componentDidLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): any;
}
