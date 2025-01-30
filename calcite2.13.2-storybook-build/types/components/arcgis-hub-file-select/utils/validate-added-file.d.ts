import { FileExtension, IFileType, IAllowedFileTypes } from "@esri/hub-common";
/**
 * Takes a file name and compares it against a list of extensions from online to extract the
 * extension itself.
 * @param name File name
 * @returns Object containing filename without extension, the full file name, and the extension
 */
export declare function sanitizeFileName(name: string): {
  title: string;
  fileName: string;
  extension: FileExtension;
};
/**
 * Compare files extension to the master list of possibilities. Returns an array of possible item types
 *
 * @export
 * @param {FileExtension} extension Files extension
 * @param {AllowedFileTypes} allowedFileTypes File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {FileType[]}
 */
export declare function findPossibleItemTypesByExtension(extension: FileExtension, allowedFileTypes?: IAllowedFileTypes): IFileType[];
/**
 * Validate passed in file/files bbased on number of files, size of the file, and file extension
 *
 * @export
 * @param {FileList} files File/files passed in
 * @param {number} maxFileSize Maximum size of file
 * @param {AllowedFileTypes} [allowedFileTypes] File types passed in by parent to restrict 'allowed' exts.
 * @return {*}  {{ success: boolean; errorMessage?: string }}
 */
export declare function validateAddedFile(files: FileList, maxFileSize: number, allowedFileTypes?: IAllowedFileTypes): {
  success: boolean;
  errorMessage?: string;
};
