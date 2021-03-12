const sanityClient = require('@sanity/client')

export const client = sanityClient({
  projectId: 'xrrf0crg',
  dataset: 'production',
  // token: 'sanity-auth-token', // or leave blank to be anonymous user
  useCdn: false // `false` if you want to ensure fresh data
})