# INFORME TÉCNICO: DESARROLLO DE LA APLICACIÓN WEB "COURSE TRACK"

**Asignatura:** Tecnologías Web II (SIS-215)  
**Proyecto:** Proyecto Final - Aplicación de Gestión de Cursos  
**Nombre del Sistema:** Course Track  
**Tecnologías:** React, TypeScript, Material UI, JWT Simulador, Consumo de API REST  

---

## 1. INTRODUCCIÓN

### 1.1 Contexto del Proyecto
El desarrollo frontend moderno ha evolucionado hacia la construcción de Aplicaciones de Página Única (SPA, por sus siglas en inglés *Single Page Applications*), las cuales ofrecen una experiencia de usuario fluida, interactiva y de alto rendimiento similar al comportamiento de las aplicaciones de escritorio. En el ámbito académico de la asignatura **Tecnologías Web II (SIS-215)**, se plantea la creación de un sistema de gestión y exploración de cursos denominado **"Course Track"**.

Este proyecto se concibe como una solución integral que combina las mejores prácticas del ecosistema de desarrollo web moderno: el control estricto de tipos de datos, la gestión de componentes web independientes y reutilizables, la seguridad mediante tokens, la persistencia en el lado del cliente y la adaptabilidad visual (diseño responsivo y accesible).

### 1.2 Descripción General de la Problemática y Solución
El aprendizaje en línea y la administración de plataformas educativas requieren herramientas ágiles y sencillas que permitan tanto a estudiantes como a administradores interactuar con grandes volúmenes de datos de cursos. Muchas plataformas tradicionales sufren de interfaces lentas o arquitecturas monolíticas que sobrecargan al servidor en cada navegación. 

**Course Track** resuelve esta problemática implementando una arquitectura frontend desacoplada y orientada a servicios. La solución propuesta se conecta directamente a la API REST pública del proveedor educativo internacional **Stepik** para la visualización de datos en tiempo real, mientras simula un entorno seguro de inicio de sesión mediante JSON Web Tokens (JWT) y operaciones de creación, edición y eliminación de cursos (CRUD) persistidas localmente en el navegador a través del almacenamiento web (*LocalStorage*).

### 1.3 Alcance del Sistema
La aplicación web comprende los siguientes alcances clave:
- **Landing Page Informativa:** Un portal de bienvenida con diseño moderno, estadísticas interactivas de cursos y accesos directos al sistema.
- **Mecanismo de Autenticación de Doble Rol:** Diferenciación entre usuarios administradores (con permisos CRUD completos) y usuarios estándar (con permisos de solo lectura).
- **Dashboard de Gestión Integral:** Vista unificada que combina cursos remotos recuperados de la API de Stepik y cursos locales creados por el administrador.
- **Detalle de Cursos Dinámico:** Ficha de información detallada, estadísticas del curso, idioma, dificultad e hipervínculos externos de acceso al curso original.
- **Optimización de Buscabilidad y Accesibilidad (SEO):** Implementación de etiquetas dinámicas meta descriptivas, Open Graph para redes sociales, manejo semántico del HTML y total compatibilidad con lectores de pantalla.

---

## 2. OBJETIVOS

### 2.1 Objetivo General
Desarrollar una aplicación web frontend interactiva, robusta y moderna utilizando la biblioteca **React** y el lenguaje **TypeScript**, que integre servicios de autenticación simulada por JWT, control de acceso por roles, diseño responsive adaptado a múltiples pantallas, optimización SEO y consumo de servicios REST de la API de Stepik, cumpliendo con los estándares de usabilidad, modularidad y accesibilidad web.

