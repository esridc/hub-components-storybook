interface MetadataDisplay {
  label: string;
  element: string;
  format: string;
}
export declare class ArcgisHubMetadataList {
  entityId: string;
  metadata: Array<MetadataDisplay>;
  entity: any;
  /**
   * Is the component still loading data
   */
  isLoading: boolean;
  metadataUpdated(newValue: string): void;
  entityIdUpdated(newValue: string): void;
  lookup(elementDefinition: MetadataDisplay, object: Record<string, any>): any;
  fetchEntity(newId: string): Promise<void>;
  componentWillLoad(): void;
  render(): any;
}
export {};
