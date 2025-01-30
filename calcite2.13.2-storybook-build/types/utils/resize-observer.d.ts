declare type Handler = (...any: any[]) => any;
export declare class ResizeObserverManager {
  static instance: ResizeObserverManager;
  protected constructor();
  private resizeObserver;
  private handlers;
  /**
   * Static method to create an instance of ResizeObserverManager
   */
  static create(): ResizeObserverManager;
  /**
   * Static method to add a resize handler for a particular element
   */
  static addHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Static method to remove a particular resize handler for a particular element
   */
  static removeHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Static method to remove all resize handlers for a particular element
   */
  static unobserve(element: HTMLElement): void;
  /**
   * Instance method to add a resize handler for a particular element
   */
  addHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Instance method to remove a particular resize handler for a particular element
   */
  removeHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Instance method to remove all resize handlers for a particular element
   */
  unobserve(element: HTMLElement): void;
  private onResize;
}
export {};
