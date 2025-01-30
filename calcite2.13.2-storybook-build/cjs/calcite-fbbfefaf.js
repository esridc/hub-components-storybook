'use strict';

const buttonColorToKind = (color) => {
  switch (color) {
    case 'blue':
      return 'brand';
    case 'red':
      return 'danger';
    default:
      return color;
  }
};

exports.buttonColorToKind = buttonColorToKind;
