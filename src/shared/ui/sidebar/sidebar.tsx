import { useState } from 'react'

import { LogoutModal } from '@/features/auth/ui/logout/logoutModal/logoutModal'
import { useLogout } from '@/features/auth/ui/logout/useLogout'
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

export const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const logout = useLogout()

  const confirmLogout = () => {
    logout()
    setModalOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      {/**TODO: add internalization for all elements*/}
      <Sidebars>
        <div className={styles.icons}>
          <Link href={ROUTES.HOME}>
            <SidebarsElement>
              <HomeOutline />
              Home
            </SidebarsElement>
          </Link>
          <Link href={ROUTES.CREATE}>
            <SidebarsElement>
              <PlusSquareOutline />
              Create
            </SidebarsElement>
          </Link>
          {/**TODO: add route constants*/}
          <Link href={'/profile/${userId}'}>
            <SidebarsElement>
              <Person />
              My Profile
            </SidebarsElement>
          </Link>
          <Link href={ROUTES.MESSENGER}>
            <SidebarsElement>
              <MessageCircle />
              Messenger
            </SidebarsElement>
          </Link>
          <Link href={ROUTES.SEARCH}>
            <SidebarsElement>
              <Search />
              Search
            </SidebarsElement>
          </Link>
        </div>
        <div className={styles.icons}>
          <Link href={ROUTES.STATICS}>
            <SidebarsElement>
              <TrendingUp />
              Statics
            </SidebarsElement>
          </Link>
          <Link href={ROUTES.FAVORITES}>
            <SidebarsElement>
              <BookmarkOutline />
              Favorites
            </SidebarsElement>
          </Link>
        </div>
        <div className={styles.icons}>
          <SidebarsElement onClick={() => setModalOpen(true)}>
            <LogOut />
            Log Out
          </SidebarsElement>
        </div>
      </Sidebars>
      {isModalOpen && (
        <LogoutModal closeModal={closeModal} confirmLogout={confirmLogout} open={isModalOpen} />
      )}
    </div>
  )
}
