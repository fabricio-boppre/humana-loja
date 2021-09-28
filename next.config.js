// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/boasvindas',
        destination: '/boasvindas.html',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}
