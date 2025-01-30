export interface IComponentAction {
  name?: string;
  args?: Record<string, any>;
  children?: IComponentAction[];
  helperText?: string;
  icon?: string;
  loading?: boolean;
  text: string;
  disabled?: boolean;
  tooltip?: {
    text?: string;
    label?: string;
  };
}
