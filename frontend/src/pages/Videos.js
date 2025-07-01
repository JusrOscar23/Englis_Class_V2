import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiVideo, FiPlay, FiClock, FiStar, FiEye, FiBookmark } from 'react-icons/fi';

const Videos = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    setIsVisible(true);
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/videos`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample video data with embedded YouTube videos
  const videoLibrary = [
    {
      id: 'basic-greetings',
      title: 'Saludos Básicos en Inglés',
      description: 'Aprende los saludos más comunes y cómo presentarte en inglés',
      thumbnail: '🤝',
      level: 'Principiante',
      duration: '8:45',
      views: '15.2K',
      rating: '4.9',
      videoUrl: 'https://www.youtube.com/embed/3Ek2xUXGFs0',
      category: 'Conversación'
    },
    {
      id: 'english-pronunciation',
      title: 'Pronunciación del Inglés',
      description: 'Mejora tu pronunciación con ejercicios prácticos',
      thumbnail: '🗣️',
      level: 'Principiante',
      duration: '12:30',
      views: '23.8K',
      rating: '4.8',
      videoUrl: 'https://www.youtube.com/embed/duncJqWpnso',
      category: 'Pronunciación'
    },
    {
      id: 'common-phrases',
      title: 'Frases Comunes en Inglés',
      description: 'Las frases más útiles para conversaciones diarias',
      thumbnail: '💬',
      level: 'Principiante',
      duration: '10:15',
      views: '31.5K',
      rating: '4.9',
      videoUrl: 'https://www.youtube.com/embed/sJ-eiRDavNE',
      category: 'Conversación'
    },
    {
      id: 'grammar-basics',
      title: 'Gramática Básica del Inglés',
      description: 'Fundamentos de gramática explicados de forma simple',
      thumbnail: '📝',
      level: 'Principiante',
      duration: '15:20',
      views: '18.7K',
      rating: '4.7',
      videoUrl: 'https://www.youtube.com/embed/bBgdKrqdAkU',
      category: 'Gramática'
    },
    {
      id: 'numbers-colors',
      title: 'Números y Colores en Inglés',
      description: 'Aprende números del 1 al 100 y los colores básicos',
      thumbnail: '🔢',
      level: 'Principiante',
      duration: '9:10',
      views: '28.3K',
      rating: '4.8',
      videoUrl: 'https://www.youtube.com/embed/Av2TvF9mJpg',
      category: 'Vocabulario'
    },
    {
      id: 'listening-practice',
      title: 'Práctica de Comprensión Auditiva',
      description: 'Ejercicios para mejorar tu comprensión del inglés hablado',
      thumbnail: '👂',
      level: 'Intermedio',
      duration: '20:45',
      views: '12.1K',
      rating: '4.9',
      videoUrl: 'https://www.youtube.com/embed/2dY6g7NaZAU',
      category: 'Comprensión'
    }
  ];

  const categories = ['Todos', 'Conversación', 'Pronunciación', 'Gramática', 'Vocabulario', 'Comprensión'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredVideos = selectedCategory === 'Todos' 
    ? videoLibrary 
    : videoLibrary.filter(video => video.category === selectedCategory);

  return (
    <div className={`min-h-screen ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bounce-in">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 logo-pulse">
              <span className="text-3xl font-bold text-red-600">EJ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              📺 Biblioteca de <span className="text-yellow-300">Videos</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Aprende inglés con nuestros videos educativos. Desde pronunciación básica 
              hasta conversaciones avanzadas, todo explicado paso a paso.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiVideo className="w-4 h-4 mr-2" />
                50+ Videos
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiClock className="w-4 h-4 mr-2" />
                HD Quality
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiEye className="w-4 h-4 mr-2" />
                100K+ Views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="aspect-video mb-4">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">{selectedVideo.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiClock className="w-4 h-4 mr-1" />
                    {selectedVideo.duration}
                  </span>
                  <span className="flex items-center">
                    <FiEye className="w-4 h-4 mr-1" />
                    {selectedVideo.views} views
                  </span>
                  <span className="flex items-center">
                    <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
                    {selectedVideo.rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 slide-up">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'Todos' ? 'Todos los Videos' : `Videos de ${selectedCategory}`}
            </h2>
            <p className="text-xl text-gray-600">
              {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} disponible{filteredVideos.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <div 
                key={video.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover ${
                  index % 3 === 0 ? 'slide-in-left' : index % 3 === 1 ? 'slide-up' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-red-400 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">{video.thumbnail}</span>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="bg-white text-gray-900 rounded-full p-4 hover:scale-110 transition-transform duration-300"
                    >
                      <FiPlay className="w-8 h-8" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      {video.level}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {video.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 mr-1" />
                      {video.views}
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
                      {video.rating}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <FiPlay className="w-4 h-4" />
                      <span>Ver Video</span>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors duration-300">
                      <FiBookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">💡 Consejos para Aprender con Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Practica Activa</h3>
                <p className="text-gray-600">
                  Pausa el video y repite las frases en voz alta para mejorar tu pronunciación
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Toma Notas</h3>
                <p className="text-gray-600">
                  Escribe palabras nuevas y frases importantes para revisarlas después
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Repite Videos</h3>
                <p className="text-gray-600">
                  Ve los videos varias veces para reforzar el aprendizaje
                </p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6">
                <div className="text-3xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Velocidad Adecuada</h3>
                <p className="text-gray-600">
                  Ajusta la velocidad del video si necesitas más tiempo para entender
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;