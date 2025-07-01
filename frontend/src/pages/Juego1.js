import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiRefreshCw, FiHeart, FiStar, FiHome, FiTrophy } from 'react-icons/fi';

const Juego1 = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [gameData, setGameData] = useState({
    score: 0,
    lives: 3,
    level: 1,
    currentPair: null,
    selectedWord: null,
    matches: 0,
    gameComplete: false
  });

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Word pairs for the matching game
  const wordPairs = [
    { english: 'Hello', spanish: 'Hola', matched: false },
    { english: 'Goodbye', spanish: 'Adiós', matched: false },
    { english: 'Please', spanish: 'Por favor', matched: false },
    { english: 'Thank you', spanish: 'Gracias', matched: false },
    { english: 'Yes', spanish: 'Sí', matched: false },
    { english: 'No', spanish: 'No', matched: false },
    { english: 'Water', spanish: 'Agua', matched: false },
    { english: 'Food', spanish: 'Comida', matched: false },
    { english: 'House', spanish: 'Casa', matched: false },
    { english: 'Car', spanish: 'Carro', matched: false }
  ];

  const [words, setWords] = useState(wordPairs);
  const [englishWords, setEnglishWords] = useState([]);
  const [spanishWords, setSpanishWords] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledWords = [...wordPairs].sort(() => Math.random() - 0.5);
    const english = shuffledWords.map(pair => ({ ...pair, type: 'english' }));
    const spanish = shuffledWords.map(pair => ({ ...pair, type: 'spanish' }));
    
    setEnglishWords(english.sort(() => Math.random() - 0.5));
    setSpanishWords(spanish.sort(() => Math.random() - 0.5));
    setWords(shuffledWords);
  };

  const handleWordClick = (word, type) => {
    if (word.matched) return;

    if (!gameData.selectedWord) {
      setGameData(prev => ({
        ...prev,
        selectedWord: { ...word, type }
      }));
    } else {
      // Check if it's a match
      const isMatch = (
        (gameData.selectedWord.type === 'english' && type === 'spanish' && 
         gameData.selectedWord.english === word.english) ||
        (gameData.selectedWord.type === 'spanish' && type === 'english' && 
         gameData.selectedWord.spanish === word.spanish)
      );

      if (isMatch) {
        // Correct match
        const newMatches = gameData.matches + 1;
        const newScore = gameData.score + 100;

        // Update matched status
        setEnglishWords(prev => 
          prev.map(w => w.english === word.english ? { ...w, matched: true } : w)
        );
        setSpanishWords(prev => 
          prev.map(w => w.spanish === word.spanish ? { ...w, matched: true } : w)
        );

        setGameData(prev => ({
          ...prev,
          score: newScore,
          matches: newMatches,
          selectedWord: null,
          gameComplete: newMatches === wordPairs.length
        }));

        if (newMatches === wordPairs.length) {
          handleGameComplete(newScore);
        }
      } else {
        // Wrong match
        const newLives = gameData.lives - 1;
        setGameData(prev => ({
          ...prev,
          lives: newLives,
          selectedWord: null
        }));

        if (newLives === 0) {
          handleGameOver();
        }
      }
    }
  };

  const handleGameComplete = async (finalScore) => {
    if (user) {
      try {
        await axios.post(`${API_BASE_URL}/api/games/score`, {
          game_id: 'word-match',
          score: finalScore,
          level: 'beginner'
        });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const handleGameOver = () => {
    // Game over logic
    setTimeout(() => {
      resetGame();
    }, 2000);
  };

  const resetGame = () => {
    setGameData({
      score: 0,
      lives: 3,
      level: 1,
      currentPair: null,
      selectedWord: null,
      matches: 0,
      gameComplete: false
    });
    initializeGame();
  };

  const getWordButtonClass = (word, type) => {
    const baseClass = "p-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer";
    
    if (word.matched) {
      return `${baseClass} bg-green-100 text-green-800 border-2 border-green-300`;
    }
    
    if (gameData.selectedWord && 
        gameData.selectedWord.type === type && 
        ((type === 'english' && gameData.selectedWord.english === word.english) ||
         (type === 'spanish' && gameData.selectedWord.spanish === word.spanish))) {
      return `${baseClass} bg-blue-100 text-blue-800 border-2 border-blue-400 scale-105`;
    }
    
    if (type === 'english') {
      return `${baseClass} bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100`;
    } else {
      return `${baseClass} bg-purple-50 text-purple-700 border-2 border-purple-200 hover:bg-purple-100`;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 bounce-in">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center logo-pulse">
                <span className="text-2xl font-bold text-blue-600">EJ</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">🎯 Empareja Palabras</h1>
                <p className="text-blue-100">Conecta las palabras en inglés con su traducción</p>
              </div>
            </div>
            
            {/* Game Stats */}
            <div className="flex items-center space-x-6 text-center">
              <div>
                <FiStar className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
                <p className="text-sm">Puntos</p>
                <p className="text-xl font-bold">{gameData.score}</p>
              </div>
              <div>
                <FiHeart className="w-6 h-6 mx-auto mb-1 text-red-300" />
                <p className="text-sm">Vidas</p>
                <p className="text-xl font-bold">{gameData.lives}</p>
              </div>
              <div>
                <FiTrophy className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
                <p className="text-sm">Parejas</p>
                <p className="text-xl font-bold">{gameData.matches}/{wordPairs.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {gameData.gameComplete ? (
            /* Game Complete */
            <div className="text-center bounce-in">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Felicitaciones!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Has completado el juego con {gameData.score} puntos
                </p>
                <div className="space-y-4">
                  <button
                    onClick={resetGame}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiRefreshCw className="w-5 h-5" />
                    <span>Jugar de Nuevo</span>
                  </button>
                  <button
                    onClick={() => window.location.href = '/games'}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiHome className="w-5 h-5" />
                    <span>Volver a Juegos</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Game Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* English Words */}
              <div className="slide-in-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  🇺🇸 Inglés
                </h2>
                <div className="space-y-4">
                  {englishWords.map((word, index) => (
                    <button
                      key={`english-${index}`}
                      onClick={() => handleWordClick(word, 'english')}
                      className={getWordButtonClass(word, 'english')}
                      disabled={word.matched}
                    >
                      {word.english}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spanish Words */}
              <div className="slide-in-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  🇪🇸 Español
                </h2>
                <div className="space-y-4">
                  {spanishWords.map((word, index) => (
                    <button
                      key={`spanish-${index}`}
                      onClick={() => handleWordClick(word, 'spanish')}
                      className={getWordButtonClass(word, 'spanish')}
                      disabled={word.matched}
                    >
                      {word.spanish}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 text-center slide-up">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Instrucciones</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Haz clic en una palabra en inglés, luego en su traducción en español</p>
                <p>• Las parejas correctas se marcarán en verde</p>
                <p>• Tienes 3 vidas - ¡cuidado con los errores!</p>
                <p>• Empareja todas las palabras para completar el juego</p>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-8 text-center">
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 mx-auto hover-lift"
            >
              <FiRefreshCw className="w-5 h-5" />
              <span>Reiniciar Juego</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Juego1;