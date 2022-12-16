import type { User } from './initialContextState';
import type { Language } from '../languages';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export enum GlobalActionKeys {
  UpdateTheme = 'UPDATE_THEME',
  UpdateIsAuthenticated = 'UPDATE_ISAUTHENTICATED',
  UpdateUser = 'UPDATE_USER',
  UpdateLanguage = 'UPDATE_LANGUAGE',
}

type GlobalPayload = {
  [GlobalActionKeys.UpdateTheme]: 'dark' | 'light';
  [GlobalActionKeys.UpdateIsAuthenticated]: boolean;
  [GlobalActionKeys.UpdateUser]: User | null;
  [GlobalActionKeys.UpdateLanguage]: Language;
};

export type GlobalActionMap = ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>];
