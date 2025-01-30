'use strict';

const index = require('./index-7c083111.js');

// export a functional component - this allows us to do <Sharing context={this}>...inner<Sharing>
const Shareable = ({ context, showShareUi }, children) => {
  return index.h("arcgis-shareable-card", { referenceElement: context.element, shareable: context.shareable, shareableByReference: context.shareableByReference, shareableByValue: context.shareableByValue, shareableOnHover: context.shareableOnHover, showShareUi: showShareUi }, children);
};

exports.Shareable = Shareable;
