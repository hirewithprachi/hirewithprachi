import React, { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 60, loop = false }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, loop]);

  return <span>{displayed}</span>;
} 