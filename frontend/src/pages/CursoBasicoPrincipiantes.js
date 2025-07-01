import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiBook, FiPlay, FiCheckCircle, FiClock, FiStar, FiUsers } from 'react-icons/fi';

const CursoBasicoPrincipiantes = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    setIsVisible(true);
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/lessons`);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!user) return;
    
    try {
      await axios.post(`${API_BASE_URL}/api/progress/lesson`, {
        lesson_id: lessonId,
        completed: true,
        score: 100
      });
      // Refresh lessons or update state
      fetchLessons();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bounce-in">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 logo-pulse">
              <span className="text-3xl font-bold text-green-600">EJ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Curso Básico para Principiantes
            </h1>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              ¡Comienza tu aventura en el inglés! Este curso está diseñado especialmente 
              para personas que nunca han estudiado inglés antes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiClock className="w-4 h-4 mr-2" />
                4 semanas
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiBook className="w-4 h-4 mr-2" />
                12 lecciones
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiUsers className="w-4 h-4 mr-2" />
                2,500+ estudiantes
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <FiStar className="w-4 h-4 mr-2" />
                4.9/5 rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center">
              <div className="loading-spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando lecciones...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lessons List */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 slide-up">Lecciones del Curso</h2>
                <div className="space-y-6">
                  {lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden card-hover ${
                        index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                      }`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{lesson.title}</h3>
                                <p className="text-sm text-gray-500 capitalize">{lesson.level}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{lesson.description}</p>
                            
                            {/* Vocabulary Preview */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Vocabulario:</h4>
                              <div className="flex flex-wrap gap-2">
                                {lesson.content.vocabulary.slice(0, 5).map((word, idx) => (
                                  <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                    {word}
                                  </span>
                                ))}
                                {lesson.content.vocabulary.length > 5 && (
                                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                    +{lesson.content.vocabulary.length - 5} más
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <button
                            onClick={() => setSelectedLesson(lesson)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                          >
                            <FiPlay className="w-4 h-4" />
                            <span>Ver Lección</span>
                          </button>
                          
                          {user && (
                            <button
                              onClick={() => markLessonComplete(lesson.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                              <span>Completar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson Detail Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {selectedLesson ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 scale-in">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedLesson.title}</h3>
                      <p className="text-gray-600 mb-6">{selectedLesson.description}</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Vocabulario:</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedLesson.content.vocabulary.map((word, idx) => (
                              <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                                <span className="font-medium text-blue-800">{word}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Frases de Ejemplo:</h4>
                          <div className="space-y-3">
                            {selectedLesson.content.phrases.map((phrase, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-900">{phrase.english}</p>
                                <p className="text-gray-600 text-sm mt-1">{phrase.spanish}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Selecciona una lección</h3>
                      <p className="text-gray-600">
                        Haz clic en "Ver Lección" para ver el contenido detallado
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Progress Section */}
      {user && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu Progreso</h2>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {Object.keys(user.progress || {}).length}
                    </div>
                    <p className="text-gray-600">Lecciones Completadas</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round((Object.keys(user.progress || {}).length / lessons.length) * 100) || 0}%
                    </div>
                    <p className="text-gray-600">Progreso del Curso</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2 capitalize">
                      {user.level}
                    </div>
                    <p className="text-gray-600">Nivel Actual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CursoBasicoPrincipiantes;