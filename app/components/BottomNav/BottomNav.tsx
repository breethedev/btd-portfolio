import s from "./bottom-nav.module.css";
import { Home, CircleUser, Code, FileUser, Image as ImageIcon } from "lucide-react";

export const BottomNav = () => {
  return (
    <div className={s["bottom-nav"]}>
      <div className={s["bottom-nav-content"]}>
        <div className={s["bottom-nav-item"]}>
          <a href="#about" className={s["bottom-nav-link"]}>
            <Home size={24} />
          </a>
        </div>
        <div className={s["bottom-nav-item"]}>
          <a href="#projects" className={s["bottom-nav-link"]}>
            <Code size={24} />
          </a>
        </div>
        <div className={s["bottom-nav-item"]}>
          <a href="#experience" className={s["bottom-nav-link"]}>
            <FileUser size={24} />
          </a>
        </div>
        <div className={s["bottom-nav-item"]}>
          <a href="#gallery" className={s["bottom-nav-link"]}>
            <ImageIcon size={24} />
          </a>
        </div>
        <div className={s["bottom-nav-item"]}>
          <a href="#contact" className={s["bottom-nav-link"]}>
            <CircleUser size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};
