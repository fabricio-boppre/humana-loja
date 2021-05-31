import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import priceFormat from '../../lib/utils'
import { readCMS } from '../../lib/sanity'
// import styles from '../../styles/Book.module.css'

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

      <main className="content" id="livro">
        <h1>{book.title}</h1>
        <br />
        <img src={book.mainImageUrl + '?w=180'}
          	 alt={book.title}
						 title={book.title}
        />
        <br />
        <br />
				<div className="format">[{book.format}]</div>
        <br />
				{priceFormat(active_price)}
        <br />
        <br />
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
        <br />
        <br />
        <Link href="/">
          <a>voltar</a>
        </Link>

      </main>
    </>
  )
}

const booksIdsQuery = `*[_type == "book"]{
                          "id": _id
                        }`;

export const getStaticPaths = async () => {
  // Get the paths (the books IDs) we want to pre-render:
  const booksIds = await readCMS.fetch(booksIdsQuery)
  const paths = booksIds.map(book => ({
    params: { id: book.id }
  }));
  return { paths, fallback: true };
};

// This function gets called at build time on server-side and also after requests:
export const getStaticProps = async ({ params }) => {
	const singleBookQuery = `*[_type == "book" && _id == $id] {
	                            "id": _id, 
	                            title,
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
  const book = await readCMS.fetch(singleBookQuery, { id: params.id })
  return { 
    props: { book },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  };
};