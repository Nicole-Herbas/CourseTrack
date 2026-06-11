import axios from 'axios';
import type { Course, CoursesResponse, CourseFormData } from '../interfaces/course';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

const LOCAL_COURSES_KEY = 'coursetrack_local_courses';
let localIdCounter = Date.now();

// ---------- API Reads ----------

export async function fetchCourses(page: number = 1): Promise<CoursesResponse> {
  const response = await api.get<CoursesResponse>(`/courses`, {
    params: { page },
  });
  return response.data;
}

export async function fetchCourseById(id: number): Promise<Course | null> {
  try {
    const response = await api.get(`/courses/${id}`);
    const courses: Course[] = response.data.courses;
    return courses.length > 0 ? courses[0] : null;
  } catch {
    return null;
  }
}

// ---------- Local Storage CRUD ----------

function getLocalCourses(): Course[] {
  try {
    const raw = localStorage.getItem(LOCAL_COURSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCourses(courses: Course[]): void {
  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(courses));
}

export function getLocalCourseById(id: number): Course | null {
  const courses = getLocalCourses();
  return courses.find((c) => c.id === id) || null;
}

export function createCourse(data: CourseFormData): Course {
  const courses = getLocalCourses();
  const newCourse: Course = {
    id: ++localIdCounter,
    title: data.title,
    summary: data.summary,
    description: data.description,
    cover: null,
    learners_count: 0,
    lessons_count: 0,
    language: data.language,
    is_paid: data.is_paid,
    price: data.price,
    currency_code: 'USD',
    display_price: data.is_paid ? `$${data.price}` : 'Gratis',
    difficulty: data.difficulty,
    total_units: 0,
    create_date: new Date().toISOString(),
    is_public: true,
    canonical_url: '',
    isLocal: true,
  };
  courses.unshift(newCourse);
  saveLocalCourses(courses);
  return newCourse;
}

export function updateCourse(id: number, data: CourseFormData): Course | null {
  const courses = getLocalCourses();
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return null;

  courses[index] = {
    ...courses[index],
    title: data.title,
    summary: data.summary,
    description: data.description,
    language: data.language,
    difficulty: data.difficulty,
    price: data.price,
    is_paid: data.is_paid,
    display_price: data.is_paid ? `$${data.price}` : 'Gratis',
  };
  saveLocalCourses(courses);
  return courses[index];
}

export function deleteCourse(id: number): boolean {
  const courses = getLocalCourses();
  const filtered = courses.filter((c) => c.id !== id);
  if (filtered.length === courses.length) return false;
  saveLocalCourses(filtered);
  return true;
}

export function getAllLocalCourses(): Course[] {
  return getLocalCourses();
}
