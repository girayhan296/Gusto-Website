import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function getTokensFromHash() {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  return {
    access_token: hashParams.get('access_token'),
    refresh_token: hashParams.get('refresh_token'),
  };
}

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) return 'Şifre en az 8 karakter uzunluğunda olmalıdır.';
  if (!hasUpperCase) return 'Şifre en az bir büyük harf içermelidir.';
  if (!hasLowerCase) return 'Şifre en az bir küçük harf içermelidir.';
  if (!hasNumbers) return 'Şifre en az bir rakam içermelidir.';
  if (!hasSpecialChar) return 'Şifre en az bir özel karakter içermelidir.';
  return null;
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const { access_token, refresh_token } = getTokensFromHash();

    if (!access_token || !refresh_token) {
      setError('Geçersiz bağlantı. Lütfen şifre sıfırlama e-postasındaki bağlantıyı kullanın.');
      return;
    }

    const restoreSession = async () => {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (sessionError) {
        console.error('Oturum başlatılamadı:', sessionError);
        setError('Oturum başlatılamadı. Lütfen bağlantıyı tekrar kontrol edin.');
      }
    };

    restoreSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    if (!password || !confirm) {
      setError('Lütfen tüm alanları doldurun.');
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      setIsLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        console.error('Şifre güncelleme hatası:', updateError);
        setError('Şifre güncellenemedi. Lütfen tekrar deneyin.');
      } else {
        setMessage('Şifreniz başarıyla güncellendi!');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (err) {
      console.error('Genel hata:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }

    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 32, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>Yeni Şifre Belirle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Yeni şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, height: 48 }}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Yeni şifre (tekrar)"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 20, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, height: 48 }}
            disabled={isLoading}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              background: isLoading ? '#666' : '#111',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              height: 48
            }}
            disabled={isLoading}
          >
            {isLoading ? 'İşleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
        {message && <div style={{ color: 'green', marginTop: 16, textAlign: 'center', fontWeight: 'bold' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
      </div>
    </div>
  );
};

export default ResetPassword;
