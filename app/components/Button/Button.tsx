import s from "./button.module.css";

type ButtonProps = {
  // Define your component props here
};

export const Button = ({}: ButtonProps) => {
  return (
    <div className={s["button"]}>
      {/* Add your component content here */}
      <h1>Button Component</h1>
    </div>
  );
};