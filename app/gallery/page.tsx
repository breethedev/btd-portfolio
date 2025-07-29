"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SECTIONS } from "@/app/constants";
import { Dialog, VisuallyHidden, ToggleGroup } from "radix-ui";
import { X as CloseIcon, Gamepad2, Image as ImageIcon } from "lucide-react";
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

  function restartGame() {
    setFlipped([]);
    setMatched([]);
    setScore(0);
    const cards = cardsData.cards;
    const initialCards = cards.flatMap((card) => [
      { ...card, id: Math.random() }, // Assign a unique id to each card instance
      { ...card, id: Math.random() },
    ]);
    setCards(shuffle(initialCards));
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
    <div className={s["memory-game"]}>
      <div className={s["game-header"]}>
        <div className={s.score}>Score: {score}</div>
        <button className={s.restart} onClick={restartGame}>
          Restart Game
        </button>
      </div>
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

function GalleryWall() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  const handleClosePhotoBox = () => {
    setSelectedImage(null);
  };

  return (
    <div className={s["gallery-wall"]}>
      {cardsData.cards.map((card) => (
        <>
          <div
            key={card.id}
            className={s["gallery-card"]}
            onClick={() => handleImageClick(card.image)}
          >
            <Image
              src={card.image}
              alt={card.name}
              fill
              quality={100}
              style={{ objectFit: "cover" }}
            />
          </div>
          <PhotoBox
            image={card.image}
            open={card.image === selectedImage}
            onClose={handleClosePhotoBox}
          />
        </>
      ))}
    </div>
  );
}

function PhotoBox({ image, open, onClose }: { image: string; open: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={s["photo-overlay"]} />
        <Dialog.Content className={s["photo-content"]}>
          <VisuallyHidden.Root>
            <Dialog.Title>Photo Viewer</Dialog.Title>
            <Dialog.Description>Click to close the photo viewer</Dialog.Description>
          </VisuallyHidden.Root>
          <div className={s["photo-container"]}>
            <Dialog.Close className={s["photo-close"]}>
              <CloseIcon size={24} />
            </Dialog.Close>
            <Image src={image} alt="Photo" width={400} height={(400 / 2) * 3} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Gallery() {
  const [showWall, setShowWall] = useState(false);

  const DESCRIPTIONS = {
    GALLERY: "Before I was an engineer, I was a photographer. Here are some of my favorite shots.",
    MEMORY_GAME: "One of my favorite games to play with my daughter. Enjoy!",
  };

  return (
    <div className={s.page}>
      <div>
        <div className={s["gallery-header"]}>
          <h1 className={s["gallery-title"]}>{SECTIONS.GALLERY.title.toUpperCase()}</h1>
          <ToggleGroup.Root
            className={s["gallery-toggle"]}
            type="single"
            value={showWall ? "wall" : "game"}
          >
            <ToggleGroup.Item value="wall" className={s.toggle} onClick={() => setShowWall(true)}>
              <ImageIcon size={24} />
            </ToggleGroup.Item>
            <ToggleGroup.Item value="game" className={s.toggle} onClick={() => setShowWall(false)}>
              <Gamepad2 size={24} />
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <p className={s.description}>
          {showWall ? DESCRIPTIONS.GALLERY : DESCRIPTIONS.MEMORY_GAME}
        </p>
      </div>
      {showWall ? <GalleryWall /> : <MemoryGame />}
    </div>
  );
}
