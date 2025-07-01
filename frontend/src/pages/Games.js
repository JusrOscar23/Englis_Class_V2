import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiGamepad2, FiPlay, FiTrophy, FiStar, FiClock, FiUsers } from 'react-icons/fi';

const Games = () => {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    setIsVisible(true);
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/games`);
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const gameCards = [
    {
      id: 'word-match',
      title: 'Empareja Palabras',
      description: 'Conecta palabras en inglés con sus traducciones en español',
      image: '🎯',
      difficulty: 'Fácil',
      time: '5-10 min',
      players: '1,200+',
      rating: '4.8',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'grammar-quiz',
      title: 'Quiz de Gramática',
      description: 'Pon a prueba tus conocimientos de gramática inglesa',
      image: '📝',
      difficulty: 'Intermedio',
      time: '10-15 min',
      players: '800+',
      rating: '4.7',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'pronunciation',
      title: 'Pronunciación',
      description: 'Mejora tu pronunciación con ejercicios interactivos',
      image: '🎤',
      difficulty: 'Fácil',
      time: '3-5 min',
      players: '1,500+',
      rating: '4.9',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'listening',
      title: 'Comprensión Auditiva',
      description: 'Escucha y responde preguntas sobre conversaciones',
      image: '👂',
      difficulty: 'Intermedio',
      time: '8-12 min',
      players: '600+',
      rating: '4.6',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 'vocabulary',
      title: 'Construcción de Vocabulario',
      description: 'Aprende nuevas palabras jugando',
      image: '📚',
      difficulty: 'Fácil',
      time: '5-8 min',
      players: '2,000+',
      rating: '4.8',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'conversation',
      title: 'Simulador de Conversación',
      description: 'Practica conversaciones en situaciones reales',
      image: '💬',
      difficulty: 'Avanzado',
      time: '15-20 min',
      players: '400+',
      rating: '4.9',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  const achievements = [
    { title: 'Primera Victoria', description: 'Gana tu primer juego', icon: '🏆' },
    { title: 'Racha de 5', description: 'Gana 5 juegos seguidos', icon: '🔥' },
    { title: 'Maestro del Vocabulario', description: 'Completa 50 palabras', icon: '📖' },
    { title: 'Perfeccionista', description: 'Obtén 100% en un juego', icon: '⭐' }
  ];

  return (
    <div className={`min-h-screen ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bounce-in">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 logo-pulse">
              <span className="text-3xl font-bold text-purple-600">EJ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🎮 Zona de <span className="text-yellow-300">Juegos</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              ¡Aprende inglés jugando! Mejora tu vocabulario, gramática y pronunciación 
              con nuestros juegos educativos interactivos.
            </p>
            {user && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto mb-8">
                <p className="text-lg">¡Hola, {user.name}!</p>
                <p className="text-sm opacity-90">¿Listo para jugar y aprender?</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Juegos Disponibles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada juego está diseñado para mejorar una habilidad específica del inglés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameCards.map((game, index) => (
              <div 
                key={game.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover ${
                  index % 3 === 0 ? 'slide-in-left' : index % 3 === 1 ? 'slide-up' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                  <span className="text-6xl">{game.image}</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{game.title}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiGamepad2 className="w-4 h-4 mr-1" />
                      {game.difficulty}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {game.time}
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="w-4 h-4 mr-1" />
                      {game.players}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <FiStar className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-yellow-600 font-semibold">{game.rating}</span>
                      <span className="text-gray-500 ml-1">/5</span>
                    </div>
                  </div>

                  <Link
                    to={game.id === 'word-match' ? '/juego1' : '#'}
                    className={`w-full bg-gradient-to-r ${game.color} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover-lift ${
                      game.id !== 'word-match' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={game.id !== 'word-match' ? (e) => e.preventDefault() : undefined}
                  >
                    <FiPlay className="w-5 h-5" />
                    <span>{game.id === 'word-match' ? 'Jugar Ahora' : 'Próximamente'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 Logros y Recompensas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desbloquea logros mientras juegas y mejoras tu inglés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 text-center card-hover ${
                  index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {user && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Tus Estadísticas de Juego</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
                  <FiTrophy className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                  <p className="text-gray-600">Juegos Ganados</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
                  <FiStar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                  <p className="text-gray-600">Puntuación Total</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
                  <FiGamepad2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                  <p className="text-gray-600">Logros Desbloqueados</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bounce-in">
            <h2 className="text-4xl font-bold mb-6">¡Comienza a Jugar!</h2>
            <p className="text-xl mb-8">
              Sumérgete en el mundo de los juegos educativos y mejora tu inglés de forma divertida
            </p>
            <Link
              to="/juego1"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift inline-flex items-center space-x-2"
            >
              <FiPlay className="w-5 h-5" />
              <span>Jugar Primer Juego</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;