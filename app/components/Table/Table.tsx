import s from "./table.module.css";
import Image from "next/image";
import { User } from "lucide-react";

export type TableProps = {
  items: TableItemProps[];
};

export type TableItemProps = {
  id: string;
  name: string;
  description: string;
  image?: string;
  icons?: IconType[];
};

export type IconType = typeof User;

export const Table = ({ items }: TableProps) => {
  return (
    <div className={s["table"]}>
      <div className={s["table-body"]}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const Item = ({ name, description, image, icons }: TableItemProps) => {
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
