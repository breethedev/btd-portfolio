import s from "./side-nav.module.css";

type SideNavProps = {
  title?: string;
  items?: string[];
};

export const SideNav = ({ items }: SideNavProps) => {
  return (
    <div className={s["side-nav"]}>
      {/* Add your component content here */}
      <h1>SideNav Component</h1>
      {items?.map((item, index) => (
        <SideNavItem key={index} title={item} />
      ))}
    </div>
  );
};

const SideNavItem = ({ title }: { title: string }) => {
  return (
    <div className={s["side-nav-item"]}>
      <h2>{title}</h2>
      {/* Add more content or styles as needed */}
    </div>
  );
};
