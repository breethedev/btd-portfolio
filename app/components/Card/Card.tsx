"use client";

import s from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  image?: string;
  title?: string;
  description?: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  size?: string[];
};

export const Card = ({ image, title, description, link, onClick, className, size }: CardProps) => {
  // const cardSizeClass = size ? s[`card-${size}`] : s["card-medium"];
  const cardClasses = `${s["card"]}  ${className || ""}`;

  const width = (size && size[0]) || "200px";
  const height = (size && size[1]) || "200px";

  const PlaceholderImage = () => (
    <div
      className={s["placeholder-image"]}
      style={{ width: width, height: size && size.length > 1 ? height : width }}
    >
      <span>No Image</span>
    </div>
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={cardClasses} onClick={handleClick} style={{ width: width }}>
      {image ? (
        <div
          className={s["card-image-container"]}
          style={{ width: `calc(${size} + 2px)`, height: size && size.length > 1 ? height : width }}
        >
          <Image src={image} alt={title || "Card Image"} className={s["card-image"]} />
        </div>
      ) : (
        <PlaceholderImage />
      )}
      {title && <h2 className={s["card-title"]}>{title}</h2>}
      {description && <p className={s["card-description"]}>{description}</p>}
      {link && (
        <Link href={link} className={s["card-link"]}>
          Learn More
        </Link>
      )}
    </div>
  );
};
