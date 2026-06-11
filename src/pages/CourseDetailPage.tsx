import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Chip,
  Divider,
  Grid,
  alpha,
  Paper,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import SEO from '../hooks/useSEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Course } from '../interfaces/course';
import { fetchCourseById, getLocalCourseById } from '../services/courseService';

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
};

const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = useState<Course | null>(
    (location.state as { course?: Course })?.course || null
  );
  const [loading, setLoading] = useState(!course);

  useEffect(() => {
    if (course) return;
    if (!id) return;

    const numId = parseInt(id, 10);
    if (isNaN(numId)) return;

    const loadCourse = async () => {
      setLoading(true);
      // Check local first
      const local = getLocalCourseById(numId);
      if (local) {
        setCourse(local);
        setLoading(false);
        return;
      }
      // Fetch from API
      const fetched = await fetchCourseById(numId);
      setCourse(fetched);
      setLoading(false);
    };

    loadCourse();
  }, [id, course]);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message="Cargando detalles del curso..." fullScreen />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 12 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Curso no encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            El curso que buscas no existe o fue eliminado.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  const stats = [
    { icon: <PeopleRoundedIcon />, label: 'Estudiantes', value: course.learners_count.toLocaleString() },
    { icon: <MenuBookRoundedIcon />, label: 'Lecciones', value: course.lessons_count },
    { icon: <LanguageRoundedIcon />, label: 'Idioma', value: course.language?.toUpperCase() || 'N/A' },
    { icon: <StarRoundedIcon />, label: 'Dificultad', value: difficultyLabels[course.difficulty] || course.difficulty || 'N/A' },
    { icon: <AttachMoneyRoundedIcon />, label: 'Precio', value: course.is_paid ? course.display_price || course.price : 'Gratis' },
    { icon: <CalendarTodayRoundedIcon />, label: 'Creado', value: new Date(course.create_date).toLocaleDateString('es-ES') },
  ];

  return (
    <>
      <SEO
        title={course.title}
        description={course.summary || `Detalles del curso: ${course.title}`}
      />
      <Navbar />

      <Box component="main" className="page-container" sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            sx={{ mb: 3 }}
            aria-label="Navegación de migas de pan"
          >
            <Link
              underline="hover"
              color="text.secondary"
              href="/dashboard"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>
              {course.title.length > 40 ? course.title.slice(0, 40) + '...' : course.title}
            </Typography>
          </Breadcrumbs>

          {/* Back button */}
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 3, color: 'text.secondary' }}
            id="back-btn"
          >
            Volver
          </Button>

          {/* Course Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              mb: 4,
            }}
          >
            {/* Cover Image */}
            <Box
              sx={{
                width: { xs: '100%', md: 360 },
                flexShrink: 0,
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${alpha('#94A3B8', 0.1)}`,
              }}
            >
              <img
                src={
                  course.cover ||
                  `data:image/svg+xml;utf8,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A2E"/><stop offset="100%" stop-color="#16213E"/></linearGradient></defs><rect width="400" height="240" fill="url(#g)"/><text x="200" y="125" text-anchor="middle" fill="#94A3B8" font-family="Inter,sans-serif" font-size="18">📚 Course Track</text></svg>`
                  )}`
                }
                alt={`Imagen del curso: ${course.title}`}
                style={{ width: '100%', height: 'auto', display: 'block', minHeight: 200, objectFit: 'cover' }}
              />
            </Box>

            {/* Course Info */}
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {course.isLocal && (
                  <Chip label="Curso Local" color="secondary" size="small" sx={{ fontWeight: 700 }} />
                )}
                {course.difficulty && (
                  <Chip
                    label={difficultyLabels[course.difficulty] || course.difficulty}
                    color={difficultyColors[course.difficulty] || 'default'}
                    size="small"
                  />
                )}
                {course.is_paid ? (
                  <Chip label="De pago" color="warning" size="small" variant="outlined" />
                ) : (
                  <Chip label="Gratuito" color="success" size="small" variant="outlined" />
                )}
              </Box>

              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {course.title}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                {course.summary || 'Sin resumen disponible.'}
              </Typography>

              {course.description && (
                <>
                  <Divider sx={{ my: 2, borderColor: alpha('#94A3B8', 0.1) }} />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {course.description}
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {stats.map((stat) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={stat.label}>
                <Paper
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    background: alpha('#1A1A2E', 0.5),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha('#94A3B8', 0.08)}`,
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* External link */}
          {course.canonical_url && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                href={course.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                id="view-on-stepik"
              >
                Ver en Stepik ↗
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
