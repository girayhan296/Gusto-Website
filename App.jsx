import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import ResetRequest from './pages/ResetRequest';
import ResetPassword from './pages/ResetPassword';
import EmailConfirm from './pages/EmailConfirm';

function Navigation() {
  const location = useLocation();
  // Navigasyon sadece /email-confirm ve /reset-password dışında gösterilsin
  if (location.pathname === '/email-confirm' || location.pathname === '/reset-password') return null;
  return (
    <nav style={{textAlign:'center',margin:'2rem'}}>
      <Link to="/">Ana Sayfa</Link> |{' '}
      <Link to="/signup">Kayıt Ol</Link> |{' '}
      <Link to="/reset">Şifre Sıfırla</Link> |{' '}
      <Link to="/email-confirm">E-posta Doğrula</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<div style={{textAlign:'center',marginTop:'2rem'}}><h2>Hoşgeldiniz</h2><p>Lütfen bir işlem seçin.</p></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
