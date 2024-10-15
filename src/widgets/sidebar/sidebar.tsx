import { useState } from 'react'

import { ImagePostModal, useImagePostModal, useProfile } from '@/features'
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
import { useTranslation } from '@/shared/utils'
import { ConfirmationModal, ModalAddPhoto } from '@/widgets'
import { Button, Sidebars, SidebarsElement } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
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
  onClick?: () => void
  text: string
}

/**
 * Sidebar component that displays navigation items and logout option
 */
//TODO: add translations
export const Sidebar = () => {
  const { t } = useTranslation()
  const { confirmLogout, getProfileLink, isActive, isModalOpen, setIsModalOpen } = useSidebar()
  const { profileInfo } = useProfile()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [openPostModal, setOpenPostModal] = useState(false)

  //TODO: refactor callback for createModal when it opened after ModalAddPhoto
  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)
  const handleOpenPostModal = () => setOpenPostModal(true)

  const handleClosePostModal = () => {
    setOpenPostModal(false)
    setSelectedImage(null)
  }

  const { postId } = useImagePostModal({ handleClose: handleOpenPostModal })

  const classNames = {
    icons: styles.icons,
    root: styles.root,
  }

  /** Array of sidebar items to be rendered */
  const sidebarItems: SidebarItem[] = [
    { href: ROUTES.HOME, icon: HomeOutline, text: t.sidebar.home },
    { href: '#', icon: PlusSquareOutline, onClick: openCreateModal, text: t.sidebar.create },
    {
      href: getProfileLink(),
      icon: Person,
      isActiveOverride: `${ROUTES.PROFILE}/[userId]`,
      text: t.sidebar.myProfile,
    },
    { href: ROUTES.MESSENGER, icon: MessageCircle, text: t.sidebar.messenger },
    { href: ROUTES.SEARCH, icon: Search, text: t.sidebar.search },
    { href: ROUTES.STATICS, icon: TrendingUp, text: t.sidebar.statics },
    { href: ROUTES.FAVORITES, icon: BookmarkOutline, text: t.sidebar.favorites },
  ]

  const renderedSidebarItems = sidebarItems.map(item => (
    <SidebarElement
      href={item.href}
      icon={item.icon}
      isActive={path => isActive(item.isActiveOverride || path)}
      key={item.href}
      onClick={item.onClick}
      text={item.text}
    />
  ))

  return (
    <div className={classNames.root}>
      <Sidebars>
        <div className={classNames.icons}>{renderedSidebarItems}</div>
        <div className={classNames.icons}>
          <SidebarElement
            icon={LogOut}
            isActive={() => ''}
            onClick={() => setIsModalOpen(true)}
            text={t.sidebar.logout}
          />
        </div>
      </Sidebars>
      {isModalOpen && (
        <ConfirmationModal
          closeModal={() => setIsModalOpen(false)}
          confirmation={confirmLogout}
          content={'Are you really want to logout of your account?'}
          isOpen={isModalOpen}
          title={t.sidebar.logout}
        />
      )}
      {isCreateModalOpen && (
        <ModalAddPhoto
          handleCloseModal={() => {
            closeCreateModal()
            handleOpenPostModal()
          }}
          isOpen={isCreateModalOpen}
          setImage={setSelectedImage}
        />
      )}
      {openPostModal && selectedImage && (
        <ImagePostModal
          avatar={profileInfo?.avatars}
          handleClose={handleClosePostModal}
          postId={postId ?? 0}
          selectedImage={selectedImage}
          userId={profileInfo?.id}
        />
      )}
    </div>
  )
}

//sidebar element

type SidebarElementProps = {
  href?: string
  /**
   * @property {Icon} icon - The icon to display in the sidebar element.
   */
  icon: Icon
  /**
   * @property {(path: string) => string} isActive - Function to determine if the current path is active.
   */
  isActive: (path: string) => string
  onClick?: () => void
  text: string
}

/**
 * SidebarElement component that renders a single navigation item
 *  This component can render either a Link or a Button based on whether the href prop is provided.
 * It's used for both navigation items and the logout button in the sidebar.
 *
 */
const SidebarElement = ({
  href,
  icon: Icon,
  isActive,
  onClick,
  text,
}: SidebarElementProps): JSX.Element => {
  const commonProps = {
    className: clsx(
      styles.sidebarElement,
      href ? styles[isActive(href)] : styles.logoutButton,
      text === 'Search' && styles.search
    ),
    onClick,
  }

  const content = (
    <SidebarsElement>
      <Icon />
      {text}
    </SidebarsElement>
  )

  return href ? (
    <Link href={href} {...commonProps}>
      {content}
    </Link>
  ) : (
    <Button variant={'icon-link'} {...commonProps}>
      {content}
    </Button>
  )
}
