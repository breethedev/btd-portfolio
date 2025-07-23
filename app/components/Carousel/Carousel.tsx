"use client";

import s from "./carousel.module.css";
import { Card, CardProps } from "../Card/Card";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { get } from "http";

type CarouselProps = {
  header?: string;
  action?: string;
  onActionClick?: () => void;
  cards: CardProps[];
  cardSize?: string[];
};

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => {
  return (
    <button
      className={`${s["carousel-arrow"]} ${s[`carousel-arrow-${direction}`]}`}
      onClick={onClick}
    >
      {direction === "left" ? <CircleArrowLeft size={24} /> : <CircleArrowRight size={24} />}
    </button>
  );
};

export const Carousel = ({ header, cards, action, onActionClick, cardSize }: CarouselProps) => {
  const scrollCarousel = (direction: "left" | "right", scrollAmount?: number) => {
    const carousel = document.querySelector(
      `#${header ? header.toLowerCase().replace(/\s+/g, "-") : "carousel-items"}`
    );

    if (!carousel) return;
    const getScrollAmount = (direction: "left" | "right", defaultAmount: number) => {
      if (scrollAmount) return scrollAmount;
      const itemWidth = carousel.querySelector(`.${s["carousel-card"]}`)?.clientWidth || 200;
      const visibleItems = Math.floor(carousel.clientWidth / itemWidth);

      if (direction === "left") {
        return Math.max(itemWidth * visibleItems, defaultAmount) * -1;
      }
      return Math.max(itemWidth * visibleItems, defaultAmount);
    };

    carousel.scrollBy({
      left: getScrollAmount(direction, 200),
      behavior: "smooth",
    });
  };

  const handleLeftArrowClick = () => {
    scrollCarousel("left");
  };

  const handleRightArrowClick = () => {
    scrollCarousel("right");
  };

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
          <div className={s["carousel-arrows"]}>
            <ArrowButton direction="left" onClick={handleLeftArrowClick} />
            <ArrowButton direction="right" onClick={handleRightArrowClick} />
          </div>
        </div>
      )}
      {cards.length === 0 && <p className={s["carousel-empty"]}>No cards available</p>}
      {cards.length > 0 && (
        <div
          className={s["carousel-items"]}
          id={header ? header.toLowerCase().replace(/\s+/g, "-") : "carousel-items"}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
              onClick={card.onClick}
              className={s["carousel-card"]}
              meta={card.meta}
              size={cardSize}
            />
          ))}
        </div>
      )}
    </div>
  );
};
