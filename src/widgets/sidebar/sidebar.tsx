import { useState } from 'react'

import { CreatePostModal } from '@/features'
import { LogOut } from '@/shared/assets'
import { ConfirmationModal, ModalAddPhoto } from '@/widgets'
import { Button, Sidebars, SidebarsElement } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './sidebar.module.scss'

import { Icon, useSidebar } from './useSidebar'

/**
 * Sidebar component that displays navigation items and logout option
 */

export const Sidebar = () => {
  const {
    confirmLogout,
    handleCloseAddPhotoModal,
    handleCloseLogoutModal,
    handleClosePostModal,
    handleLogoutClick,
    isActive,
    modalState,
    profileInfo,
    selectedImage,
    setSelectedImage,
    sidebarItems,
    t,
  } = useSidebar()
  const [isEditing, setIsEditing] = useState(false)
  const { isCreateModalOpen, isModalOpen, openPostModal } = modalState

  const classNames = {
    icons: styles.icons,
    root: styles.root,
  }

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
            onClick={handleLogoutClick}
            text={t.sidebar.logout}
          />
        </div>
      </Sidebars>
      {isModalOpen && (
        <ConfirmationModal
          closeModal={handleCloseLogoutModal}
          confirmation={confirmLogout}
          content={'Are you really want to logout of your account?'}
          isOpen={isModalOpen}
          title={t.sidebar.logout}
        />
      )}
      {isCreateModalOpen && (
        <ModalAddPhoto
          handleCloseModal={handleCloseAddPhotoModal}
          isOpen={isCreateModalOpen}
          postPhoto
          setImage={setSelectedImage}
        />
      )}
      {openPostModal && selectedImage && (
        <CreatePostModal
          avatar={profileInfo?.avatars}
          handleClose={handleClosePostModal}
          isEditing={isEditing}
          // postPhoto
          selectedImage={selectedImage}
          setIsEditing={setIsEditing}
          setSelectedImage={setSelectedImage}
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
