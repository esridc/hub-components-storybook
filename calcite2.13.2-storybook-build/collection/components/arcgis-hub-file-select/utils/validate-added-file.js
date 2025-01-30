import { addCreateItemTypes } from "@esri/hub-common";
/**
 * Takes a file name and compares it against a list of extensions from online to extract the
 * extension itself.
 * @param name File name
 * @returns Object containing filename without extension, the full file name, and the extension
 */
export function sanitizeFileName(name) {
  // Regex to extract extension.
  const expression = /(?:\.([^.]+))?$/;
  // if there is another period or dash regex
  const invalidTitleCharacters = /\.|-/g;
  // Cleans up the filename.
  const fileName = name.replace(/^.*(\\|\/|:)/, "");
  // Get the extension
  let extension = (fileName && expression.exec(fileName)[1] ? expression.exec(fileName)[1].toLowerCase() : "");
  // Default title
  let title = "";
  // Handles RFT file extension
  if (fileName.indexOf(".rft.") > -1) {
    const [name, suffix] = fileName.split(".rft.");
    extension = `rft.${suffix}`;
    title = name;
  }
  // Files name without extension
  if (fileName && !title) {
    title = fileName.lastIndexOf(".") === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf("."));
  }
  // Replace any invalid characters with an underscore
  title = title.replace(invalidTitleCharacters, "_");
  // Return object
  return { title, fileName, extension };
}
/**
 * Compare files extension to the master list of possibilities. Returns an array of possible item types
 *
 * @export
 * @param {FileExtension} extension Files extension
 * @param {AllowedFileTypes} allowedFileTypes File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {FileType[]}
 */
export function findPossibleItemTypesByExtension(extension, allowedFileTypes) {
  // Get the list of item types from the list of options.
  const itemTypes = Object.keys(addCreateItemTypes);
  // empty array to add to.
  const possibleItemTypes = [];
  // Iterate item types
  itemTypes.forEach((type) => {
    var _a, _b, _c;
    // If the type has a file extension and the files extension is present.
    if (((_a = addCreateItemTypes[type].fileExt) === null || _a === void 0 ? void 0 : _a.indexOf(extension)) >= 0) {
      // If the validate function was passed a smaller list of item types that can be used
      // We want to compare against that as well, though the master list is the first gate keeper.
      // If those file types were passed down...
      if (allowedFileTypes) {
        if (
        // If that smaller subset includes the extension
        ((_b = allowedFileTypes.extensions) === null || _b === void 0 ? void 0 : _b.indexOf(extension)) >= 0
          // Of if it matches the types name (for example type === 'Image' actually matches jpg, jpeg, png, tif, and tiff)
          || ((_c = allowedFileTypes.types) === null || _c === void 0 ? void 0 : _c.indexOf(addCreateItemTypes[type].type)) >= 0) {
          // Then add the specific type fo possibleItemTypes.
          possibleItemTypes.push(addCreateItemTypes[type]);
        }
      }
      else {
        // If allowedFileTypes was not passed in then add the type to possibleItemTypes.
        possibleItemTypes.push(addCreateItemTypes[type]);
      }
    }
  });
  return possibleItemTypes;
}
/**
 * Validate passed in file/files bbased on number of files, size of the file, and file extension
 *
 * @export
 * @param {FileList} files File/files passed in
 * @param {number} maxFileSize Maximum size of file
 * @param {AllowedFileTypes} [allowedFileTypes] File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {{ success: boolean; errorMessage?: string }}
 */
export function validateAddedFile(files, maxFileSize, allowedFileTypes) {
  let valid = false;
  let errorMessage;
  // Check if multiple files uploaded,
  if (files.length > 1) {
    errorMessage = 'multipleFilesError';
    // Check if file is too big
  }
  else if (files[0].size > maxFileSize) {
    errorMessage = 'fileTooLargeError';
    // If it passes then update to true
  }
  else {
    // Get possible types.
    const possibleTypes = findPossibleItemTypesByExtension(sanitizeFileName(files[0].name).extension, allowedFileTypes);
    // is it valid?
    const validType = possibleTypes.length > 0; // May be extended to vet orgOnly / public user
    if (!validType) {
      errorMessage = 'unsupportedFileTypeError';
    }
    else {
      valid = true;
    }
  }
  // Check if file extension is supported
  return { success: valid, errorMessage };
}
