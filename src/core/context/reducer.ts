import { GlobalActionKeys, GlobalActionMap } from './action';
import { GlobalContextState } from './initial';

export const globalReducer = (state: GlobalContextState, action: GlobalActionMap): GlobalContextState => {
  switch (action.type) {
    case GlobalActionKeys.UpdateTheme:
      localStorage.setItem('siteTheme', action.payload);
      return { ...state, siteTheme: action.payload };
    case GlobalActionKeys.UpdateUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
