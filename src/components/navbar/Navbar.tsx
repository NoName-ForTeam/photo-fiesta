import BookmarkOutline from '@/components/navbar/SVGComponents/BookmarkOutline'
import Home from '@/components/navbar/SVGComponents/Home'
import LogOutOutline from '@/components/navbar/SVGComponents/LogOutOutline'
import MessageCircle from '@/components/navbar/SVGComponents/MessageCircle'
import MessageCircleOutline from '@/components/navbar/SVGComponents/MessageCircleOutline'
import Person from '@/components/navbar/SVGComponents/Person'
import PersonOutline from '@/components/navbar/SVGComponents/PersonOutline'
import PlusSquareOutline from '@/components/navbar/SVGComponents/PlusSquareOutline'
import Search from '@/components/navbar/SVGComponents/Search'
import TrendingUp from '@/components/navbar/SVGComponents/TrendingUp'
import { NavbarItem } from '@/components/navbar/navbarItem/navbarItem'

import s from './navbar.module.scss'

export function Navbar() {
  return (
    <div className={s.navbarContainer}>
      <div>
        <NavbarItem href={'/home'} svg={<Home />} title={'Home'} />
        <NavbarItem href={'/create'} svg={<PlusSquareOutline />} title={'Create'} />
        <NavbarItem
          activeSVG={<Person />}
          href={'/myProfile'}
          svg={<PersonOutline />}
          title={'My profile'}
        />
        <NavbarItem
          activeSVG={<MessageCircle />}
          href={'/messenger'}
          svg={<MessageCircleOutline />}
          title={'Messenger'}
        />
        <NavbarItem href={'/search'} svg={<Search />} title={'Search'} />
      </div>
      <div>
        <NavbarItem href={'/statistics'} svg={<TrendingUp />} title={'Statistics'} />
        <NavbarItem href={'/favorites'} svg={<BookmarkOutline />} title={'Favorites'} />
      </div>
      <div>
        <NavbarItem href={'/log_out'} svg={<LogOutOutline />} title={'Logout'} />
      </div>
    </div>
  )
}
