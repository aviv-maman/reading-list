import { FC } from 'react';
import languageIcon from '../assets/language.svg';
import { languages } from '../core/languages';
import { useTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';

type LanguageDropdownProps = {};

const LanguageDropdown: FC<LanguageDropdownProps> = (props) => {
  const { t, i18n } = useTranslation();
  const numOfLanguages = Object.keys(languages).length;

  return (
    <div className='language-selector'>
      <div className='mode-toggle'>
        <img src={languageIcon} alt='language icon' />
        <select onChange={(event) => i18n.changeLanguage(event.target.value)} name='language' id='language'>
          <option value={languages.en.code}>{languages.en.nativeLabel}</option>
          <option value={languages.he.code}>{languages.he.nativeLabel}</option>
        </select>
        <span>{i18next.t('language', { ns: 'translation', count: numOfLanguages })}</span>
      </div>
    </div>
  );
};

export default LanguageDropdown;
