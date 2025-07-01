import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiBook, FiClock, FiUsers, FiStar, FiPlay, FiCheckCircle } from 'react-icons/fi';

const EnglisJump = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const courses = [
    {
      id: 'beginner',
      title: 'Curso Básico para Principiantes',
      description: 'Aprende los fundamentos del inglés desde cero',
      level: 'Principiante',
      duration: '4 semanas',
      students: '2,500+',
      rating: '4.9',
      image: '🎯',
      features: ['Vocabulario básico', 'Gramática fundamental', 'Conversaciones simples', 'Pronunciación'],
      link: '/curso-basico-principiantes'
    },
    {
      id: 'intermediate',
      title: 'Curso Intermedio',
      description: 'Perfecciona tu inglés con lecciones más avanzadas',
      level: 'Intermedio',
      duration: '6 semanas',
      students: '1,800+',
      rating: '4.8',
      image: '📚',
      features: ['Gramática avanzada', 'Vocabulario ampliado', 'Expresiones idiomáticas', 'Escritura'],
      link: '#'
    },
    {
      id: 'advanced',
      title: 'Curso Avanzado',
      description: 'Domina el inglés como un nativo',
      level: 'Avanzado',
      duration: '8 semanas',
      students: '950+',
      rating: '4.9',
      image: '👑',
      features: ['Inglés profesional', 'Debates y discusiones', 'Literatura', 'Preparación para exámenes'],
      link: '#'
    }
  ];

  const features = [
    {
      icon: '🎮',
      title: 'Gamificación',
      description: 'Aprende jugando con nuestro sistema de recompensas y logros'
    },
    {
      icon: '📱',
      title: 'Multiplataforma',
      description: 'Accede desde cualquier dispositivo, en cualquier momento'
    },
    {
      icon: '👥',
      title: 'Comunidad',
      description: 'Únete a nuestra comunidad de estudiantes y practica con otros'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Sigue tu progreso con estadísticas detalladas y personalizadas'
    }
  ];

  return (
    <div className={`min-h-screen ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bounce-in">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 logo-pulse">
              <span className="text-4xl font-bold text-indigo-600">EJ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bienvenido a <span className="text-yellow-300">EnglisJump</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              La plataforma más completa para aprender inglés. Desde principiante hasta avanzado, 
              te acompañamos en cada paso de tu journey hacia la fluidez.
            </p>
            {user && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto mb-8">
                <p className="text-lg">¡Hola, {user.name}!</p>
                <p className="text-sm opacity-90">Nivel actual: <span className="font-semibold capitalize">{user.level}</span></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Cursos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el curso perfecto para tu nivel y objetivos de aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover ${
                  index === 0 ? 'slide-in-left' : index === 1 ? 'slide-up' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="p-8">
                  <div className="text-6xl mb-4 text-center">{course.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiBook className="w-4 h-4 mr-1" />
                      {course.level}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <FiStar className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-yellow-600 font-semibold">{course.rating}</span>
                    <span className="text-gray-500 ml-1">/5</span>
                  </div>

                  <div className="space-y-2 mb-8">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={course.link}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover-lift"
                  >
                    <FiPlay className="w-5 h-5" />
                    <span>Comenzar Curso</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué nos hace únicos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las características que hacen de EnglisJump la mejor opción para aprender inglés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-white rounded-xl shadow-md card-hover ${
                  index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bounce-in">
            <h2 className="text-4xl font-bold mb-6">¿Listo para dar el salto?</h2>
            <p className="text-xl mb-8">
              Únete a EnglisJump y transforma tu forma de aprender inglés
            </p>
            {!user ? (
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift inline-flex items-center space-x-2"
              >
                <FiPlay className="w-5 h-5" />
                <span>Comenzar Gratis</span>
              </Link>
            ) : (
              <Link
                to="/curso-basico-principiantes"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 btn-pulse hover-lift inline-flex items-center space-x-2"
              >
                <FiBook className="w-5 h-5" />
                <span>Ir a Mis Cursos</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnglisJump;