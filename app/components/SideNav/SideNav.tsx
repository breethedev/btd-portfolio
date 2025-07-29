"use client";

import s from "./side-nav.module.css";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Dialog } from "radix-ui";
import { Contact } from "../Contact/Contact";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SideNavProps = {
  items?: SideNavItemProps[];
};

type SideNavItemProps = {
  title: string;
  path?: string;
  isSubSection?: boolean;
};

export const SideNav = ({ items }: SideNavProps) => {
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isContact = (title: string) => {
    return title === "Contact";
  };

  const handleContactClose = () => {
    setOpen(false);
  };
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
      {items?.map((item, index) =>
        isContact(item.title) ? (
          <Dialog.Root key={index} open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className={s["side-nav-contact"]}>
              <div className={s["side-nav-link"]}>{item.title}</div>
            </Dialog.Trigger>
            <Contact
              onClose={handleContactClose}
              toastMessage={toastMessage}
              setToastMessage={setToastMessage}
              toastOpen={toastOpen}
              setToastOpen={setToastOpen}
            />
          </Dialog.Root>
        ) : (
          <SideNavItem
            key={index}
            title={item.title}
            path={item.path}
            isSubSection={item.title === "Projects" || item.title === "Experience"}
          />
        )
      )}
    </div>
  );
};

const SideNavItem = ({ title, path, isSubSection }: SideNavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHomePage = pathname === "/";
  const handleSubSectionClick = () => {
    if (isSubSection) {
      if (isHomePage) {
        scrollToSection(title.toLowerCase());
      } else {
        router.push(path || "#");
        scrollToSection(title.toLowerCase());
      }
    }
  };
  const handleClick = () => {
    if (isSubSection) {
      handleSubSectionClick();
    } else {
      return;
    }
  };

  return (
    <div className={s["side-nav-item"]} onClick={handleClick}>
      {!isSubSection ? (
        <Link href={path || "#"} className={s["side-nav-link"]}>
          {title}
        </Link>
      ) : (
        title
      )}
      {/* Add more content or styles as needed */}
    </div>
  );
};
