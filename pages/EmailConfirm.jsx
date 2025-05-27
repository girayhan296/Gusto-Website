import React, { useEffect } from 'react';
import { supabase } from '../supabase';

const EmailConfirm = () => {
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        // alert('Hesabınız doğrulandı!'); // Artık alert yok
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <img src="/gusto-logo.png" alt="Gusto Logo" style={{ width: 200, height: 200, marginBottom: 40 }} />
      <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: 20, textAlign: 'center' }}>HESABINIZ BAŞARIYLA DOĞRULANDI.</h2>
      <p style={{ fontWeight: 'bold', fontSize: '1.3rem', textAlign: 'center' }}>
        GUSTO - Freelancer uygulamasında oturum açarak işleminize devam edebilirsiniz.
      </p>
    </div>
  );
};

export default EmailConfirm; 