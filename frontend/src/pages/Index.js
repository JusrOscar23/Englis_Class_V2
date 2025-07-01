import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiPlay, FiBook, FiGamepad2, FiVideo, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Index = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bounce-in">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 logo-pulse">
              <span className="text-3xl font-bold text-blue-600">EJ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ¡Aprende Inglés con <span className="text-yellow-300">EnglisJump!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              La plataforma más divertida y efectiva para dominar el inglés. 
              Cursos interactivos, juegos educativos y videos exclusivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/curso-basico-principiantes"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift flex items-center justify-center space-x-2"
              >
                <FiPlay className="w-5 h-5" />
                <span>Comenzar Ahora</span>
              </Link>
              <Link
                to="/englishjump"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover-lift flex items-center justify-center space-x-2"
              >
                <FiBook className="w-5 h-5" />
                <span>Explorar Cursos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir EnglisJump?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra metodología única combina aprendizaje estructurado con diversión y tecnología
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl card-hover slide-in-left">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiBook className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cursos Estructurados</h3>
              <p className="text-gray-600">
                Desde principiante hasta avanzado, con lecciones progresivas y personalizadas
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl card-hover slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiGamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Juegos Interactivos</h3>
              <p className="text-gray-600">
                Aprende jugando con nuestros divertidos juegos educativos y desafíos
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl card-hover slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiVideo className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Videos Exclusivos</h3>
              <p className="text-gray-600">
                Contenido audiovisual de alta calidad para mejorar tu pronunciación y comprensión
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="scale-in">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <FiUsers className="w-10 h-10 mr-2" />
                10,000+
              </div>
              <p className="text-gray-600 text-lg">Estudiantes activos</p>
            </div>
            <div className="scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-purple-600 mb-2 flex items-center justify-center">
                <FiStar className="w-10 h-10 mr-2" />
                4.9/5
              </div>
              <p className="text-gray-600 text-lg">Calificación promedio</p>
            </div>
            <div className="scale-in" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                <FiTrendingUp className="w-10 h-10 mr-2" />
                95%
              </div>
              <p className="text-gray-600 text-lg">Tasa de éxito</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bounce-in">
            <h2 className="text-4xl font-bold mb-6">¡Comienza tu aventura en inglés hoy!</h2>
            <p className="text-xl mb-8">
              Únete a miles de estudiantes que ya están mejorando su inglés con EnglisJump
            </p>
            {!user ? (
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift inline-flex items-center space-x-2"
              >
                <FiPlay className="w-5 h-5" />
                <span>Registrarse Gratis</span>
              </Link>
            ) : (
              <Link
                to="/curso-basico-principiantes"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift inline-flex items-center space-x-2"
              >
                <FiBook className="w-5 h-5" />
                <span>Continuar Aprendiendo</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;