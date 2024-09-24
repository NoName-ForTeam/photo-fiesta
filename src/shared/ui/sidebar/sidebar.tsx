import { useState } from 'react'

import { LogoutModal } from '@/features/auth/ui/logout/logoutModal/logoutModal'
import { useLogout } from '@/features/auth/ui/logout/useLogout'
import userId from '@/pages/profile/[userId]'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const logout = useLogout()

  const confirmLogout = () => {
    logout()
    setIsModalOpen(false)
  }

  const classNames = {
    icons: styles.icons,
  }

  return (
    <div>
      {/**TODO: add internalization for all elements*/}
      <Sidebars>
        <div className={classNames.icons}>
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
          <Link href={`${ROUTES.PROFILE}/${userId}`}>
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
        <div className={classNames.icons}>
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
        <div className={classNames.icons}>
          <SidebarsElement onClick={() => setIsModalOpen(true)}>
            <LogOut />
            Log Out
          </SidebarsElement>
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
