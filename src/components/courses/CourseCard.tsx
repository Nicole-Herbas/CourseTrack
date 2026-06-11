import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  CardActionArea,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import type { Course } from '../../interfaces/course';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  isAdmin: boolean;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
}

const difficultyColors: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
};

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
};

const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1A1A2E"/>
        <stop offset="100%" stop-color="#16213E"/>
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#g)"/>
    <text x="200" y="105" text-anchor="middle" fill="#94A3B8" font-family="Inter,sans-serif" font-size="16">📚 Course Track</text>
  </svg>
`);

export default function CourseCard({ course, isAdmin, onEdit, onDelete }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.id}`, { state: { course } });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Local badge */}
      {course.isLocal && (
        <Chip
          label="Local"
          size="small"
          color="secondary"
          sx={{
            position: 'absolute',
            top: -8,
            right: 12,
            zIndex: 2,
            fontWeight: 700,
            fontSize: '0.7rem',
          }}
        />
      )}

      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="160"
          image={course.cover || placeholderImage}
          alt={`Imagen del curso: ${course.title}`}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '1rem',
              lineHeight: 1.4,
            }}
          >
            {course.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              flexGrow: 1,
            }}
          >
            {course.summary || 'Sin descripción disponible.'}
          </Typography>

          {/* Stats chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            <Chip
              icon={<PeopleRoundedIcon />}
              label={`${course.learners_count} estudiantes`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip
              icon={<MenuBookRoundedIcon />}
              label={`${course.lessons_count} lecciones`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
            {course.language && (
              <Chip
                icon={<LanguageRoundedIcon />}
                label={course.language.toUpperCase()}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
            {course.difficulty && (
              <Chip
                icon={<StarRoundedIcon />}
                label={difficultyLabels[course.difficulty] || course.difficulty}
                size="small"
                color={difficultyColors[course.difficulty] || 'default'}
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Admin actions */}
      {isAdmin && course.isLocal && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 0.5,
            px: 2,
            pb: 1.5,
            pt: 0,
          }}
        >
          <Tooltip title="Editar curso">
            <IconButton
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(course);
              }}
              aria-label={`Editar curso ${course.title}`}
              id={`edit-course-${course.id}`}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar curso">
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(course);
              }}
              aria-label={`Eliminar curso ${course.title}`}
              id={`delete-course-${course.id}`}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
}
