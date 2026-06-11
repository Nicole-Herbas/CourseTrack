import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDrawerOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navButtonStyles = (path: string) => ({
    color: isActive(path) ? 'primary.main' : 'text.secondary',
    fontWeight: isActive(path) ? 700 : 500,
    position: 'relative' as const,
    '&::after': isActive(path)
      ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '2px',
          background: 'linear-gradient(90deg, #6366F1, #06B6D4)',
          borderRadius: '1px',
        }
      : {},
    '&:hover': {
      color: 'primary.light',
      background: 'rgba(99, 102, 241, 0.08)',
    },
  });

  const drawerContent = (
    <Box sx={{ width: 280, pt: 2 }} role="navigation" aria-label="Menú principal">
      <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <SchoolRoundedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h6" className="gradient-text" sx={{ fontWeight: 800 }}>
          Course Track
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)' }} />
      <List sx={{ px: 1, pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={() => setDrawerOpen(false)}
            selected={isActive('/')}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/dashboard"
              onClick={() => setDrawerOpen(false)}
              selected={isActive('/dashboard')}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {isAuthenticated && (
        <>
          <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)', my: 1 }} />
          <Box sx={{ px: 3, py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: isAdmin ? 'primary.main' : 'secondary.main',
                  fontSize: '1rem',
                }}
              >
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user?.username}
                </Typography>
                <Chip
                  icon={isAdmin ? <AdminPanelSettingsRoundedIcon /> : <PersonRoundedIcon />}
                  label={isAdmin ? 'Admin' : 'Usuario'}
                  size="small"
                  color={isAdmin ? 'primary' : 'default'}
                  variant="outlined"
                  sx={{ height: 22, fontSize: '0.7rem' }}
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
              size="small"
              id="mobile-logout-btn"
            >
              Cerrar Sesión
            </Button>
          </Box>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)', my: 1 }} />
          <Box sx={{ px: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/login"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon>
                  <LoginRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Iniciar Sesión" />
              </ListItemButton>
            </ListItem>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <SchoolRoundedIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Course Track
            </Typography>
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
              <Button component={RouterLink} to="/" sx={navButtonStyles('/')}>
                Inicio
              </Button>
              {isAuthenticated && (
                <Button component={RouterLink} to="/dashboard" sx={navButtonStyles('/dashboard')}>
                  Dashboard
                </Button>
              )}
            </Box>
          )}

          <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />

          {/* Desktop user section */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={isAdmin ? <AdminPanelSettingsRoundedIcon /> : <PersonRoundedIcon />}
                label={`${user?.username} (${isAdmin ? 'Admin' : 'Usuario'})`}
                variant="outlined"
                color={isAdmin ? 'primary' : 'default'}
                sx={{ fontWeight: 600 }}
              />
              <Tooltip title="Cerrar sesión">
                <IconButton onClick={handleLogout} color="error" size="small" id="desktop-logout-btn" aria-label="Cerrar sesión">
                  <LogoutRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {!isMobile && !isAuthenticated && (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              startIcon={<LoginRoundedIcon />}
              id="navbar-login-btn"
            >
              Iniciar Sesión
            </Button>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
              aria-label="Abrir menú de navegación"
              id="mobile-menu-btn"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              background: '#1A1A2E',
              borderLeft: '1px solid rgba(148, 163, 184, 0.08)',
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
