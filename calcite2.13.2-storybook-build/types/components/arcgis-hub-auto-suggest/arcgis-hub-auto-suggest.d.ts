import { IQuery } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { AutoSuggestMatchSource, IEventWithMatchPayload, IHubAutoSuggestMatch, IHubAutoSuggestRecentMatch, IHubAutoSuggestResponse } from '../../utils/auto-suggest/types';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubAutoSuggest {
  element: HTMLArcgisHubAutoSuggestElement;
  /**
   * Value that the input should be initialized to and
   * stores the current value of the input.
   * Used to calculate suggestion matches.
   */
  term: string;
  /**
   * The search API to use for generating search result matches.
   * Only respected if `matchSearch` is true.
   */
  searchApi: 'portal' | 'hub';
  /**
   * The base query to scope search result matches to.
   * Only respected if `matchSearch` is true.
   */
  query: IQuery;
  /**
   * Whether the component should store / search recent
   * search terms within the browser's local storage.
   */
  matchRecent: boolean;
  /**
   * Whether the component should search / display
   * suggestion matches from a search API
   */
  matchSearch: boolean;
  /**
   * NOTE: Functionality not yet implemented.
   *
   * Whether the component should search / display suggestion matches from a
   * geographic location API, such as a geocoding service or the places API.
   */
  matchLocation: boolean;
  /**
   * Whether the component should display a button that clears the input
   */
  clearButton: boolean;
  /**
   * Whether the component should display a button that submits the input
   */
  searchButton: boolean;
  /**
   * Whether or not the search icon should be displayed in the input
   */
  showSearchIcon: boolean;
  /**
   * Whether telemetry events in the gallery should be disabled
   */
  disableTelemetry: boolean;
  /**
   * Optional placeholder text for the input to be used in place of default text
   */
  placeholder: string;
  /**
   * The scale of the input, based on calcite-input's scale prop
   */
  scale: Scale;
  /**
   * When true, the component's value can be read, but cannot be modified.
   */
  readOnly: boolean;
  lastResponse: IHubAutoSuggestResponse;
  /**
   * This event fires when a user commits a search term by pressing 'Enter' or clicking the search button.
   */
  inputChangeEvent: EventEmitter<string>;
  /**
   * This event fires when a user selects a match from the dropdown.
   */
  matchSelectedEvent: EventEmitter<IHubAutoSuggestMatch>;
  /**
   * Event that fires for recording telemetry
   */
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  private _inputElement;
  /**
   * The minimum number of characters that must be entered into the input before searching
   * actually begins. If this threshold is not met, the component will display the N most
   * recently searched terms instead (see `numDefaultRecentMatches)
   */
  private _minTermLength;
  /**
   * The number of recent terms to display when the input character count is below the `minTermLength` threshold.
   */
  private _numDefaultRecentMatches;
  constructor();
  componentWillLoad(): Promise<void>;
  preventClickPropagation(event: Event): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  get shouldShowRecentMatches(): boolean;
  get shouldShowSearchMatches(): boolean;
  get shouldShowLocationMatches(): boolean;
  get shouldShowDropdown(): boolean;
  /**
   * Returns the name of the icon to display in the input
   */
  get searchIcon(): string;
  /**
   * Returns the placeholder text to display in the input
   */
  get _placeholder(): string;
  /**
   * This handles when consumers programmatically change the `term` prop.
   */
  handleTermInputChanged(termInput: string): void;
  /**
   * Set focus on the input element programmatically
   */
  setFocus(): Promise<void>;
  setInputElement(el: HTMLCalciteInputElement): void;
  /**
   * Debounced wrapper for `this._refreshMatches`. This function should always be called in lieu of
   * `this._refreshMatches` to ensure that matches are not refreshed too frequently.
   *
   * NOTE: Due to accessibility / product requirements, we can't add a `Watch('term')` decorator
   * since we need to be able to update the term without triggering a search (e.g., when a user
   * selects a match). This function _must_ be manually called whenever matches need to be refreshed.
   */
  refreshMatches(): void;
  /**
   * Executes a search for matches based on the current value of the input.
   *
   * NOTE: _Do not_ decorate this function with `@Debounce` and _do not_ call this function
   * directly outside of a test. We had to separate the debounce from the actual logic as our
   * testing framework doesn't play nicely with debounced async functions.
   */
  _refreshMatches(): Promise<void>;
  /**
   * Clears all matches from the dropdown and closes the dropdown
   */
  clearMatches(): void;
  /**
   * Product requirements for when the input is focused:
   * - If the dropdown is closed, open the dropdown and refresh matches
   * - If the dropdown is open, do nothing and assume results are up to date
   */
  handleInputFocused(): void;
  /**
   * Handles keyboard interaction and navigation on the input element
   */
  handleInputKeyDown(event: KeyboardEvent): void;
  /**
   * Records the current value of the input whenever the user changes it (via type, paste, etc.)
   * and refreshes matches accordingly. This is _not_ propagated to the parent component.
   *
   * Note: this does not fire when `this.term` is updated programmatically
   */
  handleInputTyped(event: any): void;
  /**
   * Handles when the user commits the input value by pressing 'Enter' or clicking the search button,
   * indicating that they would like to execute a search. This is propagated to the parent component.
   *
   * If the `matchRecent` prop is true, this will save the current value of the input as a recent term.
   */
  handleInputCommitted(): void;
  /**
   * Handles keyboard interaction and navigation on match elements.
   *
   * NOTE: "Tab" events are special snowflakes that must be handled separately.
   * See `handleMatchTabOut` for more info.
   */
  handleMatchKeyDown(e: CustomEvent<IEventWithMatchPayload>): Promise<void>;
  /**
   * Wrapper for handling event propagation from match elements
   */
  handleMatchSelected(event: CustomEvent<IHubAutoSuggestMatch>): void;
  /**
   * Handles when a user selects a match from the dropdown. The match
   * is propagated to the parent component and the dropdown is closed.
   *
   * @param match match to be emitted to consumer
   */
  selectMatch(match: IHubAutoSuggestMatch): void;
  /**
   * Handles when a user removes a recent match from the dropdown.
   */
  handleRecentMatchRemoved(event: CustomEvent<IHubAutoSuggestRecentMatch>): void;
  /**
   * Handles forward tabs out of a match element.
   *
   * If the match is the last match in the dropdown, we let the browser handle the tab event
   * (i.e., focus the next tabbable element in the DOM) and close the dropdown.
   *
   * We can't do this in `handleMatchKeyDown` because recent match elements have mulitple tabbable
   * elements within them (i.e., the 'remove button'), so the component has to notify us via an event.
   */
  handleMatchTabOut(e: CustomEvent<IHubAutoSuggestMatch>): void;
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data: Record<string, any>): void;
  renderMatchesSection(matchSource: AutoSuggestMatchSource): VNode;
  render(): any;
}
