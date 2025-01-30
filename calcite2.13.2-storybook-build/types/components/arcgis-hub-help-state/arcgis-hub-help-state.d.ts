import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { HeadingLevel, Scale, Kind } from '@esri/calcite-components';
export interface IHelpStateProps {
  /** Heading text */
  heading?: string;
  /** Name of Calcite icon to show above header. If both `icon` and `imageUrl` are set the image is shown. */
  icon?: string;
  /** URL to an image to show above header. */
  imageUrl?: string;
  /** More detailed message */
  message?: string;
  /** Button text for action. If not set, no button will show. */
  actionText?: string;
  /** URL for action. If provided the action will be rendered as and behave like a link. */
  actionLink?: string;
  /** A label to apply to the calcite laoder. Only applies to the loading state. */
  loadingLabel?: string;
  /**
   * Telemetry to log when an action is clicked.
   * NOTE: telemetry events passed into this
   * prop should come from our telemetry dictionary.
  */
  telemetry?: Record<string, any>;
  viewedTelemetry?: Record<string, any>;
}
/**
 * Pre-defined help states with default messages, image, and/or icon
 */
export declare type HelpState = 'unauthenticated' | 'not-found' | 'unsupported-device' | 'access-denied' | 'loading';
export declare class ArcgisHubHelpState implements IHelpStateProps {
  el: HTMLElement;
  heading?: string;
  icon?: string;
  imageUrl?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  loadingLabel?: string;
  telemetry?: Record<string, string>;
  viewedTelemetry?: Record<string, string>;
  /** Pre-defined help state w/ default properties */
  state?: HelpState;
  headingLevel: HeadingLevel;
  scale: Scale;
  kind: Exclude<Kind, "inverse | neutral">;
  isMain: boolean;
  arcgisHubHelpStateActionClick: EventEmitter<void>;
  hubTelemetry: EventEmitter<Record<string, string>>;
  private get _context();
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  private get _imageUrl();
  private get _fallbackImageUrl();
  private _getProp;
  private _getMessage;
  private handleClick;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  _renderLoader(): any;
  _renderImage(): any;
  render(): any;
}
