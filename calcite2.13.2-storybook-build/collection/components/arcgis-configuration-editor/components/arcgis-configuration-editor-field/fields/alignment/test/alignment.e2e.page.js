import { BaseHubComponentPage, waitForAndClick, waitForHasAttribute } from "../../../../../../../../test/e2e/utils";
import { ALIGNMENTS } from "../../../../../../interfaces";
export class AlignmentPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-alignment';
  }
  get _segmentedControl() {
    return `${this.root} calcite-segmented-control`;
  }
  get _alignmentStart() {
    return `${this._segmentedControl} calcite-segmented-control-item:nth-child(1)`;
  }
  ;
  get _alignmentCenter() {
    return `${this._segmentedControl} calcite-segmented-control-item:nth-child(2)`;
  }
  ;
  get _alignmentEnd() {
    return `${this._segmentedControl} calcite-segmented-control-item:nth-child(3)`;
  }
  ;
  async setAlignment(alignment) {
    let selector;
    if (alignment === ALIGNMENTS.start) {
      selector = this._alignmentStart;
    }
    if (alignment === ALIGNMENTS.center) {
      selector = this._alignmentCenter;
    }
    if (alignment === ALIGNMENTS.end) {
      selector = this._alignmentEnd;
    }
    await waitForAndClick(this.page, selector);
    await waitForHasAttribute(this.page, selector, 'checked');
  }
}
