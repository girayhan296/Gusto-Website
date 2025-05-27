import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const accessToken = query.get('access_token');

  React.useEffect(() => {
    if (accessToken) {
      console.log('access_token:', accessToken);
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!password || !confirm) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    if (!accessToken) {
      setError('Geçersiz veya eksik bağlantı.');
      return;
    }
    try {
      // 1. access_token ile oturumu ayarla
      const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
      if (sessionError) {
        setError('Oturum başlatılamadı: ' + sessionError.message);
        return;
      }
      // 2. Şifreyi güncelle
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError('Şifre güncellenemedi: ' + updateError.message);
      } else {
        setMessage('Şifreniz başarıyla güncellendi!');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 32, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>Yeni Şifre Belirle</h2>
        <p style={{ textAlign: 'center', marginBottom: 24, color: '#444' }}>
          Lütfen yeni şifrenizi girin ve onaylayın.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Yeni şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box', height: 48 }}
          />
          <input
            type="password"
            placeholder="Yeni şifre (tekrar)"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 20, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box', height: 48 }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: 12, borderRadius: 8, background: '#111', color: '#fff', fontWeight: 'bold', fontSize: 16, border: 'none', cursor: 'pointer', height: 48 }}
          >
            Şifreyi Güncelle
          </button>
        </form>
        {message && <div style={{ color: 'green', marginTop: 16, textAlign: 'center', fontWeight: 'bold' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
      </div>
    </div>
  );
};

export default ResetPassword; 