### 2.2 Objetivos Específicos
1. **Implementar TypeScript** para garantizar la seguridad de tipos, prevenir errores en tiempo de ejecución y estructurar los contratos de datos (interfaces) para cursos y usuarios.
2. **Diseñar una Arquitectura Modular** que separe limpiamente las páginas, los componentes reutilizables, los servicios de comunicación API, los hooks de efectos secundarios y el contexto global de la aplicación.
3. **Consumir la API REST de Stepik** procesando las respuestas asíncronas para la paginación, búsqueda, filtrado y renderizado dinámico de cursos en la interfaz.
4. **Desarrollar un CRUD Simulado** utilizando *LocalStorage* para permitir a los administradores agregar, modificar y eliminar cursos sin requerir un servidor backend propio.
5. **Configurar un Sistema de Autenticación Basado en Tokens** que cifre las credenciales simuladas en formato JSON Web Token base64, controlando el ciclo de vida de la sesión del usuario.
6. **Aplicar los Lineamientos de MUI (Material UI)** para crear una interfaz con estética premium inspirada en el tema oscuro (*Dark Mode*) con efectos de desenfoque de fondo (*Glassmorphism*).
7. **Garantizar la indexación SEO** mediante `react-helmet-async` para cambiar dinámicamente el título y descripción de cada página.

---

## 3. TECNOLOGÍAS UTILIZADAS

La construcción de **Course Track** se basó en una selección precisa de herramientas tecnológicas modernas en el ecosistema de JavaScript/TypeScript:

1. **React 19 (Librería Core):** Utilizada para la creación de la interfaz de usuario basada en componentes y el control eficiente del DOM virtual a través de estados reactivos.
2. **TypeScript (Versión ~6.0):** Superconjunto de JavaScript que aporta tipado estático, interfaces rigurosas y autocompletado avanzado durante el desarrollo, reduciendo la aparición de bugs lógicos.
3. **Material UI (MUI v9):** Framework de diseño e interfaz de usuario basado en las directrices de Material Design de Google. Proporciona componentes preconstruidos altamente personalizables, responsivos y con soporte nativo de accesibilidad.
4. **React Router Dom (Versión ~7.17):** Motor de enrutamiento del lado del cliente que permite la navegación entre las diferentes páginas del sistema sin recargar el navegador, garantizando la experiencia de SPA.
5. **Axios (Versión ~1.17):** Cliente HTTP basado en promesas para realizar peticiones asíncronas de manera robusta hacia la API externa de Stepik, con soporte para interceptores y tiempos de espera (timeouts).
6. **React Helmet Async:** Librería para manipular de forma asíncrona las etiquetas del encabezado del documento (`<head>`), permitiendo inyectar títulos, metadatos y etiquetas Open Graph personalizadas para optimizar el posicionamiento en buscadores (SEO).
7. **Vite (Versión ~8.0):** Herramienta de compilación ultrarrápida (build tool) que optimiza los archivos en desarrollo mediante ESM nativos y genera bundles altamente optimizados para producción.
8. **LocalStorage API:** Mecanismo de persistencia nativo del navegador que permite almacenar pares clave-valor de forma persistente, utilizado para la persistencia del JWT y el listado de cursos locales.

---

## 4. ARQUITECTURA DEL SISTEMA

### 4.1 Organización de la Estructura de Directorios

La estructura del proyecto sigue un patrón de diseño limpio y modular, separando las responsabilidades de cada archivo:

```
src/
├── assets/                  # Recursos gráficos (imágenes, SVGs)
├── components/              # Componentes de UI modulares y reutilizables
│   ├── common/              # Componentes genéricos (LoadingSpinner, ConfirmDialog)
│   ├── courses/             # Componentes específicos de cursos (CourseCard, CourseForm)
│   └── layout/              # Estructura del sitio (Navbar, Footer)
├── context/                 # Gestión de estados globales compartidos (AuthContext)
├── hooks/                   # Ganchos lógicos personalizados (useSEO)
├── interfaces/              # Declaración de contratos y tipos de TypeScript (course, user)
├── pages/                   # Componentes de nivel de ruta (vistas completas)
├── routes/                  # Configuración de rutas y guards de acceso (AppRouter, ProtectedRoute)
├── services/                # Conectores de comunicación con la API (courseService)
├── theme/                   # Configuración del diseño visual global de Material UI (theme)
├── App.tsx                  # Enrutador principal y envoltura de proveedores globales
├── main.tsx                 # Punto de entrada de renderizado de la aplicación
└── index.css                # Estilos CSS globales y variables CSS de la aplicación
```

### 4.2 Flujo de Datos y Componentes del Sistema

El siguiente diagrama detalla cómo se relacionan los distintos módulos del sistema desde que el usuario accede a la aplicación hasta que se renderizan los datos remotos o locales:

