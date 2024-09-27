import { LogoutModal } from '@/features'
import {
  BookmarkOutline,
  HomeOutline,
  LogOut,
  MessageCircle,
  Person,
  PlusSquareOutline,
  Search,
  TrendingUp,
} from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Sidebars, SidebarsElement } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './sidebar.module.scss'

import { useSidebar } from './useSidebar'

/** Type representing the icon components used in the sidebar */
type Icon = typeof HomeOutline
type SidebarItem = {
  href: string
  icon: Icon
  /**
   * Optional override for the active state check.
   * Used when the active state logic differs from the standard path comparison.
   * For example, it's used for dynamic routes like user profiles.
   */
  isActiveOverride?: string
  text: string
}

/**
 * Sidebar component that displays navigation items and logout option
 */
export const Sidebar = () => {
  const { confirmLogout, getProfileLink, isActive, isModalOpen, setIsModalOpen } = useSidebar()

  const classNames = {
    icons: styles.icons,
    root: styles.sidebar,
  }

  /** Array of sidebar items to be rendered */
  const sidebarItems: SidebarItem[] = [
    { href: ROUTES.HOME, icon: HomeOutline, text: 'Home' },
    { href: ROUTES.CREATE, icon: PlusSquareOutline, text: 'Create' },
    {
      href: getProfileLink(),
      icon: Person,
      isActiveOverride: `${ROUTES.PROFILE}/[userId]`,
      text: 'My Profile',
    },
    { href: ROUTES.MESSENGER, icon: MessageCircle, text: 'Messenger' },
    { href: ROUTES.SEARCH, icon: Search, text: 'Search' },
    { href: ROUTES.STATICS, icon: TrendingUp, text: 'Statics' },
    { href: ROUTES.FAVORITES, icon: BookmarkOutline, text: 'Favorites' },
  ]

  const renderedSidebarItems = sidebarItems.map(item => (
    <SidebarElement
      href={item.href}
      icon={item.icon}
      isActive={path => isActive(item.isActiveOverride || path)}
      key={item.href}
      text={item.text}
    />
  ))

  return (
    <div className={classNames.root}>
      <Sidebars>
        <div className={classNames.icons}>{renderedSidebarItems}</div>
        <div className={classNames.icons}>
          <SidebarElement
            href={''}
            icon={LogOut}
            isActive={() => ''}
            onClick={() => setIsModalOpen(true)}
            text={'Log Out'}
          />
        </div>
      </Sidebars>
      {isModalOpen && (
        <LogoutModal
          closeModal={() => setIsModalOpen(false)}
          confirmLogout={confirmLogout}
          open={isModalOpen}
        />
      )}
    </div>
  )
}

//sidebar element

type SidebarElementProps = {
  href: string
  icon: Icon
  isActive: (path: string) => string
  onClick?: () => void
  text: string
}

/**
 * SidebarElement component that renders a single navigation item
 */
const SidebarElement = ({
  href,
  icon: Icon,
  isActive,
  onClick,
  text,
}: SidebarElementProps): JSX.Element => (
  <Link className={styles[isActive(href)]} href={href} onClick={onClick}>
    <SidebarsElement>
      <Icon />
      {text}
    </SidebarsElement>
  </Link>
)
