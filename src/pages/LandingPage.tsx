import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SEO from '../hooks/useSEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return { count, start: () => setStarted(true) };
}

const features = [
  {
    icon: <SchoolRoundedIcon sx={{ fontSize: 40 }} />,
    title: 'Gestión de Cursos',
    description: 'Explora, crea y administra cursos con una interfaz moderna e intuitiva. CRUD completo para administradores.',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
  },
  {
    icon: <SecurityRoundedIcon sx={{ fontSize: 40 }} />,
    title: 'Control de Acceso',
    description: 'Sistema de roles con autenticación JWT simulada. Administradores y usuarios con permisos diferenciados.',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
  },
  {
    icon: <ApiRoundedIcon sx={{ fontSize: 40 }} />,
    title: 'API REST Integrada',
    description: 'Consumo de datos en tiempo real desde la API pública de Stepik. Cursos reales al alcance de tu mano.',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  },
  {
    icon: <SpeedRoundedIcon sx={{ fontSize: 40 }} />,
    title: 'Alto Rendimiento',
    description: 'Construido con React, TypeScript y Vite para una experiencia ultrarrápida y tipado seguro.',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  },
];

export default function LandingPage() {
  const coursesCounter = useCounter(500);
  const usersCounter = useCounter(1200);
  const lessonsCounter = useCounter(3400);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesCounter.start();
            usersCounter.start();
            lessonsCounter.start();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title="Inicio"
        description="Course Track — Plataforma moderna de gestión de cursos en línea. Explora, organiza y administra cursos con React y TypeScript."
      />
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 10, md: 16 },
            pb: { xs: 10, md: 16 },
          }}
        >
          {/* Background elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: 350,
              height: 350,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'float 8s ease-in-out infinite reverse',
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                textAlign: 'center',
                maxWidth: 800,
                mx: 'auto',
                animation: 'fadeInUp 0.8s ease-out',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 0.75,
                  borderRadius: 20,
                  background: alpha('#6366F1', 0.1),
                  border: `1px solid ${alpha('#6366F1', 0.2)}`,
                  mb: 4,
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                  Proyecto Final — SIS-215
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 900,
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Gestiona tus cursos{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  de forma inteligente
                </Box>
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 5,
                  fontWeight: 400,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                Explora cursos en línea, administra contenido con roles diferenciados
                y disfruta de una experiencia premium construida con React y TypeScript.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  id="hero-cta-login"
                  sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                >
                  Comenzar Ahora
                </Button>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  variant="outlined"
                  size="large"
                  id="hero-cta-dashboard"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    borderColor: alpha('#94A3B8', 0.3),
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: alpha('#6366F1', 0.05),
                    },
                  }}
                >
                  Ver Dashboard
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.25rem' } }}>
                ¿Por qué{' '}
                <Box component="span" className="gradient-text">
                  Course Track
                </Box>
                ?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                Una plataforma completa con todas las herramientas que necesitas para gestionar cursos en línea.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 1,
                      animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: feature.gradient,
                          mx: 'auto',
                          mb: 2.5,
                          color: '#fff',
                          boxShadow: `0 8px 30px ${alpha('#000', 0.2)}`,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box
          id="stats-section"
          sx={{
            py: { xs: 8, md: 10 },
            background: alpha('#6366F1', 0.03),
            borderTop: `1px solid ${alpha('#94A3B8', 0.06)}`,
            borderBottom: `1px solid ${alpha('#94A3B8', 0.06)}`,
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
              {[
                { value: coursesCounter.count, suffix: '+', label: 'Cursos Disponibles' },
                { value: usersCounter.count, suffix: '+', label: 'Usuarios Activos' },
                { value: lessonsCounter.count, suffix: '+', label: 'Lecciones Totales' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2.5rem', md: '3rem' },
                    }}
                  >
                    {stat.value.toLocaleString()}{stat.suffix}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
              ¿Listo para comenzar?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Inicia sesión y explora todo lo que Course Track tiene para ofrecer.
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              id="cta-login"
              sx={{ px: 5, py: 1.5, fontSize: '1.05rem' }}
            >
              Iniciar Sesión
            </Button>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
