import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title,
  description = 'Course Track — Plataforma moderna de gestión de cursos en línea.',
  ogTitle,
  ogDescription,
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  const fullTitle = `${title} | Course Track`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
    </Helmet>
  );
}
