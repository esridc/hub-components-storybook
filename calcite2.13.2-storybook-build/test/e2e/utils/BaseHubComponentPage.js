class BaseHubComponentPage {
  constructor(page, options = {}) {
    this.page = page;
    if (options.parent) {
      const { root } = options.parent;
      this._prefix = options.shadow
        ? `${root} >>>`
        : root;
    }
  }
  async initialize() {
    // override
  }
  get root() {
    return [this._prefix, this._root]
      .filter(Boolean)
      .join(' ');
  }
}
export default BaseHubComponentPage;
export const newHubComponentPage = async (Constructor, page, options = {}) => {
  const instance = new Constructor(page, options);
  await instance.initialize();
  return instance;
};
