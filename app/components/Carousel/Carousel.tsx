"use client";

import s from "./carousel.module.css";
import { Card, CardProps } from "../Card/Card";

type CarouselProps = {
  header?: string;
  action?: string;
  onActionClick?: () => void;
  cards: CardProps[];
};

export const Carousel = ({ header, cards, action, onActionClick }: CarouselProps) => {
  return (
    <div className={s["carousel"]}>
      {header && (
        <div className={s["carousel-header-container"]}>
          {header && <h2 className={s["carousel-header"]}>{header}</h2>}
          {action && (
            <button className={s["carousel-action"]} onClick={onActionClick}>
              {action}
            </button>
          )}
        </div>
      )}
      {cards.length === 0 && <p className={s["carousel-empty"]}>No cards available</p>}
      {cards.length > 0 && (
        <div className={s["carousel-items"]}>
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
              onClick={card.onClick}
              className={s["carousel-card"]}
              size={card.size}
            />
          ))}
        </div>
      )}
    </div>
  );
};