```
                                +-------------------+
                                |     Navegador     |
                                |   (index.html)    |
                                +---------+---------+
                                          |
                                          v
                                +-------------------+
                                |    main.tsx       |
                                |  (StrictMode)     |
                                +---------+---------+
                                          |
                                          v
                                +-------------------+
                                |      App.tsx      |
                                | (Global Providers)|
                                +---------+---------+
                                          |
        +---------------------------------+---------------------------------+
        |                                 |                                 |
        v                                 v                                 v
+---------------+                 +---------------+                 +---------------+
|HelmetProvider |                 | ThemeProvider |                 |  AuthProvider |
|  (SEO Head)   |                 | (Dark / Light)|                 | (AuthContext) |
+---------------+                 +---------------+                 +---------------+
                                          |                                 |
                                          v                                 v
                                +-------------------+             +------------------+
                                |    BrowserRouter  | <---------+ |  ProtectedRoute  |
                                |    (AppRouter)    |             | (Role Validation)|
                                +---------+---------+             +---------+--------+
                                          |                                 |
                  +-----------------------+-----------------------+         | (si es válido)
                  |                       |                       |         v
                  v                       v                       v         |
           +--------------+        +--------------+        +--------------+ |
           |  LandingPage |        |   LoginPage  |        | DashboardPage| <
           |   (Pública)  |        |   (Pública)  |        | (Protegida)  |
           +--------------+        +--------------+        +-------+------+
                                                                   |
                                                                   v
                                                           +---------------+
                                                           | courseService |
                                                           +---+-------+---+
                                                               |       |
                                           (API Remota Stepik) v       v (Local Storage)
                                                        +------+   +------+
                                                        | API  |   |Local |
                                                        | axios|   | CRUD |
                                                        +------+   +------+
```

### 4.3 Mecanismo de Autenticación JWT Simulado

Para cumplir con el requerimiento técnico de autenticación y control de accesos basado en JWT sin depender de un backend real, se diseñó un flujo criptográfico en el lado del cliente dentro de [AuthContext.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/context/AuthContext.tsx):

1. **Generación del Token:** Al iniciar sesión exitosamente, se crea una firma digital simulada. Se codifican tres partes en base64 separadas por puntos (`header.payload.signature`):
   - **Header:** Tipo de algoritmo (`HS256`) y formato (`JWT`).
   - **Payload:** Datos del usuario autenticado (ID, nombre de usuario, rol y tiempos de expedición y expiración).
   - **Signature:** Una clave secreta estática firmada que valida la procedencia.
2. **Persistencia:** El token generado se guarda en el `localStorage` bajo la clave `coursetrack_auth_token`.
3. **Validación en Carga:** Cada vez que la aplicación se monta, un `useEffect` lee el token del storage, decodifica el payload en base64, verifica que el tiempo de expiración (`exp`) no haya sido superado, y restaura la sesión de forma transparente.
4. **Control de Acceso:** Las rutas privadas `/dashboard` y `/courses/:id` pasan por el filtro de `ProtectedRoute`. Si no hay sesión válida activa, redirige al usuario a `/login`. Si se requiere el rol `admin` y el usuario tiene rol `user`, se renderiza una pantalla estilizada de "Acceso Denegado".

### 4.4 Integración con API de Stepik y Solución a Restricciones de Red (CORS)

La API pública de Stepik no incluye cabeceras de Compartición de Recursos de Origen Cruzado (CORS) configuradas para el acceso directo desde navegadores en entornos locales (`http://localhost:5173`). Para resolver esta limitación técnica durante el desarrollo, se configuró un servidor proxy reverso dentro del archivo [vite.config.ts](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/vite.config.ts):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stepik.org',
        changeOrigin: true,
      }
    }
  }
})
```

Esto intercepta todas las solicitudes locales que comienzan con `/api` y las redirige internamente hacia `https://stepik.org/api`, inyectando las cabeceras correspondientes en la petición de red y permitiendo el consumo de datos limpios y asíncronos sin bloqueos de seguridad por parte del navegador.

---

## 5. DESCRIPCIÓN DE COMPONENTES Y PÁGINAS

### 5.1 Componentes de Presentación y Layout

