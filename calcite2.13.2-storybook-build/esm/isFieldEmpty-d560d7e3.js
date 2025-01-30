/**
 * Determines whether an input value is considered "empty"
 * in the configuration editor
 *
 * @param value input value
 * @returns {boolean}
 */
const isFieldEmpty = (value) => {
  var _a;
  let isEmpty = false;
  if (typeof (value) === 'string') {
    isEmpty = value === '';
  }
  else if (Array.isArray(value)) {
    isEmpty = !value.length;
  }
  else if (value == null) {
    isEmpty = true;
    // This is needed explicitly for Blob type
    // otherwise it gets caught in the object check and is considered empty
  }
  else if (typeof Blob !== "undefined" && value instanceof Blob) {
    isEmpty = false;
  }
  else if (typeof (value) === 'object') {
    isEmpty = !((_a = Object.keys(value)) === null || _a === void 0 ? void 0 : _a.length);
  }
  return isEmpty;
};

export { isFieldEmpty as i };
