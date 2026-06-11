export interface Course {
  id: number;
  title: string;
  summary: string;
  description: string;
  cover: string | null;
  learners_count: number;
  lessons_count: number;
  language: string;
  is_paid: boolean;
  price: string;
  currency_code: string;
  display_price: string;
  difficulty: string;
  total_units: number;
  create_date: string;
  is_public: boolean;
  canonical_url: string;
  // Marks locally-created courses
  isLocal?: boolean;
}

export interface CourseFormData {
  title: string;
  summary: string;
  description: string;
  language: string;
  difficulty: string;
  price: string;
  is_paid: boolean;
}

export interface CoursesMeta {
  page: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface CoursesResponse {
  meta: CoursesMeta;
  courses: Course[];
}
