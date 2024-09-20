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
          <SidebarsElement>
            <LogOut />
            Log Out
          </SidebarsElement>
        </div>
      </Sidebars>
    </div>
  )
}
