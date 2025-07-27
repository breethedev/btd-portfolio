import s from "./item.module.css";
import Image from "next/image";
import { User } from "lucide-react";

export type ItemProps = {
  name: string;
  description: string;
  image?: string;
  icons?: IconType[];
  id?: string | number;
};

export type IconType = typeof User;

export const Item = ({ name, description, image, icons }: ItemProps) => {
  return (
    <div className={s["item"]}>
      <div className={s["item-content"]}>
        <div className={s["item-image"]}>
          {image ? <Image src={image} alt={name} /> : <div className={s.placeholder} />}
        </div>
        <div className={s["item-details"]}>
          <p>{name}</p>
          <p className={s["item-description"]}>{description}</p>
        </div>
      </div>
      <div className={s["item-icons"]}>
        {icons &&
          icons.map((Icon, index) => (
            <span key={index} className={s["icon"]}>
              <Icon />
            </span>
          ))}
      </div>
    </div>
  );
};