- **Navbar ([Navbar.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/layout/Navbar.tsx)):** Barra de navegación responsive superior. Contiene la marca y el logotipo de la aplicación, enlaces contextuales a las secciones públicas y privadas (que se ocultan o muestran según el estado de la sesión), información del usuario actual con etiquetas de rol (Admin / Usuario) y el botón de cierre de sesión. Cuenta con un cajón deslizable lateral (*Drawer*) para resoluciones móviles.
- **Footer ([Footer.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/layout/Footer.tsx)):** Pie de página institucional que muestra el copyright, enlaces útiles del portal, las tecnologías del proyecto (React, MUI, Vite) y accesos a redes de contacto.
- **LoadingSpinner ([LoadingSpinner.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/common/LoadingSpinner.tsx)):** Indicador de carga animado centralizado con la firma visual de la marca y soporte para bloqueo de pantalla completa.
- **ConfirmDialog ([ConfirmDialog.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/common/ConfirmDialog.tsx)):** Cuadro de diálogo modal genérico para solicitar confirmación del usuario antes de realizar acciones destructivas, como la eliminación permanente de un curso del sistema.

### 5.2 Componentes de Cursos

- **CourseCard ([CourseCard.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/courses/CourseCard.tsx)):** Ficha interactiva de visualización de curso. Integra efectos hover de elevación y bordes iluminados, renderiza la imagen de portada (o un marcador de posición SVG URL codificado si no posee una), el título, resumen del curso, chips con cantidad de alumnos, número de lecciones, idioma e indicador de dificultad. Si el usuario cuenta con el rol de Administrador y el curso es de origen local, despliega los botones directos para editar y eliminar.
- **CourseForm ([CourseForm.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/components/courses/CourseForm.tsx)):** Formulario enriquecido encapsulado en un modal de MUI. Maneja la creación y edición de cursos mediante una interfaz interactiva. Cuenta con validaciones reactivas en tiempo real (longitud de título mínima de 5 letras, resumen de 10 letras, control de interruptor para determinar si el curso es de pago e ingresos de valor de precios).

### 5.3 Páginas Principales

- **Landing Page ([LandingPage.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/pages/LandingPage.tsx)):** Página de inicio pública. Presenta una sección *Hero* con titulares llamativos construidos con degradados de color dinámicos, botones de llamado a la acción (CTA), una sección de características de la plataforma enriquecida con iconos informativos, contadores numéricos animados que estiman la cantidad de alumnos y cursos en la web mediante un gancho (*hook*) de cuenta regresiva, y un pie de página integrado.
- **Login Page ([LoginPage.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/pages/LoginPage.tsx)):** Formulario de acceso con diseño de vidrio esmerilado (*glassmorphism*). Incluye validaciones del lado del cliente, opciones de visualización de contraseña y accesos rápidos (botones clicables) para rellenar de forma inmediata las credenciales de prueba del administrador y el usuario genérico.
- **Dashboard ([DashboardPage.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/pages/DashboardPage.tsx)):** El núcleo operacional. Carga los cursos de la API y los cursos locales. Proporciona una barra de búsqueda para filtrado dinámico inmediato, visualizadores de cantidad de cursos locales y remotos, y controles de paginación sincronizados con el backend de Stepik. Los administradores disponen de un botón flotante de acción (FAB) para dar de alta nuevos cursos.
- **Course Detail ([CourseDetailPage.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/pages/CourseDetailPage.tsx)):** Vista detallada del curso. Contiene navegación estructurada por migas de pan (*Breadcrumbs*), ficha completa de datos, descripción completa del temario del curso y un botón directo que redirige a la plataforma de origen del curso si este fue obtenido de la API.
- **Not Found ([NotFoundPage.tsx](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/pages/NotFoundPage.tsx)):** Pantalla de error 404 personalizada y animada con ilustraciones vectoriales fluidas para redirigir al usuario hacia páginas válidas en caso de acceder a una ruta inexistente.

### 5.4 Ganchos Personalizados (Custom Hooks)

- **useSEO ([useSEO.ts](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/hooks/useSEO.ts)):** Facilita la inyección de metadatos SEO en cada renderizado de página. Configura de forma transparente las etiquetas del título del sitio, descripción meta y etiquetas de redes sociales (Open Graph / Facebook) para simplificar la integración en buscadores y plataformas de compartición de enlaces.

