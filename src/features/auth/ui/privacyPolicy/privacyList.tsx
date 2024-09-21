import usePrivacy, { Privacy } from '@/features/auth/ui/privacyPolicy/usePrivacy'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './privacyPolicy.module.scss'

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
