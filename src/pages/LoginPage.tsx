import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Chip,
  Divider,
  InputAdornment,
  IconButton,
  alpha,
} from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SEO from '../hooks/useSEO';

interface FormErrors {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' as 'error' | 'success' });

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!username.trim()) {
      errs.username = 'El nombre de usuario es obligatorio.';
    } else if (username.trim().length < 3) {
      errs.username = 'El usuario debe tener al menos 3 caracteres.';
    }
    if (!password) {
      errs.password = 'La contraseña es obligatoria.';
    } else if (password.length < 4) {
      errs.password = 'La contraseña debe tener al menos 4 caracteres.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const success = await login({ username: username.trim(), password });
      if (success) {
        setSnackbar({ open: true, message: '¡Bienvenido! Redirigiendo...', severity: 'success' });
        setTimeout(() => navigate(from, { replace: true }), 500);
      } else {
        setSnackbar({ open: true, message: 'Credenciales incorrectas. Inténtalo de nuevo.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Error inesperado. Inténtalo más tarde.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setErrors({});
  };

  return (
    <>
      <SEO
        title="Iniciar Sesión"
        description="Inicia sesión en Course Track para gestionar y explorar cursos en línea."
      />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
        }}
      >
        {/* Background effects */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              background: alpha('#1A1A2E', 0.7),
              backdropFilter: 'blur(24px)',
              border: `1px solid ${alpha('#94A3B8', 0.1)}`,
              boxShadow: `0 24px 80px ${alpha('#000', 0.3)}`,
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: `0 8px 30px ${alpha('#6366F1', 0.3)}`,
                }}
              >
                <SchoolRoundedIcon sx={{ fontSize: 32, color: '#fff' }} />
              </Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                Bienvenido
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inicia sesión para acceder a Course Track
              </Typography>
            </Box>

            {/* Demo credentials */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', textAlign: 'center', fontWeight: 600 }}>
                CUENTAS DE DEMOSTRACIÓN
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Chip
                  icon={<AdminPanelSettingsRoundedIcon />}
                  label="Admin"
                  onClick={() => fillCredentials('admin', 'admin123')}
                  color="primary"
                  variant="outlined"
                  clickable
                  sx={{ fontWeight: 600 }}
                  id="demo-admin-chip"
                />
                <Chip
                  icon={<PersonOutlineRoundedIcon />}
                  label="Usuario"
                  onClick={() => fillCredentials('usuario', 'user123')}
                  color="secondary"
                  variant="outlined"
                  clickable
                  sx={{ fontWeight: 600 }}
                  id="demo-user-chip"
                />
              </Box>
            </Box>

            <Divider sx={{ mb: 3, borderColor: alpha('#94A3B8', 0.1) }} />

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                id="login-username"
                label="Usuario"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                autoFocus
                autoComplete="username"
                sx={{ mb: 2.5 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'aria-required': true, minLength: 3 }
                }}
              />

              <TextField
                id="login-password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                autoComplete="current-password"
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityRoundedIcon sx={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'aria-required': true, minLength: 4 }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={<LoginRoundedIcon />}
                id="login-submit-btn"
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Box>

            {/* Info */}
            <Alert severity="info" sx={{ mt: 3, borderRadius: 2, fontSize: '0.8rem' }}>
              <strong>Admin:</strong> admin / admin123 — <strong>Usuario:</strong> usuario / user123
            </Alert>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ borderRadius: 2, fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
