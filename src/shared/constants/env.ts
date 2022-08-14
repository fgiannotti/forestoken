// ./src/shared/constants/env.ts
export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const NODE_ENV = process.env.NODE_ENV;

export const DB_ENV = process.env.DB_ENV;

export const PORT = process.env.PORT || 3000;
