import { FunctionalComponent } from "../../../stencil-public-runtime";
import { ISerializedGalleryState } from "../../../utils/types";
declare type TaggedState<T extends string> = {
  component: string | FunctionalComponent;
  componentArgs: Record<string, any>;
  configurationValues: any;
  selectedContentIds: string[];
  selectedGroupIds: string[];
  controls: Record<string, any>;
  helpStateProps?: {
    heading: string;
    icon: string;
    message: string;
  };
  stepIndex: number;
  steps: StepState[];
  tag: T;
  telemetry?: Record<string, any>;
};
export declare type SelectContent = TaggedState<'SelectContent'> & {
  contentGalleryState: ISerializedGalleryState;
  groupsGalleryState: ISerializedGalleryState;
};
export declare type CreateContent = TaggedState<'CreateContent'> & {
  groupsGalleryState: ISerializedGalleryState;
};
export declare type SelectGroups = TaggedState<'SelectGroups'> & {
  contentGalleryState: ISerializedGalleryState;
  groupsGalleryState: ISerializedGalleryState;
};
export declare type Working = TaggedState<'Working'> & {
  action: string;
};
export declare type Confirmation = TaggedState<'Confirmation'>;
export declare type Failure = TaggedState<'Failure'>;
export declare type NotImplemented = TaggedState<'NotImplemented'>;
export declare type State = SelectContent | CreateContent | SelectGroups | Working | Confirmation | Failure | NotImplemented;
export declare type StepState = {
  labelKey: string;
  complete: boolean;
  disabled: boolean;
  error: boolean;
};
export declare type WorkflowControls = {
  back: {
    visible: boolean;
    labelKey: string;
  };
  selection: {
    visible: boolean;
    count: number;
    limit?: number;
  };
  next: {
    visible: boolean;
    disabled: boolean;
    labelKey: string;
  };
  cancel: {
    visible: boolean;
    labelKey: string;
  };
  close: {
    visible: boolean;
    disabled: boolean;
    labelKey: string;
  };
};
export declare const States: {
  isSelectContent: (state: State) => state is SelectContent;
  isCreateContent: (state: State) => state is CreateContent;
  isSelectGroups: (state: State) => state is SelectGroups;
  isWorking: (state: State) => state is Working;
  isConfirmation: (state: State) => state is Confirmation;
  isFailure: (state: State) => state is Failure;
  isNotImplemented: (state: State) => state is NotImplemented;
};
export declare const DEFAULT_SELECT_CONTENT_STATE: Partial<SelectContent>;
export declare const DEFAULT_CREATE_CONTENT_STATE: Partial<CreateContent>;
export declare const DEFAULT_SELECT_GROUPS_STATE: Partial<SelectGroups>;
export declare const DEFAULT_WORKING_STATE: Partial<Working>;
export {};
