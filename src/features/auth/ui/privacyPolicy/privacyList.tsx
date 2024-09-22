import { Typography } from '@photo-fiesta/ui-lib'

import styles from './privacyPolicy.module.scss'

import usePrivacy, { Privacy } from './usePrivacy'

/**
 * Зкшмфсн component renders a list of privacy.
 * It uses the `usePrivacy` hook to fetch the list of terms and maps through them,
 * rendering each term using the `TermsItem` component.
 *
 * @component
 * @example
 * ```tsx
 * return (
 *   <PrivacyList />
 * );
 * ```
 */

export const PrivacyList = () => {
  const terms = usePrivacy()
  const classNames = {
    list: styles.list,
  }

  return (
    <div className={classNames.list}>
      {terms.map(term => (
        <PrivacyItem key={term.title} term={term} />
      ))}
    </div>
  )
}

type TermsItemProps = {
  term: Privacy
}
const PrivacyItem = ({ term }: TermsItemProps) => {
  return (
    <>
      <Typography variant={'h2'}>{term.title}</Typography>
      <Typography as={'div'}>
        {term.description}
        {term?.extra ? (
          <ul>
            {term.extra.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </Typography>
    </>
  )
}
