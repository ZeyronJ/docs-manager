/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      // {
      //   source: '/api/documents', // Endpoint de todos los documentos
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       value: 'no-store, max-age=0', // Desactiva el caché para esta ruta
      //     },
      //   ],
      // },
      {
        source: '/api/documents/oficiales', // Endpoint de documentos oficiales
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0', // Desactiva el caché para esta ruta
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
