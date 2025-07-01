import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import EnglisJump from './pages/EnglisJump';
import CursoBasicoPrincipiantes from './pages/CursoBasicoPrincipiantes';
import Games from './pages/Games';
import Juego1 from './pages/Juego1';
import Videos from './pages/Videos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/englishjump" element={<EnglisJump />} />
            <Route path="/curso-basico-principiantes" element={<CursoBasicoPrincipiantes />} />
            <Route path="/games" element={<Games />} />
            <Route path="/juego1" element={<Juego1 />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;