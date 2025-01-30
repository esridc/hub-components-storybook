declare type Handler = (...any: any[]) => any;
export declare class IntersectionObserverManager {
  static instance: IntersectionObserverManager;
  protected constructor();
  private intersectionObserver;
  private handlers;
  /**
   * Static method to create an instance of IntersectionObserverManager
   */
  static create(): IntersectionObserverManager;
  /**
   * Static method to add a intersection handler for a particular element
   */
  static addHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Static method to remove a particular intersection handler for a particular element
   */
  static removeHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Static method to remove all intersection handlers for a particular element
   */
  static unobserve(element: HTMLElement): void;
  /**
   * Instance method to add a intersection handler for a particular element
   */
  addHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Instance method to remove a particular intersection handler for a particular element
   */
  removeHandler(element: HTMLElement, fn: Handler): void;
  /**
   * Instance method to remove all intersection handlers for a particular element
   */
  unobserve(element: HTMLElement): void;
  private onEnteredViewport;
}
export {};
