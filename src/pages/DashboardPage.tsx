import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Fab,
  Snackbar,
  Alert,
  Pagination,
  Chip,
  Tooltip,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import SEO from '../hooks/useSEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CourseCard from '../components/courses/CourseCard';
import CourseForm from '../components/courses/CourseForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Course, CourseFormData } from '../interfaces/course';
import {
  fetchCourses,
  getAllLocalCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courseService';

export default function DashboardPage() {
  const { isAdmin, user } = useAuth();

  // Data state
  const [apiCourses, setApiCourses] = useState<Course[]>([]);
  const [localCourses, setLocalCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Search
  const [search, setSearch] = useState('');

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; course: Course | null }>({
    open: false,
    course: null,
  });

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Fetch courses
  const loadCourses = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCourses(pageNum);
      setApiCourses(response.courses);
      setHasNext(response.meta.has_next);
      // Estimate total pages (Stepik doesn't provide total count)
      if (response.meta.has_next) {
        setTotalPages(Math.max(totalPages, pageNum + 1));
      } else {
        setTotalPages(pageNum);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('No se pudieron cargar los cursos de la API. Mostrando solo cursos locales.');
      setApiCourses([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLocalCourses = () => {
    setLocalCourses(getAllLocalCourses());
  };

  useEffect(() => {
    loadCourses(page);
    loadLocalCourses();
  }, [page, loadCourses]);

  // Combined & filtered courses
  const allCourses = [...localCourses, ...apiCourses];
  const filteredCourses = search.trim()
    ? allCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.summary.toLowerCase().includes(search.toLowerCase())
      )
    : allCourses;

  // CRUD Handlers
  const handleCreate = () => {
    setEditingCourse(null);
    setFormOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: CourseFormData) => {
    setFormLoading(true);
    try {
      if (editingCourse) {
        updateCourse(editingCourse.id, data);
        showSnackbar('Curso actualizado exitosamente.');
      } else {
        createCourse(data);
        showSnackbar('Curso creado exitosamente.');
      }
      loadLocalCourses();
      setFormOpen(false);
      setEditingCourse(null);
    } catch {
      showSnackbar('Error al guardar el curso.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setDeleteDialog({ open: true, course });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.course) {
      const success = deleteCourse(deleteDialog.course.id);
      if (success) {
        showSnackbar('Curso eliminado exitosamente.');
        loadLocalCourses();
      } else {
        showSnackbar('No se pudo eliminar el curso.', 'error');
      }
    }
    setDeleteDialog({ open: false, course: null });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Dashboard"
        description="Panel de gestión de cursos. Explora, crea y administra cursos en Course Track."
      />
      <Navbar />

      <Box component="main" className="page-container" sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
              {isAdmin ? '🛠️ Panel de Administración' : '📚 Explorar Cursos'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isAdmin
                ? `Bienvenido, ${user?.username}. Tienes permisos completos para gestionar cursos.`
                : `Bienvenido, ${user?.username}. Puedes explorar todos los cursos disponibles.`}
            </Typography>
          </Box>

          {/* Search & filters */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
            }}
          >
            <TextField
              id="search-courses"
              placeholder="Buscar cursos por título o resumen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ maxWidth: { sm: 400 } }}
              aria-label="Buscar cursos"
            />

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<StorageRoundedIcon />}
                label={`${localCourses.length} locales`}
                variant="outlined"
                color="secondary"
                size="small"
              />
              <Chip
                icon={<CloudRoundedIcon />}
                label={`${apiCourses.length} API`}
                variant="outlined"
                color="primary"
                size="small"
              />
            </Box>
          </Box>

          {/* Error message */}
          {error && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Course Grid */}
          {loading ? (
            <LoadingSpinner message="Cargando cursos..." />
          ) : filteredCourses.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No se encontraron cursos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {search
                  ? 'Intenta con otros términos de búsqueda.'
                  : isAdmin
                  ? 'Crea tu primer curso con el botón +.'
                  : 'No hay cursos disponibles en este momento.'}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map((course) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${course.isLocal ? 'local' : 'api'}-${course.id}`}>
                  <CourseCard
                    course={course}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {!loading && filteredCourses.length > 0 && !search && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Pagination
                count={hasNext ? page + 1 : page}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton={false}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                      color: '#fff',
                    },
                  },
                }}
              />
            </Box>
          )}
        </Container>
      </Box>

      {/* FAB for admin - Add Course */}
      {isAdmin && (
        <Tooltip title="Crear nuevo curso" placement="left">
          <Fab
            color="primary"
            aria-label="Agregar nuevo curso"
            onClick={handleCreate}
            id="fab-add-course"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000,
            }}
          >
            <AddRoundedIcon />
          </Fab>
        </Tooltip>
      )}

      {/* Course Form Dialog */}
      <CourseForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleFormSubmit}
        course={editingCourse}
        loading={formLoading}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        title="Eliminar Curso"
        message={`¿Estás seguro de que deseas eliminar "${deleteDialog.course?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ open: false, course: null })}
        severity="error"
      />

      {/* Snackbar */}
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

      <Footer />
    </>
  );
}
