import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { Course, CourseFormData } from '../../interfaces/course';

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void;
  course?: Course | null; // If provided, edit mode
  loading?: boolean;
}

interface FormErrors {
  title?: string;
  summary?: string;
  description?: string;
  price?: string;
}

const DIFFICULTIES = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Medio' },
  { value: 'hard', label: 'Difícil' },
];

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
  { value: 'pt', label: 'Portugués' },
  { value: 'ru', label: 'Ruso' },
  { value: 'fr', label: 'Francés' },
];

const initialFormData: CourseFormData = {
  title: '',
  summary: '',
  description: '',
  language: 'es',
  difficulty: 'easy',
  price: '0',
  is_paid: false,
};

export default function CourseForm({ open, onClose, onSubmit, course, loading }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isEditMode = !!course;

  // Populate form when editing
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        summary: course.summary,
        description: course.description,
        language: course.language,
        difficulty: course.difficulty,
        price: course.price,
        is_paid: course.is_paid,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
    setTouched({});
  }, [course, open]);

  const validate = (data: CourseFormData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.title.trim()) {
      errs.title = 'El título es obligatorio.';
    } else if (data.title.trim().length < 5) {
      errs.title = 'El título debe tener al menos 5 caracteres.';
    }

    if (!data.summary.trim()) {
      errs.summary = 'El resumen es obligatorio.';
    } else if (data.summary.trim().length < 10) {
      errs.summary = 'El resumen debe tener al menos 10 caracteres.';
    }

    if (data.description && data.description.trim().length > 0 && data.description.trim().length < 5) {
      errs.description = 'La descripción debe tener al menos 5 caracteres si se proporciona.';
    }

    if (data.is_paid) {
      const priceNum = parseFloat(data.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        errs.price = 'El precio debe ser un número positivo.';
      }
    }

    return errs;
  };

  const handleChange = (field: keyof CourseFormData, value: string | boolean) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (touched[field]) {
      const newErrors = validate(newData);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
  };

  const handleSubmit = () => {
    setTouched({ title: true, summary: true, description: true, price: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="course-form-title"
    >
      <DialogTitle id="course-form-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {isEditMode ? 'Editar Curso' : 'Nuevo Curso'}
        </Typography>
        <Button onClick={onClose} size="small" color="inherit" aria-label="Cerrar formulario">
          <CloseRoundedIcon />
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Los campos marcados con * son obligatorios.
        </Alert>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            id="course-title"
            label="Título *"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            error={!!errors.title && touched.title}
            helperText={touched.title ? errors.title : 'Mínimo 5 caracteres'}
            fullWidth
            autoFocus
            slotProps={{ htmlInput: { minLength: 5, 'aria-required': true } }}
          />

          <TextField
            id="course-summary"
            label="Resumen *"
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            onBlur={() => handleBlur('summary')}
            error={!!errors.summary && touched.summary}
            helperText={touched.summary ? errors.summary : 'Mínimo 10 caracteres'}
            fullWidth
            multiline
            rows={3}
            slotProps={{ htmlInput: { minLength: 10, 'aria-required': true } }}
          />

          <TextField
            id="course-description"
            label="Descripción"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            error={!!errors.description && touched.description}
            helperText={touched.description ? errors.description : 'Opcional'}
            fullWidth
            multiline
            rows={2}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              id="course-language"
              select
              label="Idioma"
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              fullWidth
            >
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="course-difficulty"
              select
              label="Dificultad"
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              fullWidth
            >
              {DIFFICULTIES.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  id="course-is-paid"
                  checked={formData.is_paid}
                  onChange={(e) => handleChange('is_paid', e.target.checked)}
                  color="primary"
                />
              }
              label="Curso de pago"
            />

            {formData.is_paid && (
              <TextField
                id="course-price"
                label="Precio (USD)"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
                error={!!errors.price && touched.price}
                helperText={touched.price ? errors.price : ''}
                sx={{ width: 160 }}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" id="course-form-cancel">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveRoundedIcon />}
          disabled={loading}
          id="course-form-submit"
        >
          {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear Curso'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
