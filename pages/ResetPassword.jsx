import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function getAccessToken(location) {
  const query = new URLSearchParams(location.search);
  let access_token = query.get('access_token');
  if (!access_token && location.hash) {
    const hashParams = new URLSearchParams(location.hash.replace(/^#/, ''));
    access_token = hashParams.get('access_token');
  }
  return access_token;
}

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return 'Şifre en az 8 karakter uzunluğunda olmalıdır.';
  }
  if (!hasUpperCase) {
    return 'Şifre en az bir büyük harf içermelidir.';
  }
  if (!hasLowerCase) {
    return 'Şifre en az bir küçük harf içermelidir.';
  }
  if (!hasNumbers) {
    return 'Şifre en az bir rakam içermelidir.';
  }
  if (!hasSpecialChar) {
    return 'Şifre en az bir özel karakter içermelidir.';
  }
  return null;
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const access_token = getAccessToken(location);

  useEffect(() => {
    if (!access_token) {
      setError('Geçersiz veya eksik bağlantı.');
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [access_token, navigate]);

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
      // Doğrudan şifre güncelleme işlemini deneyelim
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
        options: {
          data: {
            email_confirm: true
          }
        }
      });

      if (updateError) {
        console.error('Şifre güncelleme hatası:', updateError);
        
        // Eğer oturum hatası varsa, yeni bir oturum başlatmayı deneyelim
        if (updateError.message.includes('Auth session missing')) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token: null
          });

          if (sessionError) {
            setError('Oturum başlatılamadı. Lütfen bağlantıyı tekrar deneyin.');
            setIsLoading(false);
            return;
          }

          // Tekrar şifre güncellemeyi deneyelim
          const { error: retryError } = await supabase.auth.updateUser({
            password: password,
            options: {
              data: {
                email_confirm: true
              }
            }
          });

          if (retryError) {
            setError('Şifre güncellenemedi. Lütfen daha sonra tekrar deneyin.');
            setIsLoading(false);
            return;
          }
        } else {
          setError('Şifre güncellenemedi. Lütfen daha sonra tekrar deneyin.');
          setIsLoading(false);
          return;
        }
      }

      setMessage('Şifreniz başarıyla güncellendi!');
      setIsLoading(false);

    } catch (err) {
      console.error('Genel hata:', err);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Yeni şifre (tekrar)"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 20, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box', height: 48 }}
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