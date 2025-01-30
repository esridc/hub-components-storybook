import { ISectionParams } from '../../resources';
export declare class Block {
  params: ISectionParams;
  _key: string;
  componentWillLoad(): void;
  get scale(): string;
  get isCollapsible(): boolean;
  get isOpen(): boolean;
  render(): any;
}
