/* Manages a single ResizeObserver to be used by all components
 * usage: ResizeObserverManager.addHandler(this.element, handler);
 *        ResizeObserverManager.removeHandler(this.element, handler); or ResizeObserverManager.unobserve(this.element);
 */
class ResizeObserverManager {
  // protected to allow wrapper class in test file that extends this class
  constructor() {
    this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
    this.handlers = new WeakMap();
  }
  /**
   * Static method to create an instance of ResizeObserverManager
   */
  static create() {
    if (!ResizeObserverManager.instance) {
      ResizeObserverManager.instance = new ResizeObserverManager();
    }
    return ResizeObserverManager.instance;
  }
  /**
   * Static method to add a resize handler for a particular element
   */
  static addHandler(element, fn) {
    this.create();
    this.instance.addHandler(element, fn);
  }
  /**
   * Static method to remove a particular resize handler for a particular element
   */
  static removeHandler(element, fn) {
    if (this.instance) {
      this.instance.removeHandler(element, fn);
    }
  }
  /**
   * Static method to remove all resize handlers for a particular element
   */
  static unobserve(element) {
    if (this.instance) {
      this.instance.unobserve(element);
    }
  }
  /**
   * Instance method to add a resize handler for a particular element
   */
  addHandler(element, fn) {
    if (!this.handlers.has(element)) {
      // if we are not already observing the element, initialize the handlers array and observe the element
      this.handlers.set(element, []);
      this.resizeObserver.observe(element);
    }
    // push the fn into the handlers array if it is not already there
    const handlers = this.handlers.get(element);
    if (!handlers.includes(fn)) {
      handlers.push(fn);
    }
  }
  /**
   * Instance method to remove a particular resize handler for a particular element
   */
  removeHandler(element, fn) {
    // conditionally destroy a handler if one exists for the given element and fn
    if (this.handlers.has(element)) {
      // if we are observing the element
      const handlers = this.handlers.get(element);
      const idx = handlers.indexOf(fn);
      // filter out the fn
      const newHandlers = handlers.filter((_, _idx) => _idx !== idx);
      if (newHandlers.length) {
        // if it is not the last handler for the element, set the filtered handlers as the new handlers array for the element
        this.handlers.set(element, newHandlers);
      }
      else {
        // if it is the last handler for the element, remove the handlers array and unobserve the element
        this.handlers.delete(element);
        this.resizeObserver.unobserve(element);
      }
    }
  }
  /**
   * Instance method to remove all resize handlers for a particular element
   */
  unobserve(element) {
    if (this.handlers.has(element)) {
      // if we were observing the element, delete its handlers array and unobserve the element
      this.handlers.delete(element);
      this.resizeObserver.unobserve(element);
    }
  }
  onResize(entries) {
    // we wrap the callback in requestanimationframe to prevent an (benign) error related to the observer not being able to deliveer all observations within a single animation frame
    requestAnimationFrame(_ => {
      entries.forEach(e => {
        var _a;
        const handlers = (_a = this.handlers.get(e.target)) !== null && _a !== void 0 ? _a : [];
        handlers.forEach(handler => handler());
      });
    });
  }
}

export { ResizeObserverManager as R };
