import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Gizlilik Politikası
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Veri Toplama ve Kullanım
          </Typography>
          <Typography paragraph>
            Gusto olarak, kişisel verilerinizin güvenliği bizim için önemlidir. Bu gizlilik politikası, 
            hangi verileri topladığımızı ve bu verileri nasıl kullandığımızı açıklamaktadır.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. Toplanan Veriler
          </Typography>
          <Typography paragraph>
            • Ad, soyad ve iletişim bilgileri<br />
            • Hesap bilgileri<br />
            • Kullanım istatistikleri<br />
            • Cihaz ve tarayıcı bilgileri
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. Veri Güvenliği
          </Typography>
          <Typography paragraph>
            Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. 
            Verileriniz şifrelenerek saklanır ve yetkisiz erişime karşı korunur.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. Çerezler
          </Typography>
          <Typography paragraph>
            Web sitemizde çerezler kullanılmaktadır. Bu çerezler, size daha iyi bir kullanıcı deneyimi 
            sunmak ve web sitemizi geliştirmek için kullanılır.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. Haklarınız
          </Typography>
          <Typography paragraph>
            KVKK kapsamında aşağıdaki haklara sahipsiniz:<br />
            • Verilerinize erişim hakkı<br />
            • Verilerinizin düzeltilmesini talep etme hakkı<br />
            • Verilerinizin silinmesini talep etme hakkı<br />
            • Verilerinizin işlenmesine itiraz etme hakkı
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. İletişim
          </Typography>
          <Typography paragraph>
            Gizlilik politikamız hakkında sorularınız için bize e-posta yoluyla ulaşabilirsiniz.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 