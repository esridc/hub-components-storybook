import { IHubEvent, IQuery } from '@esri/hub-common';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisHubEventAbout {
  /**
   * A reference to the intl service
   */
  intl: ComponentIntl;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubEventAboutElement;
  /**
   * Content Hierarchy Path that will be passed onto the gallery component
   * so links are constructed with the correct path
   */
  path: string;
  /**
   * A reference to an IHubEvent object
   */
  entity: IHubEvent;
  /**
   * `true` when the event has referenced another entity and that entity is accessible by the current user
   */
  hasReferencedContent: boolean;
  /**
   * Component will load lifecycle method. Loads translations.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Loads the translations for the component
   */
  loadIntl(): Promise<void>;
  /**
   * Returns a sanitized copy of the entity description string
   */
  get sanitizedDescription(): string;
  /**
   * Returns a string representing the event's start & end date/time formatted for the user's locale
   */
  get dateRange(): string;
  /**
   * Returns notice configs for past and canceled events
   */
  get noticeConfig(): {
    kind: string;
    message: string;
  };
  /**
   * Builds the query used to render the referenced content in a gallery component
   */
  get referencedContentQuery(): IQuery;
  /**
   * Sets hasReferencedContent to true when the event has referenced content and that content is accessible to the user, else false
   * @param evt An ArcgisHubGalleryCustomEvent<IHubSearchResult[]> object
   */
  handleReferencedContentResultsChange: (evt: any) => void;
  /**
   * Renders a calcite-notice when a noticeConfig exists (past & canceled events)
   */
  renderNotice(): HTMLElement;
  /**
   * Renders the When and Where section
   */
  renderWhen(): HTMLElement;
  /**
   * Renders the Summary section
   */
  renderSummary(): HTMLElement;
  /**
   * Renders the Description section
   */
  renderDescription(): HTMLElement;
  /**
   * Renders the Metadata section
   */
  renderMetadata(): HTMLElement;
  /**
   * Renders the Referenced Content section
   */
  renderReferencedContent(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
