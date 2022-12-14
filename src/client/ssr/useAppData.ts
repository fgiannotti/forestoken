// ./src/client/ssr/useAppData.ts
import { useContext } from 'react';
import { AppDataContext } from './appData';

const useAppData = () => {
  return useContext(AppDataContext);
};

export { useAppData };
