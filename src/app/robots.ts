import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/login',
          '/_next/*',
          '/admin/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/login',
          '/admin/*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/*',
          '/dashboard/*',
          '/login',
          '/admin/*',
        ],
      },
    ],
    sitemap: 'https://mitradaksa.com/sitemap.xml',
    host: 'https://mitradaksa.com',
  }
}
