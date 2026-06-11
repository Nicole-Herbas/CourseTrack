import { Box, Container, Typography, Link, Divider, IconButton } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 6,
        pb: 4,
        background: 'rgba(15, 15, 35, 0.9)',
        borderTop: '1px solid rgba(148, 163, 184, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <SchoolRoundedIcon sx={{ color: 'primary.main', fontSize: 26 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Course Track
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
              Plataforma moderna de gestión de cursos en línea. Tecnologías Web II — SIS-215.
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ fontWeight: 700 }}>
              Navegación
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="/" color="text.secondary" underline="hover" variant="body2">
                Inicio
              </Link>
              <Link href="/login" color="text.secondary" underline="hover" variant="body2">
                Iniciar Sesión
              </Link>
              <Link href="/dashboard" color="text.secondary" underline="hover" variant="body2">
                Dashboard
              </Link>
            </Box>
          </Box>

          {/* Tech */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ fontWeight: 700 }}>
              Tecnologías
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">React + TypeScript</Typography>
              <Typography variant="body2" color="text.secondary">Material UI</Typography>
              <Typography variant="body2" color="text.secondary">Vite</Typography>
              <Typography variant="body2" color="text.secondary">Stepik API</Typography>
            </Box>
          </Box>

          {/* Social */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ fontWeight: 700 }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Nicole Lorena Herbas Claure</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link href="https://github.com/Nicole-Herbas" target="_blank" rel="noopener noreferrer">      
                  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} aria-label="GitHub">
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Link>
                <Link href="https://www.linkedin.com/in/nicole-herbas-claure-752858294/" target="_blank" rel="noopener noreferrer">
                  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} aria-label="LinkedIn">
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Link>
                
                <a href="mailto:nicole.herbas@ucb.edu.bo" target="_blank" rel="noopener noreferrer">
                  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} aria-label="Email">
                    <EmailRoundedIcon fontSize="small" />
                  </IconButton>
                </a>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)', mb: 3 }} />

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} Course Track — Proyecto Final SIS-215. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
