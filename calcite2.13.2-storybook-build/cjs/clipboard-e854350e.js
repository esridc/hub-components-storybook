'use strict';

const copyStringToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  }
  catch (err) {
    console.error('Unable to copy to clipboard');
  }
};

exports.copyStringToClipboard = copyStringToClipboard;
