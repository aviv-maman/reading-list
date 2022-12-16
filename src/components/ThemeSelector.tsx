import { FC } from 'react';
import darkMode from '../assets/dark_mode.svg';
import lightMode from '../assets/light_mode.svg';
import { useGlobalContext } from '../core/context/initialContextState';
import { GlobalActionKeys } from '../core/context/action';

type ThemeSelectorProps = {};

const ThemeSelector: FC<ThemeSelectorProps> = (props) => {
  const { state, dispatch } = useGlobalContext();

  const toggleMode = () => {
    dispatch({ type: GlobalActionKeys.UpdateTheme, payload: state.siteTheme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          onClick={toggleMode}
          src={state.siteTheme === 'dark' ? darkMode : lightMode}
          style={{ filter: state.siteTheme === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
          alt='dark/light toggle icon'
        />
      </div>
    </div>
  );
};

export default ThemeSelector;
