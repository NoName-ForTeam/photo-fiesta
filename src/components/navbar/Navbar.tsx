import s from "./navbar.module.scss";
import { NavbarItem } from "@/components/navbar/navbarItem/navbarItem";
import Home from "@/components/navbar/SVGComponents/Home";
import PlusSquareOutline from "@/components/navbar/SVGComponents/PlusSquareOutline";
import Person from "@/components/navbar/SVGComponents/Person";
import MessageCircleOutline from "@/components/navbar/SVGComponents/MessageCircleOutline";
import Search from "@/components/navbar/SVGComponents/Search";
import MessageCircle from "@/components/navbar/SVGComponents/MessageCircle";
import PersonOutline from "@/components/navbar/SVGComponents/PersonOutline";
import TrendingUp from "@/components/navbar/SVGComponents/TrendingUp";
import BookmarkOutline from "@/components/navbar/SVGComponents/BookmarkOutline";
import LogOutOutline from "@/components/navbar/SVGComponents/LogOutOutline";

export function Navbar() {
  return (
    <div className={s.navbarContainer}>
      <div>
        <NavbarItem svg={<Home />} href={"/home"} title={"Home"} />
        <NavbarItem
          svg={<PlusSquareOutline />}
          href={"/create"}
          title={"Create"}
        />
        <NavbarItem
          svg={<PersonOutline />}
          activeSVG={<Person />}
          href={"/myProfile"}
          title={"My profile"}
        />
        <NavbarItem
          svg={<MessageCircleOutline />}
          activeSVG={<MessageCircle />}
          href={"/messenger"}
          title={"Messenger"}
        />
        <NavbarItem svg={<Search />} href={"/search"} title={"Search"} />
      </div>
      <div>
        <NavbarItem
          svg={<TrendingUp />}
          href={"/statistics"}
          title={"Statistics"}
        />
        <NavbarItem
          svg={<BookmarkOutline />}
          href={"/favorites"}
          title={"Favorites"}
        />
      </div>
      <div>
        <NavbarItem
          svg={<LogOutOutline />}
          href={"/log_out"}
          title={"Logout"}
        />
      </div>
    </div>
  );
}
