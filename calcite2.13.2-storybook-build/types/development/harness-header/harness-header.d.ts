import { IArcGISContext, IFeatureFlags } from '@esri/hub-common';
import { VNode } from '../../stencil-public-runtime';
export declare class HarnessHeader {
  pageTitle: string;
  environment: string;
  /**
   * Set of feature flags to enable
   */
  flags: IFeatureFlags;
  get _context(): IArcGISContext;
  componentWillLoad(): void;
  get identityConfig(): Record<"clientId" | "portal", string>;
  get isGhPages(): boolean;
  get redirectUri(): string;
  get logoUri(): string;
  get homeUri(): string;
  signIn(): void;
  signOut(): void;
  onChangeEnv: (evt: CustomEvent) => void;
  onSignedIn(evt: CustomEvent): void;
  renderAuth(): VNode[];
  render(): any;
}
