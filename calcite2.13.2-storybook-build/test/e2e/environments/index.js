import dotenv from 'dotenv';
import { resolve } from 'path';
import { Environment } from '../types';
// verify env
const { ENV } = process.env;
if (ENV && !Environment[ENV]) {
  throw new Error(`Invalid environment ${ENV}, must be one of ${Object.values(Environment).join('|')}`);
}
// load .env file
const path = resolve(__dirname, '../', '.env');
const env = dotenv.config({ path });
if (env.error) {
  throw new Error(`Failed to load .env file at ${path}: ${env.error.message}`);
}
export * from './devext';
export * from './qaext';
export * from './prod';
