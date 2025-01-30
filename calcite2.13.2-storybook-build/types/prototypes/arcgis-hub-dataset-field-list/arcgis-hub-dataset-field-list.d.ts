import { IHubContent } from '@esri/hub-common';
interface IHubFieldDisplay {
  label: string;
  name: string;
  source: string;
  format: string;
}
export declare class ArcgisHubDatasetFieldList {
  entityId: string;
  entity: any;
  sort: string;
  fields: Array<IHubFieldDisplay>;
  useLayers: boolean;
  componentWillLoad(): void;
  entityIdUpdated(newValue: string): void;
  /**
   *
   [{
      atprecis: 38
      attalias: "TBOX_W"
      attrdef: "Tree box width"
      attrdefs: "District of Columbia, Department of Transportation, Urban Forestry Administration"
      attrlabl: "TBOX_W"
      attrtype: "Double"
      attscale: 8
      attwidth: 8
   }]
   * @param dataset
   */
  getMetadataAttributes(dataset: IHubContent): Array<IHubFieldDisplay>;
  /**
   *
   [{
      alias: "OBJECTID"
      domain: null
      name: "OBJECTID"
      type: "esriFieldTypeOID"
      }]
   * @param dataset
   */
  getLayerAttributes(dataset: IHubContent): Array<IHubFieldDisplay>;
  getFields(dataset: IHubContent): Array<IHubFieldDisplay>;
  fetchEntity(newId: string): Promise<void>;
  render(): any;
}
export {};
