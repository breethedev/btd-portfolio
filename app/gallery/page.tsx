"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import s from "./gallery.module.css";
import cardsData from "@/app/data/cards.json"; // Assuming cards.json is in the same directory

type Card = {
  name: string;
  image: string;
  id: number; // unique id for each card instance
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const cards = cardsData.cards;
    // Initialize cards with duplicates
    const initialCards = cards.flatMap((card) => [
      { ...card, id: Math.random() }, // Assign a unique id to each card instance
      { ...card, id: Math.random() },
    ]);
    setCards(shuffle(initialCards));
  }, []);

  function handleFlip(idx: number) {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    setFlipped((prev) => [...prev, idx]);
    setScore((s) => s + 1);
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].name === cards[second].name) {
        setMatched((m) => [...m, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards]);

  return (
    <div>
      <div className={s.score}>Score: {score}</div>
      <div className={s["cards-container"]}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={card.id}
              className={`${s.card} ${isFlipped ? s.flipped : ""}`}
              onClick={() => handleFlip(idx)}
            >
              <div
                className={s.front}
                style={{ backgroundColor: isFlipped ? "transparent" : "var(--btd-color-primary)" }}
              >
                <Image src={card.image} alt={card.name} width={100} height={(100 / 2) * 3} />
              </div>

              <div className={s.back}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <main className={s.page}>
      <h1>Gallery</h1>
      <MemoryGame />
    </main>
  );
}
