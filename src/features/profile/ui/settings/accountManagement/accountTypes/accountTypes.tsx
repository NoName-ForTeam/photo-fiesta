import { RadioGroup, Typography } from '@photo-fiesta/ui-lib'

import styles from './accountTypes.module.scss'

import { AccountType } from '../accountManagements'
import { RadioBlock } from '../radioBlock'

/** Array of available account types */
const accountTypes = [
  { title: 'Personal', value: 'personal' },
  { title: 'Business', value: 'business' },
] as const

type AccountTypesProps = {
  accountType: AccountType
  setAccountType: (value: AccountType) => void
}

export const AccountTypes = ({ accountType, setAccountType }: AccountTypesProps) => {
  const AccountTypeBlocks = accountTypes.map(type => (
    <RadioBlock key={type.value} title={type.title} value={type.value} />
  ))
  const classNames = {
    account: styles.account,
    container: styles.container,
    title: styles.title,
  } as const
  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
  }

  return (
    <div className={classNames.account}>
      <Typography className={classNames.title} variant={'h3'}>
        Account type:
      </Typography>
      <RadioGroup
        className={classNames.container}
        onValueChange={handleAccountTypeChange}
        value={accountType}
      >
        {AccountTypeBlocks}
      </RadioGroup>
    </div>
  )
}
