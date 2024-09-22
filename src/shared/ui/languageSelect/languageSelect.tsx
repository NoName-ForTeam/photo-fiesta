import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets'
import { Select, SelectItem } from '@photo-fiesta/ui-lib'
import { useRouter } from 'next/router'

import styles from './languageSelect.module.scss'

/**
 * LanguageSelect component allows users to switch between languages.
 *
 * This component renders a dropdown selection for language options,
 * which updates the application's locale and navigates to the same
 * page with the selected language applied.
 *
 * @example
 * <LanguageSelect className="my-custom-class" />
 */

export const LanguageSelect = ({ className }: { className: string }) => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const classNames = {
    flag: styles.flag,
    lang: styles.lang,
    selectItem: styles.selectItem,
  }

  /**
   * Handles changing the current language by updating the locale in the router.
   *
   * @param {string} locale - The locale string to switch to ('ru' or 'en').
   */
  const onChangeLanguage = (locale: string) => {
    void push({ pathname, query }, asPath, { locale })
  }

  return (
    <Select className={className} defaultValue={locale} onValueChange={onChangeLanguage}>
      <SelectItem value={'en'}>
        <div className={classNames.selectItem}>
          <FlagUnitedKingdom className={classNames.flag} />
          <span className={classNames.lang}>English</span>{' '}
        </div>
      </SelectItem>
      <SelectItem value={'ru'}>
        <div className={classNames.selectItem}>
          <FlagRussia className={styles.flag} />
          <span className={classNames.lang}>Russian</span>
        </div>
      </SelectItem>
    </Select>
  )
}
