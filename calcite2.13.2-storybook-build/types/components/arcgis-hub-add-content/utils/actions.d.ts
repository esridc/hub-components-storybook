import { IHubGroupSharingResults } from "../../../utils/add-content/utils";
declare type TaggedAction<T extends string> = {
  tag: T;
};
export declare type Initialize = TaggedAction<'Initialize'>;
export declare type GallerySelectionChanged = TaggedAction<'GallerySelectionChanged'> & {
  selected: Record<string, any>;
};
export declare type GalleryStateChanged = TaggedAction<'GalleryStateChanged'> & {
  galleryState: Record<string, any>;
};
export declare type EntityEditorChanged = TaggedAction<'EntityEditorChanged'> & {
  configurationValues: Record<string, any>;
};
export declare type NextStep = TaggedAction<'NextStep'>;
export declare type PreviousStep = TaggedAction<'PreviousStep'>;
export declare type StepChanged = TaggedAction<'StepChanged'> & {
  stepIndex: number;
};
export declare type Success = TaggedAction<'Success'> & {
  results: IHubGroupSharingResults;
};
export declare type Failure = TaggedAction<'Failure'> & {
  error: Record<string, any>;
};
export declare type Retry = TaggedAction<'Retry'>;
export declare type Action = Initialize | GallerySelectionChanged | GalleryStateChanged | EntityEditorChanged | NextStep | PreviousStep | StepChanged | Success | Failure | Retry;
export declare const Actions: {
  isInitialize: (action: Action) => action is Initialize;
  isGallerySelectionChanged: (action: Action) => action is GallerySelectionChanged;
  isGalleryStateChanged: (action: Action) => action is GalleryStateChanged;
  isEntityEditorChanged: (action: Action) => action is EntityEditorChanged;
  isNextStep: (action: Action) => action is NextStep;
  isPreviousStep: (action: Action) => action is PreviousStep;
  isStepChanged: (action: Action) => action is StepChanged;
  isSuccess: (action: Action) => action is Success;
  isFailure: (action: Action) => action is Failure;
  isRetry: (action: Action) => action is Retry;
};
export {};
