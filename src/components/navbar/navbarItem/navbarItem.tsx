import { ReactElement } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './navbarItem.module.scss'

type navbarItemProps = {
  activeSVG?: ReactElement
  href: string
  svg: ReactElement
  title: string
}

export function NavbarItem({ activeSVG, href, svg, title }: navbarItemProps) {
  const router = useRouter()

  const isActive = router.pathname === href
  const finalClassName = isActive ? `${s.navbarItem} ${s.active}` : s.navbarItem

  return (
    <div className={finalClassName}>
      {activeSVG && isActive ? activeSVG : svg}

      <Link href={href}>{title}</Link>
    </div>
  )
}
