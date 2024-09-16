import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets'
import { Select, SelectItem } from '@photo-fiesta/ui-lib'
import { useRouter } from 'next/router'

import styles from './languageSelect.module.scss'

export const LanguageSelect = ({ className }: { className: string }) => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const classNames = {
    flag: styles.flag,
    lang: styles.lang,
    selectItem: styles.selectItem,
  }

  const onChangeLanguage = (locale: string) => {
    void push({ pathname, query }, asPath, { locale })
  }

  return (
    <Select className={className} defaultValue={locale} onValueChange={onChangeLanguage}>
      <SelectItem value={'ru'}>
        <div className={classNames.selectItem}>
          <FlagRussia className={styles.flag} />
          <span className={classNames.lang}>Russian</span>
        </div>
      </SelectItem>
      <SelectItem value={'en'}>
        <div className={classNames.selectItem}>
          <FlagUnitedKingdom className={classNames.flag} />
          <span className={classNames.lang}>English</span>{' '}
        </div>
      </SelectItem>
    </Select>
  )
}
