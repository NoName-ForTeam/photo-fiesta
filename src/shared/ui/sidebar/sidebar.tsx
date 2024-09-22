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
      <Sidebars>
        <div className={styles.icons}>
          <Link href={'/home'}>
            <SidebarsElement>
              <HomeOutline />
              Home
            </SidebarsElement>
          </Link>
          <Link href={'/create'}>
            <SidebarsElement>
              <PlusSquareOutline />
              Create
            </SidebarsElement>
          </Link>
          <Link href={'/profile/${userId}'}>
            <SidebarsElement>
              <Person />
              My Profile
            </SidebarsElement>
          </Link>
          <Link href={'/messenger'}>
            <SidebarsElement>
              <MessageCircle />
              Messenger
            </SidebarsElement>
          </Link>
          <Link href={'/search'}>
            <SidebarsElement>
              <Search />
              Search
            </SidebarsElement>
          </Link>
        </div>
        <div className={styles.icons}>
          <Link href={'/statics'}>
            <SidebarsElement>
              <TrendingUp />
              Statics
            </SidebarsElement>
          </Link>
          <Link href={'/favorites'}>
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
