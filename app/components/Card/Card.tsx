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
  meta?: string;
};

export const Card = ({
  image,
  title,
  description,
  link,
  onClick,
  meta,
  className,
  size,
}: CardProps) => {
  // const cardSizeClass = size ? s[`card-${size}`] : s["card-medium"];
  const cardClasses = `${s["card"]}  ${className || ""}`;

  const width = (size && size[0]) || "200px";
  const height = (size && size[1]) || width || "200px";

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

  const pixelsToNumber = (value: string) => {
    // remove 'px' and convert to number

    if (!value) return 0;
    const number = parseFloat(value.replace("px", ""));
    return isNaN(number) ? 0 : number;
  };
  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      style={{ minWidth: `calc(${width} + 2px)`, width: `calc(${width} + 2px)` }}
    >
      {image ? (
        <div className={s["card-image-container"]} style={{ width, height }}>
          <Image
            src={image}
            alt={title || "Card Image"}
            className={s["card-image"]}
            width={pixelsToNumber(width)}
            height={pixelsToNumber(height)}
          />
        </div>
      ) : (
        <PlaceholderImage />
      )}
      <div className={s["card-body"]}>
        {title && <h2 className={s["card-title"]}>{title}</h2>}
        {meta && <p className={s["card-meta"]}>{meta}</p>}
        {description || link ? (
          <div className={s["card-content"]}>
            {description && <p className={s["card-description"]}>{description}</p>}
            {link && (
              <Link href={link} className={s["card-link"]}>
                Learn More
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
