import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 60,
  deleteSpeed = 30,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delayBetweenWords);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typeSpeed);
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
          timeoutRef.current = setTimeout(handleTyping, delayBetweenWords);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, deleteSpeed);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          const nextIndex = (currentWordIndex + 1) % words.length;
          
          if (!loop && nextIndex === 0) {
            // If not looping and we've reached the end, stop
            return;
          }
          
          setCurrentWordIndex(nextIndex);
          timeoutRef.current = setTimeout(handleTyping, 500);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typeSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  return currentText;
};
