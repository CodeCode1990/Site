// src/components/TextType.jsx
import React, { useState, useEffect } from 'react';

const TextType = ({
  text = ["Default text"],
  typingSpeed = 80,
  pauseDuration = 1400,
  showCursor = true,
  cursorCharacter = "|",
  className = ""
}) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = text[index % text.length];

      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentFullText.length) {
          setCurrentText(prev => prev + currentFullText.charAt(charIndex));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          setCurrentText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIndex(prev => (prev + 1) % text.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? typingSpeed / 2.5 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, text, typingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && <span className="animate-pulse">{cursorCharacter}</span>}
    </span>
  );
};

export default TextType;