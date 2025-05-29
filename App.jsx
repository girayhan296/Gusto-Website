import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import ResetRequest from './pages/ResetRequest';
import ResetPassword from './pages/ResetPassword';
import EmailConfirm from './pages/EmailConfirm';
import PrivacyPolicy from './pages/PrivacyPolicy';

function Navigation() {
  const location = useLocation();
  // Navigasyon sadece /email-confirm, /reset-password ve ana sayfa dışında gösterilsin
  if (['/email-confirm', '/reset-password', '/', '/privacy-policy'].includes(location.pathname)) return null;
  return (
    <nav style={{textAlign:'center',margin:'2rem'}}>
      <Link to="/">Ana Sayfa</Link> |{' '}
      <Link to="/signup">Kayıt Ol</Link> |{' '}
      <Link to="/reset">Şifre Sıfırla</Link> |{' '}
      <Link to="/email-confirm">E-posta Doğrula</Link>
    </nav>
  );
}

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(180deg, #fff 60%, #f4f4f4 100%)',
      padding: 0
    }}>
      {/* Ortada mesajlar */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#111',
        marginTop: 0
      }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.8rem', marginBottom: 32, color: '#111' }}>Hoş Geldiniz</h1>
        <p style={{ fontSize: '1.6rem', color: '#111', marginBottom: 0 }}>Şu an bu ekran <span style={{ fontWeight: 'bold', color: '#111' }}>bakım durumundadır</span>.</p>
      </div>
      {/* Altta iki logo */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 60, marginBottom: 40, minHeight: 72 }}>
        <img src="/flock-logo.png" alt="Flock Logo" style={{ height: 72 }} />
        <img src="/gusto-logo.png" alt="Gusto Logo" style={{ height: 72 }} />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
