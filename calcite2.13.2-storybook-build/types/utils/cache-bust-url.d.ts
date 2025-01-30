/**
 * artifically update a query param associated with a url to force
 * the browser to load it from file rather than from cache
 */
export declare const cacheBustUrl: (url: string, param?: string) => string;
