export declare class DevShareEntities {
  groups: string;
  ids: string;
  private get _context();
  results: any;
  loading: boolean;
  private hubGroups;
  private hubEntities;
  constructor();
  componentWillLoad(): Promise<void>;
  unshare(): Promise<void>;
  share(): Promise<void>;
  render(): any;
}
