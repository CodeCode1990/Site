import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const CardShelf = ({ cards }) => {
  const [flippedCard, setFlippedCard] = useState(null);
  const timersRef = useRef({}); // store timers

  // flip on click
  const flipCard = (index) => {
    if (flippedCard === index) {
      // already flipped → revert immediately
      setFlippedCard(null);
      clearTimeout(timersRef.current[index]);
    } else {
      // flip this card
      setFlippedCard(index);
      clearTimeout(timersRef.current[index]);

      // auto reset after 5s
      timersRef.current[index] = setTimeout(() => {
        setFlippedCard(null);
      }, 5000);
    }
  };

  // Hover tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = -((x - centerX) / centerX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const isFlipped = flippedCard === index;
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="relative w-full h-56 cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            {/* Outer tilt wrapper */}
            <div
              className="relative w-full h-full transition-transform duration-300"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => flipCard(index)}
            >
              {/* Inner: flipping container */}
              <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className={`absolute w-full h-full rounded-lg shadow-xl flex flex-col items-center justify-center 
                  bg-gradient-to-br ${card.colorClasses} border p-6`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Icon className={`w-10 h-10 ${card.iconColor} mb-3`} />
                  <div className="text-2xl font-bold text-white">{card.value}</div>
                  <div className="text-sm text-gray-200 font-mono uppercase tracking-wider mt-1">
                    {card.label}
                  </div>
                </div>

                {/* Back */}
                <div
                  className={`absolute w-full h-full rounded-lg shadow-xl flex flex-col items-center justify-center 
                  bg-gradient-to-br ${card.colorClasses} border p-6`}
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="text-lg font-bold text-white mb-3">
                    {card.label} Details
                  </h3>
                  <p className="text-gray-200 text-sm text-center leading-relaxed">
                    {card.details}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardShelf;