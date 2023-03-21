import { readCMS } from "./sanity";

// Get the requested publishing company:
export async function getAPublishingCompany(slug) {
  const singlePublishingCompanyQuery = `*[_type == "publishing_company" && slug == "${slug}" && !(_id in path("drafts.**"))] {
	                            "id": _id, 
	                            name,
															slug,
	                            description, 
                              "books": *[ _type == "book" && references(^._id) && !(_id in path("drafts.**")) && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")] | order(publication_year desc) {id, title, slug, special_category, format, "mainImageUrl": main_image.asset->url, "authors": authors[]->{name,slug}},
	                         }[0]`;
  const publishingCompany = await readCMS.fetch(singlePublishingCompanyQuery);
  return publishingCompany;
}

// Get slugs of available publishing companies:
export async function getPublishingCompaniesSlugs() {
  const publishingCompaniesSlugsQuery = `*[_type == "publishing_company" && !(_id in path("drafts.**")) && slug != NULL]{slug}`;
  const publishingCompaniesSlugs = await readCMS.fetch(
    publishingCompaniesSlugsQuery
  );
  return publishingCompaniesSlugs;
}
