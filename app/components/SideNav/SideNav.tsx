import s from "./side-nav.module.css";
import Link from "next/link";
import { UserCircle } from "lucide-react";

type SideNavProps = {
  items?: SideNavItemProps[];
};

type SideNavItemProps = {
  title: string;
  path?: string;
};

export const SideNav = ({ items }: SideNavProps) => {
  return (
    <div className={`side-nav ${s["side-nav"]}`}>
      <div className={s["side-nav-header"]}>
        <div>
          <Link href="/" className={s["side-nav-link"]}>
            <UserCircle className={s["side-nav-icon"]} />
          </Link>
        </div>
        <h2 className={s["side-nav-title"]}>BreeTheDev</h2>
      </div>
      {items?.map((item, index) => (
        <SideNavItem key={index} title={item.title} path={item.path} />
      ))}
    </div>
  );
};

const SideNavItem = ({ title, path }: SideNavItemProps) => {
  return (
    <div className={s["side-nav-item"]}>
      <Link href={path || "#"} className={s["side-nav-link"]}>
        {title}
      </Link>
      {/* Add more content or styles as needed */}
    </div>
  );
};
