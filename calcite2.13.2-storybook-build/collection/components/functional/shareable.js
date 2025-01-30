import { h } from '@stencil/core';
// export a functional component - this allows us to do <Sharing context={this}>...inner<Sharing>
export const Shareable = ({ context, showShareUi }, children) => {
  return h("arcgis-shareable-card", { referenceElement: context.element, shareable: context.shareable, shareableByReference: context.shareableByReference, shareableByValue: context.shareableByValue, shareableOnHover: context.shareableOnHover, showShareUi: showShareUi }, children);
};
