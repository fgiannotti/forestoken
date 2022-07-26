// ./src/shared/types/app-data.ts
import { Config } from './config';

export type AppData = Pick<Config, 'basePath' | 'features'>;