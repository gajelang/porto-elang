"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
};

interface CardStackProps {
  items: Card[];
  offset?: number;       // Vertical offset between stacked cards
  scaleFactor?: number;  // How much each subsequent card scales down
}

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: CardStackProps) => {
  const [cards, setCards] = useState<Card[]>(items);

  // Automatically flip the last card to the front every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!); // move last card to front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    /**
     * - Maintains the original sizing for desktop (md:h-60 md:w-96)
     * - Uses max-w-full to prevent horizontal overflow on small screens
     */
    <div className="relative h-52 w-72 max-w-full md:h-60 md:w-96">
      {cards.map((card, index) => {
        // Determine if this card is the front/top card
        const isFront = index === 0;

        return (
          <motion.div
            key={card.id}
            className={`
              absolute w-full h-full rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border 
              flex flex-col justify-between
              ${
                isFront
                  ? " bg-neutral-900 text-white border-neutral-200"
                  : "bg-neutral-900 text-neutral-100 border-neutral-700"
              }
            `}
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
            }}
          >
            {/* Icon, Title & Subtitle */}
            <div className="flex flex-col items-center gap-2 text-center">
              {card.icon}
              <h2 className="text-2xl sm:text-xl md:text-4xl font-bold">
                {card.title}
              </h2>
              <h3 className="text-sm sm:text-base md:text-lg">
                {card.subtitle}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-sm text-center">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
