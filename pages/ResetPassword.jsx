import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

function getAccessToken(location) {
  // Query string'den
  const query = new URLSearchParams(location.search);
  let access_token = query.get('access_token');
  // Hash'ten
  if (!access_token && location.hash) {
    const hashParams = new URLSearchParams(location.hash.replace(/^#/, ''));
    access_token = hashParams.get('access_token');
  }
  return access_token;
}

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const access_token = getAccessToken(location);

  useEffect(() => {
    if (access_token) {
      console.log('access_token:', access_token);
    }
  }, [access_token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!password || !confirm) {
      setError('Lütfen tüm alanları doldurun.');
      console.warn('Eksik alan');
      return;
    }
    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      console.warn('Şifreler eşleşmiyor');
      return;
    }
    if (!access_token) {
      setError('Geçersiz veya eksik bağlantı.');
      console.error('Token eksik:', { access_token });
      return;
    }
    try {
      console.log('setSession başlatılıyor:', { access_token });
      const { error: sessionError } = await supabase.auth.setSession({ access_token, refresh_token: '' });
      if (sessionError) {
        setError('Oturum başlatılamadı: ' + sessionError.message);
        console.error('setSession error:', sessionError);
        return;
      }
      console.log('setSession başarılı, updateUser çağrılıyor');
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError('Şifre güncellenemedi: ' + updateError.message);
        console.error('updateUser error:', updateError);
      } else {
        setMessage('Şifreniz başarıyla güncellendi!');
        console.log('Şifre başarıyla güncellendi!');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
      console.error('Genel hata:', err);
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