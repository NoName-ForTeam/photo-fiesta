import { ReactElement } from "react";
import Link from "next/link";
import s from "./navbarItem.module.scss";
import { useRouter } from "next/router";

type navbarItemProps = {
  svg: ReactElement;
  activeSVG?: ReactElement;
  href: string;
  title: string;
};

export function NavbarItem({ svg, activeSVG, href, title }: navbarItemProps) {
  const router = useRouter();

  const isActive = router.pathname === href;
  const finalClassName = isActive
    ? `${s.navbarItem} ${s.active}`
    : s.navbarItem;

  return (
    <div className={finalClassName}>
      {activeSVG && isActive ? activeSVG : svg}

      <Link href={href}>{title}</Link>
    </div>
  );
}