---

## 6. CAPTURAS DE PANTALLA

*(Nota: En esta sección se deben insertar las imágenes del sistema en funcionamiento)*

### 6.1 Página de Inicio (Landing Page)
*(Inserte captura de pantalla de la Landing Page aquí)*

### 6.2 Página de Inicio de Sesión (Login Page)
*(Inserte captura de pantalla del Login Page con los accesos rápidos aquí)*

### 6.3 Dashboard de Cursos (Rol: Usuario Estándar)
*(Inserte captura de pantalla del Dashboard en modo lectura aquí)*

### 6.4 Dashboard de Cursos (Rol: Administrador con CRUD)
*(Inserte captura de pantalla del Dashboard con botones de edición, eliminación y botón flotante de agregar aquí)*

### 6.5 Formulario de Creación/Edición de Curso
*(Inserte captura de pantalla de la ventana modal del formulario aquí)*

### 6.6 Vista Detallada de Curso
*(Inserte captura de pantalla de la ficha de detalles de un curso aquí)*

### 6.7 Página de Error 404 (Not Found)
*(Inserte captura de pantalla de la página 404 animada aquí)*

---

## 7. CONCLUSIONES

### 7.1 Lecciones Aprendidas
- **Manejo Riguroso de Tipos de Datos:** El uso de TypeScript en conjunto con React demostró ser indispensable en la estructuración de respuestas de la API. Definir la interfaz `Course` ayudó a mapear y renderizar campos con seguridad, evitando los fallos comunes de propiedades indefinidas (*undefined* o *null*).
- **Importancia de la Codificación URL en Recursos Multimedia:** Se evidenció la restricción de la función nativa `btoa()` del navegador al procesar caracteres de 4 bytes (como emojis o caracteres especiales en strings). Su reemplazo por codificación URL nativa mediante `encodeURIComponent` aseguró que los SVGs embebidos funcionen correctamente bajo cualquier entorno gráfico sin provocar excepciones críticas de importación en el frontend.
- **Flexibilidad del Enrutador en el Cliente:** La separación de rutas a través de un enrutador estructurado SPA facilita la creación de flujos robustos de redirección, manteniendo un registro de la página anterior visitada (a través del estado del enrutador) para mejorar el flujo de redirecciones post-login.

### 7.2 Buenas Prácticas Aplicadas
- **Desacoplamiento del Estado Global:** El uso de React Context para aislar el flujo de autenticación (`AuthContext`) previno el prop-drilling, logrando que cualquier componente del sistema tenga acceso al estado del usuario actual o al método de cierre de sesión de manera instantánea.
- **Modularidad en Estilos MUI:** La personalización global del diseño mediante un único archivo de tema ([theme.ts](file:///c:/Users/nicol/OneDrive/Escritorio/coursetrack/src/theme/theme.ts)) garantizó que la estética visual se mantenga coherente. Esto redujo el tamaño de los archivos de los componentes y facilitó el cumplimiento de las normativas de MUI v9 relativas al uso de la propiedad `sx`.
- **Accesibilidad Web (A11y):** Los componentes interactivos del sistema, como los TextFields y formularios, incluyen etiquetas descriptivas de accesibilidad (como `aria-required` e `id` únicos), asegurando que personas con discapacidades visuales o de navegación asistida puedan navegar la web cómodamente.

### 7.3 Recomendaciones para el Futuro
- **Implementación de un Backend Real:** Para un entorno de producción formal, se recomienda el desarrollo de un servidor backend en Node.js (Express o NestJS) con una base de datos relacional (como PostgreSQL) para realizar una persistencia segura de los datos y sustituir las simulaciones basadas en `LocalStorage`.
- **Estrategia CORS en Producción:** La resolución mediante proxy del servidor de desarrollo de Vite debe ser sustituida por un middleware intermedio o un servidor proxy reverso real (como Nginx) en la nube para el redireccionamiento seguro de peticiones hacia la API de Stepik.
- **Implementación de Caché de Datos:** El uso de librerías de persistencia y gestión de consultas de datos como React Query (TanStack Query) optimizaría de gran manera el consumo de la API de Stepik, reduciendo las llamadas repetidas de red y mejorando aún más los tiempos de respuesta visual del sistema.
