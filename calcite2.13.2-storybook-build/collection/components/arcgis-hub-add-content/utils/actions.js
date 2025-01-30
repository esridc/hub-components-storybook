export const Actions = {
  isInitialize: (action) => action.tag === 'Initialize',
  isGallerySelectionChanged: (action) => action.tag === 'GallerySelectionChanged',
  isGalleryStateChanged: (action) => action.tag === 'GalleryStateChanged',
  isEntityEditorChanged: (action) => action.tag === 'EntityEditorChanged',
  isNextStep: (action) => action.tag === 'NextStep',
  isPreviousStep: (action) => action.tag === 'PreviousStep',
  isStepChanged: (action) => action.tag === 'StepChanged',
  isSuccess: (action) => action.tag === 'Success',
  isFailure: (action) => action.tag === 'Failure',
  isRetry: (action) => action.tag === 'Retry',
};
