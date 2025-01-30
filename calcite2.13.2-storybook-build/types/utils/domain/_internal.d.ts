import { IDomainEntry } from "@esri/hub-common";
export declare type DomainInfo = Partial<IDomainEntry>;
/**
 * get orgKey or derive from hostname
 * and ensure it is lowercased
 * @param domain
 * @returns
 */
export declare const _getOrgKey: (domain: DomainInfo) => string;
