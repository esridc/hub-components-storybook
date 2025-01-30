import { ArcGISContextManager, IArcGISContextManagerOptions, IUserResourceConfig } from '@esri/hub-common';
/**
 * serialize a context manager and save it in local storage
 * @param contextManager omit this to clear any previously stored value
 */
export declare const storeContextManager: (contextManager?: ArcGISContextManager) => void;
/**
 * retrieve and deserialize a previously stored context manager
 * @returns context manager
 */
export declare function retrieveContextManager(): Promise<ArcGISContextManager | void>;
export declare function retrieveContextManager(portalUrl: string): Promise<ArcGISContextManager>;
/**
 * temporary wrapper for ArcGISContextManager.create()
 * b/c that blows up in hub-workspaces dev, see:
 * signIn() in packages/hub-workspaces/src/utils/auth.ts
 * @private
 * @param options
 * @returns context manager
 */
export declare const createContextManager: (options: IArcGISContextManagerOptions) => Promise<ArcGISContextManager>;
export interface IInitializeContextManagerOptions extends IArcGISContextManagerOptions {
  portalUrl: string;
  clientId?: string;
  redirectUri?: string;
}
export declare const initContextManager: (options: IInitializeContextManagerOptions) => Promise<any>;
export declare const getResourceConfigs: (isPortal: boolean) => IUserResourceConfig[];
