import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

const EmailConfirm = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const accessToken = query.get('access_token');

  useEffect(() => {
    if (accessToken) {
      console.log('access_token:', accessToken);
    }
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        // alert('Hesabınız doğrulandı!'); // Artık alert yok
      }
    });
  }, [accessToken]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <img src="/gusto-logo.png" alt="Gusto Logo" style={{ width: 120, height: 120, marginBottom: 32 }} />
      <h2 style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: 16, textAlign: 'center' }}>HESABINIZ BAŞARIYLA DOĞRULANDI.</h2>
      <p style={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>
        GUSTO - Freelancer uygulamasında oturum açarak işleminize devam edebilirsiniz.
      </p>
    </div>
  );
};

export default EmailConfirm; 