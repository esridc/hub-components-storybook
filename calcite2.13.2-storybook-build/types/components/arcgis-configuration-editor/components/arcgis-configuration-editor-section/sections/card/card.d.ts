import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { ICardSectionAction, ISectionParams } from '../../resources';
import { IChangeEventDetail } from '@esri/hub-common';
export declare class Card {
  params: ISectionParams;
  arcgisConfigurationEditorSectionAction: EventEmitter<{
    action: string;
    model: IChangeEventDetail;
  }>;
  _key: string;
  componentWillLoad(): void;
  get scale(): string;
  get actions(): Record<"startActions" | "endActions", ICardSectionAction[]>;
  /**
   * generic handler for section actions - when an action is taken,
   * we emit an event with the action name and editor's current model
   * for the consuming app/component to hook into
   */
  handleSectionActionClick: (evt: CustomEvent<void>) => void;
  renderActions(actions: Array<ICardSectionAction>): HTMLCalciteButtonElement[];
  render(): any;
}
