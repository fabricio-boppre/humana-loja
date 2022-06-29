// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/boasvindas',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}
