import { Typography } from '@photo-fiesta/ui-lib'

import styles from './termsOfService.module.scss'

import useTerms, { Term } from './useTerms'

/**
 * TermsList component renders a list of terms of service.
 * It uses the `useTerms` hook to fetch the list of terms and maps through them,
 * rendering each term using the `TermsItem` component.
 *
 * @component
 * @example
 * ```tsx
 * return (
 *   <TermsList />
 * );
 * ```
 */

export const TermsList = () => {
  const terms = useTerms()
  const classNames = {
    list: styles.list,
  }

  return (
    <div className={classNames.list}>
      {terms.map(term => (
        <TermsItem key={term.title} term={term} />
      ))}
    </div>
  )
}

type TermsItemProps = {
  term: Term
}
const TermsItem = ({ term }: TermsItemProps) => {
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
