// src/types/custom.ts

export type User = {
  id: number;
  name: string;
  surname: string;
  photoUrl: string;
  displayName: string;
  mail: string;
  accessToken: string | null;
};
