import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import priceFormat from '../../lib/utils'
import { readCMS } from '../../lib/sanity'

export default function Book({book}) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running:
  if (router.isFallback) {
    return <div>Carregando...</div>
  }

	if (book.price_discount !== undefined) {
		var discount = true
		var active_price = book.price_discount
	} else {
		var discount = false
		var active_price = book.price
	}
	
  return (
    <>
      <Head>
        <title>Humana | {book.title}</title>
      </Head>

      <main className={"content" + (book.stock_situation == "esgotado_visivel" ? " unavailable" : "")} id="livro">

        <h1>{book.title}</h1>

        <img src={book.mainImageUrl + '?w=180'}
          	 alt={book.title}
						 title={book.title}
        />

				<div id="format">[{book.format}]</div>

				<div id="price">{priceFormat(active_price)}</div>

        <button className="snipcart-add-item"
            data-item-id={book.id}
	          data-item-name={book.title}
            data-item-price={active_price}
            data-item-url={`/livro/${book.id}`}
            data-item-description={book.description}
            data-item-image={book.mainImageUrl}
						data-item-file-guid={book.file_guid}
						{...((book.format == 'ebook') ? {'data-item-max-quantity': '1'} : {})}
            data-item-weight={book.weight}
            data-item-width={book.width}
            data-item-length={book.length}
            data-item-height={book.height}>
            comprar
        </button>

      </main>
    </>
  )
}

// Get the paths (the books slugs) we want to pre-render:
export const getStaticPaths = async () => {
	const booksSlugsQuery = `*[_type == "book"]{slug}`
  const booksSlugs = await readCMS.fetch(booksSlugsQuery)
  const paths = booksSlugs.map(book => ({
    params: { slug: book.slug }
  }));
  return { paths, fallback: true };
};

// This function gets called at build time on server-side and also after requests:
export const getStaticProps = async ({ params }) => {
	const singleBookQuery = `*[_type == "book" && slug == $slug] {
	                            "id": _id, 
	                            title,
															slug,
															"stock_situation": stock_situation[0],
	                            description, 
	                            price,
															price_discount, 
	                            weight,
															format,
															file_guid,
															width,
															length,
															height,
	                            "mainImageUrl": main_image.asset->url
	                         }[0]`;
  const book = await readCMS.fetch(singleBookQuery, { slug: params.slug })
  return { 
    props: { book },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  };
};