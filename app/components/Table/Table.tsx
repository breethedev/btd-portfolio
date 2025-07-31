import s from "./table.module.css";
import { Item, ItemProps } from "../Item/Item";

export type TableProps = {
  items: ItemProps[];
};

export const Table = ({ items }: TableProps) => {
  return (
    <div className={s["table"]}>
      <div className={s["table-body"]}>
        {items.map((item) => (
          <Item key={item.id} {...item} className={s["table-item"]} />
        ))}
      </div>
    </div>
  );
};
