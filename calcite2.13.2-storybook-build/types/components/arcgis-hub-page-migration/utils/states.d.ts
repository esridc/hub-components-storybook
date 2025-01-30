import { FunctionalComponent } from "../../../stencil-public-runtime";
import { ISerializedGalleryState } from "../../../utils/types";
declare type TaggedState<T extends string> = {
  component: string | FunctionalComponent;
  componentArgs: Record<string, any>;
  configurationValues: any;
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
export declare type SpecifyInfo = TaggedState<'SpecifyInfo'> & {
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
export declare type State = SpecifyInfo | SelectGroups | Working | Confirmation | Failure;
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
  isSpecifyInfo: (state: State) => state is SpecifyInfo;
  isSelectGroups: (state: State) => state is SelectGroups;
  isWorking: (state: State) => state is Working;
  isConfirmation: (state: State) => state is Confirmation;
  isFailure: (state: State) => state is Failure;
};
export declare const DEFAULT_SPECIFY_INFO_STATE: Partial<SpecifyInfo>;
export declare const DEFAULT_SELECT_GROUPS_STATE: Partial<SelectGroups>;
export declare const DEFAULT_WORKING_STATE: Partial<Working>;
export {};
