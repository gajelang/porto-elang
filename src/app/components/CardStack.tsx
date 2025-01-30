"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: NodeJS.Timeout; // Use NodeJS.Timeout for Node.js environments

type Card = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white dark:bg-black h-60 w-60 md:h-60 md:w-96 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          {/* Icon and Title */}
          <div className="flex flex-col items-center gap-2">
            {card.icon}
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              {card.title}
            </h2>
            <h3 className="text-lg text-neutral-600 dark:text-neutral-400">
              {card.subtitle}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};