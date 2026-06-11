import { Box, Container, Typography, Button, alpha } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import { Link as RouterLink } from 'react-router-dom';
import SEO from '../hooks/useSEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Página no encontrada"
        description="La página que buscas no existe en Course Track."
      />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box sx={{ animation: 'fadeInUp 0.6s ease-out' }}>
            {/* Animated 404 */}
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '6rem', md: '8rem' },
                  background: 'linear-gradient(135deg, #EF4444, #F87171)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                4
              </Typography>
              <Box
                sx={{
                  animation: 'float 3s ease-in-out infinite 0.3s',
                }}
              >
                <SentimentDissatisfiedRoundedIcon
                  sx={{
                    fontSize: { xs: '5rem', md: '7rem' },
                    color: alpha('#EF4444', 0.7),
                  }}
                />
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '6rem', md: '8rem' },
                  background: 'linear-gradient(135deg, #EF4444, #F87171)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  animation: 'float 3s ease-in-out infinite 0.6s',
                }}
              >
                4
              </Typography>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Página no encontrada
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 400, mx: 'auto', lineHeight: 1.7 }}
            >
              Lo sentimos, la página que estás buscando no existe o fue movida a otra ubicación.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                size="large"
                startIcon={<HomeRoundedIcon />}
                id="not-found-home-btn"
              >
                Volver al Inicio
              </Button>
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="outlined"
                size="large"
                id="not-found-dashboard-btn"
                sx={{
                  borderColor: alpha('#94A3B8', 0.3),
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                Ir al Dashboard
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
