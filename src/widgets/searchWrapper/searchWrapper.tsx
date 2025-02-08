import { ReactNode } from 'react'

import s from './searchWrapper.module.scss'
export const SearchWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  const classNames = {
    wrapper: s.wrapper,
  } as const

  return <div className={classNames.wrapper}>{children}</div>
}
