import { EventEmitter } from '../../../../stencil-public-runtime';
import { IHubAutoSuggestMatch, IEventWithMatchPayload, IHubAutoSuggestRecentMatch } from '../../../../utils/auto-suggest/types';
export declare class ArcgisHubAutoSuggestMatch {
  /**
   * The match to render
   */
  match: IHubAutoSuggestMatch;
  /**
   * The term that was used to find this match. Used for calculating
   * the highlighted label to display
   */
  term: string;
  /**
   * Emits when the match's primary label is clicked
   */
  matchSelected: EventEmitter<IHubAutoSuggestMatch>;
  /**
   * Emits when a key is pressed while the match is focused.
   * Decorates the event with the match that was focused
   */
  matchKeyDown: EventEmitter<IEventWithMatchPayload>;
  /**
   * Emits when the remove button is clicked on a recent match
   */
  recentMatchRemoved: EventEmitter<IHubAutoSuggestRecentMatch>;
  /**
   * Emits when the user hits forward tab on the _last_ focusable element
   * within the match. Decorates the event with the match that tabbed on.
   *
   * For recent matches, this emits when the user tabs off the remove button.
   * For other matches, this emits when the user tabs off the match link.
   */
  matchTabOut: EventEmitter<IHubAutoSuggestMatch>;
  private _link;
  setLinkElement(el: HTMLAnchorElement): void;
  setFocus(): Promise<void>;
  constructor();
  get isRecentMatch(): boolean;
  handleMatchSelected(event: PointerEvent): void;
  handleMatchKeyDown(event: KeyboardEvent): void;
  handleRecentMatchRemoved(): void;
  handleRemoveMatchButtonKeyDown(event: KeyboardEvent): void;
  render(): any;
}
