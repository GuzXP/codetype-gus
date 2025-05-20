
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Keyboard } from "lucide-react";
import LanguageSelector, { ProgrammingLanguage } from './LanguageSelector';
import TestResults from './TestResults';
import { codeSnippets } from '../data/codeSnippets';

interface CharacterState {
  char: string;
  state: 'untyped' | 'correct' | 'incorrect';
}

const TypingTest: React.FC = () => {
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');
  const [currentSnippet, setCurrentSnippet] = useState<string>('');
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds test
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const codeDisplayRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // Function to get a random snippet for the selected language
  const getRandomSnippet = useCallback((lang: ProgrammingLanguage): string => {
    const snippets = codeSnippets[lang];
    const randomIndex = Math.floor(Math.random() * snippets.length);
    return snippets[randomIndex];
  }, []);

  // Set up the test for the selected language
  const setupTest = useCallback(() => {
    const snippet = getRandomSnippet(language);
    setCurrentSnippet(snippet);
    
    const chars: CharacterState[] = snippet.split('').map(char => ({
      char,
      state: 'untyped'
    }));
    
    setCharacters(chars);
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setIsTestActive(false);
    setIsTestComplete(false);
    setIncorrectCount(0);
    setTimeRemaining(60);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [language, getRandomSnippet]);

  // Initialize the test
  useEffect(() => {
    setupTest();
  }, [setupTest]);

  // Start the test timer
  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    
    const now = Date.now();
    setStartTime(now);
    
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - now) / 1000);
      setElapsedTime(elapsed);
      
      const remaining = Math.max(0, 60 - elapsed);
      setTimeRemaining(remaining);
      
      if (remaining === 0) {
        finishTest();
      }
    }, 1000);
  }, []);

  // Scroll to the current character in view - improved to handle newlines better
  useEffect(() => {
    if (currentCharRef.current && codeDisplayRef.current) {
      const codeDisplay = codeDisplayRef.current;
      const currentChar = currentCharRef.current;
      
      // Get the bounding rectangles
      const containerRect = codeDisplay.getBoundingClientRect();
      const charRect = currentChar.getBoundingClientRect();
      
      // Check if the current char is outside the visible area
      if (
        charRect.bottom > containerRect.bottom ||
        charRect.top < containerRect.top
      ) {
        // Scroll to make the current character visible
        currentChar.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  // Handle key presses - improved to better handle whitespace and line breaks
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isTestActive && !isTestComplete) {
      setIsTestActive(true);
      startTimer();
    }
    
    if (isTestComplete || timeRemaining === 0) return;
    
    const key = e.key;
    
    // Ignore modifier keys
    if (
      e.ctrlKey || 
      e.altKey || 
      e.metaKey || 
      key === 'Control' || 
      key === 'Alt' || 
      key === 'Meta' || 
      key === 'Shift'
    ) {
      return;
    }
    
    // Prevent default to stop cursor movement
    e.preventDefault();
    
    if (currentIndex >= characters.length) return;
    
    const expectedChar = characters[currentIndex].char;
    
    // Special handling for newline characters - use Enter key instead of Space
    if (expectedChar === '\n') {
      if (key === 'Enter') {
        // Correct newline character
        const updatedChars = [...characters];
        updatedChars[currentIndex] = {
          ...updatedChars[currentIndex],
          state: 'correct'
        };
        setCharacters(updatedChars);
        setCurrentIndex(currentIndex + 1);
        
        // Check if test is complete
        if (currentIndex + 1 >= characters.length) {
          finishTest();
        }
      } else {
        // Incorrect key for newline
        if (characters[currentIndex].state !== 'incorrect') {
          const updatedChars = [...characters];
          updatedChars[currentIndex] = {
            ...updatedChars[currentIndex],
            state: 'incorrect'
          };
          setCharacters(updatedChars);
          setIncorrectCount(incorrectCount + 1);
        }
      }
      return;
    }
    
    // Handle regular characters and whitespace
    // For whitespace, only spaces will be matched exactly, tabs will be matched with space
    const isWhitespace = expectedChar === ' ' || expectedChar === '\t';
    const keyIsSpace = key === ' ';
    const correctWhitespace = isWhitespace && keyIsSpace;
    
    if (key === expectedChar || correctWhitespace) {
      // Correct character
      const updatedChars = [...characters];
      updatedChars[currentIndex] = {
        ...updatedChars[currentIndex],
        state: 'correct'
      };
      setCharacters(updatedChars);
      setCurrentIndex(currentIndex + 1);
      
      // Check if test is complete
      if (currentIndex + 1 >= characters.length) {
        finishTest();
      }
    } else {
      // Only mark as incorrect if we haven't already marked this character
      if (characters[currentIndex].state !== 'incorrect') {
        const updatedChars = [...characters];
        updatedChars[currentIndex] = {
          ...updatedChars[currentIndex],
          state: 'incorrect'
        };
        setCharacters(updatedChars);
        setIncorrectCount(incorrectCount + 1);
      }
      // We don't advance the currentIndex for incorrect characters
    }
  }, [characters, currentIndex, incorrectCount, isTestActive, isTestComplete, startTimer, timeRemaining]);

  // Focus input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Calculate results when test is complete
  const finishTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsTestComplete(true);
    setIsTestActive(false);
    setEndTime(Date.now());
    
    // Calculate results
    const totalTime = elapsedTime > 0 ? elapsedTime : 60;
    const totalCharacters = currentIndex;
    const totalWords = totalCharacters / 5; // Standard: 5 characters = 1 word
    const calculatedWpm = Math.round((totalWords / totalTime) * 60);
    
    const totalAttempts = currentIndex + incorrectCount;
    const calculatedAccuracy = totalAttempts > 0 
      ? Math.round((currentIndex / totalAttempts) * 100) 
      : 100;
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  }, [currentIndex, elapsedTime, incorrectCount]);

  // Focus input when clicking on the test area
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle language change
  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    setLanguage(lang);
    setupTest();
  };

  // Restart the test
  const handleRestart = () => {
    setupTest();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-10">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center">
          <Keyboard className="h-5 w-5 mr-2 text-primary" />
          <span className="text-lg font-bold">CodeType</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSelector
            selectedLanguage={language}
            onSelectLanguage={handleLanguageChange}
          />
          
          {isTestActive && (
            <div className="text-xl font-mono font-bold">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleRestart}
            disabled={isTestActive && !isTestComplete}
          >
            Reset
          </Button>
        </div>
      </div>

      {!isTestComplete ? (
        <Card className="w-full mb-6 border border-muted">
          <CardContent className="p-4">
            <div 
              ref={codeDisplayRef}
              className="font-mono text-sm sm:text-base leading-relaxed relative bg-code-bg p-4 rounded-lg overflow-hidden h-[240px] overflow-y-auto" 
              onClick={focusInput}
            >
              <div className="whitespace-pre-wrap">
                {characters.map((char, index) => {
                  // Add special handling for newline characters
                  if (char.char === '\n') {
                    return (
                      <React.Fragment key={index}>
                        <span
                          ref={index === currentIndex ? currentCharRef : undefined}
                          className={`char ${
                            char.state === 'correct' ? 'char-correct' : 
                            char.state === 'incorrect' ? 'char-incorrect' : ''
                          } ${index === currentIndex ? 'char-current' : ''}`}
                        >
                          ↵
                        </span>
                        <br />
                      </React.Fragment>
                    );
                  }
                  
                  return (
                    <span 
                      key={index}
                      ref={index === currentIndex ? currentCharRef : undefined}
                      className={`char ${
                        char.state === 'correct' ? 'char-correct' : 
                        char.state === 'incorrect' ? 'char-incorrect' : ''
                      } ${index === currentIndex ? 'char-current' : ''}`}
                    >
                      {char.char}
                    </span>
                  );
                })}
              </div>
              {/* Hidden input field to capture keyboard input */}
              <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute top-0 left-0 h-full w-full cursor-default"
                onKeyDown={handleKeyDown}
                autoComplete="off"
                aria-label="Typing Test Input"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <TestResults
          wpm={wpm}
          accuracy={accuracy}
          time={elapsedTime}
          onRestart={handleRestart}
        />
      )}
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        <p>Created by Bagus &middot; <a href="https://instagram.com/brmdhn_13" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Instagram: @brmdhn_13</a></p>
      </div>
    </div>
  );
};

export default TypingTest;
