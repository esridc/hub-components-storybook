export interface FileChangePayload {
  dataURL: string;
  fileName: string;
}
export interface ImagePosition {
  top: number;
  left: number;
}
export interface DrawDimensions {
  left: number;
  top: number;
  width: number;
  height: number;
}
export interface DrawParameters {
  selectionX: number;
  selectionY: number;
  selectionWidth: number;
  selectionHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  minWidth: number;
  minHeight: number;
  drawDimensions: DrawDimensions;
}
export interface ImageUploadSavePayload {
  blob: Blob;
  base64: string;
  format: string;
  fileName: string;
}
