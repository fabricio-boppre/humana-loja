import { readCMS } from "./sanity";

// Get the requested author:
export async function getAnAuthor(slug) {
  const singleAuthorQuery = `*[_type == "person" && slug == "${slug}" && !(_id in path("drafts.**"))] {
	                            "id": _id, 
	                            name,
															slug,
	                            description, 
	                            "mainImageUrl": main_image.asset->url,
                              "books": *[ _type == "book" && references(^._id) && !(_id in path("drafts.**")) && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")]{id, title, slug, special_category, format, "mainImageUrl": main_image.asset->url, "authors": authors[]->{name,slug}},
                              "related_authors": related_authors[]->{id, name, slug, "mainImageUrl": main_image.asset->url},
	                         }[0]`;
  const author = await readCMS.fetch(singleAuthorQuery);
  return author;
}

// Get slugs of available authors:
export async function getAuthorsSlugs() {
  const authorsSlugsQuery = `*[_type == "person" && !(_id in path("drafts.**")) && slug != NULL]{slug}`;
  const authorsSlugs = await readCMS.fetch(authorsSlugsQuery);
  return authorsSlugs;
}
