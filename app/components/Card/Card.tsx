import s from "./card.module.css";

type CardProps = {
  // Define your component props here
};

export const Card = ({}: CardProps) => {
  return (
    <div className={s["card"]}>
      {/* Add your component content here */}
      <h1>Card Component</h1>
    </div>
  );
};