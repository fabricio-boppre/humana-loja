const sanityClient = require("@sanity/client");

export const readCMS = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2021-03-30",
  useCdn: true,
});
