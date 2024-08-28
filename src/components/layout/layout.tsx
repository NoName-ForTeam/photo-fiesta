import { PropsWithChildren, ReactElement } from 'react'

import { Navbar } from '@/components/navbar/Navbar'

import s from './layout.module.scss'

export function Layout(props: PropsWithChildren) {
  const { children } = props

  return (
    <div className={s.layoutContainer}>
      <Navbar />
      {children}
    </div>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
