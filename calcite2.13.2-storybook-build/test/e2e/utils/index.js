import { Environment } from '../types';
require('cross-fetch/polyfill');
require('isomorphic-form-data');
/**
 * The environment in which the tests are currently running
 */
export const ENVIRONMENT = process.env.ENV || Environment.qaext;
export { default as BaseHubComponentPage, newHubComponentPage } from './BaseHubComponentPage';
export * from './puppeteer';
export * from './ago';
// re-exporting to reduce number of imports in e2e test files
export { User, Organization, Environment } from '../types';
