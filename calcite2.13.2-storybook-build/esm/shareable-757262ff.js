import { h } from './index-57f71b44.js';

// export a functional component - this allows us to do <Sharing context={this}>...inner<Sharing>
const Shareable = ({ context, showShareUi }, children) => {
  return h("arcgis-shareable-card", { referenceElement: context.element, shareable: context.shareable, shareableByReference: context.shareableByReference, shareableByValue: context.shareableByValue, shareableOnHover: context.shareableOnHover, showShareUi: showShareUi }, children);
};

export { Shareable as S };
