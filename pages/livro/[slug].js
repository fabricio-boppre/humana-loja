import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { priceFormat } from '../../lib/utils'
import { getBooksSlugs, getABook } from '../../lib/books'
import styles from '../../styles/Book.module.css'

export default function Book({book}) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running:
  if (router.isFallback) {
    return (
				<>
		      <Head>
						<title>Humana</title>
		      </Head>
					<main className="content" id={styles.book}>
						<p id="loading-book">Localizando o livro...</p>
					</main>
				</>
		)
  }

  // If no book is found:
	// - This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed.
  if (!book) {
    return (
				<>
		      <Head>
		        <meta name="robots" content="noindex" />
						<title>Humana</title>
		      </Head>
		      <main className="content" id={styles.book}>
						<p id="inexistent-book">Ops! Este livro não consta em nosso catálogo.</p>
					</main>
		    </>
  	)
	}
	
	// Create the "Humana indica" label:
	const humana_indica = <div className="humana_indica">Humana indica</div>
	
	// Prepare the subcategories:
	var subcategories
	if ((book.subcategories) && (book.subcategories.length > 0)) {
		subcategories = (
			<div className="info-item">
				<span className="title">subcategoria(s)</span>&nbsp;
				{book.subcategories.map((subcat, key) => <Link key={key} href={`/?subcategory=${subcat.slug}`}><a>{subcat.name}</a></Link>).reduce((prev, curr) => [prev, ', ', curr])}
			</div>
		)
	}

	// Prepare the buy button (or the unavailable sign) and the price tag:
	// - If the book is available:
	if (book.stock_situation == "disponivel") {
		// Check if there is a discount and create the price tag:
		if (book.price_old !== undefined) {
			var discount = true
			var original_price = <div className='original_price'>{priceFormat(book.price_old)}</div>
		} else {
			var discount = false
		}
		var price_tag = (
			<>
				{discount ? original_price : ""}
				<div className="price">{priceFormat(book.price)}</div>
			</>
		)
		// ... and create the buy button:
		var button = (
	        <button className="snipcart-add-item"
	            data-item-id={book.id}
		          data-item-name={book.title}
	            data-item-price={book.price}
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
		)
	// - If the book is not available, we show the the unavailable sign and no price tag: 
	} else if (book.stock_situation == "esgotado_visivel") {
		var price_tag = null
		var button = <div className="unavailable">esgotado</div>
	}
	
  return (
    <>
      <Head>
        <title>Humana | {book.title}</title>
      </Head>

      <main className="content" id={styles.book}>

				<article>

					<section id="book-image">
						<header hidden>
							<h1>Capa</h1>
						</header>
						{((book.special_category !== undefined) && (book.special_category.includes("humana_indica"))) ?
					  	humana_indica :
							""
						}
		        <img src={book.mainImageUrl + '?w=260'}
		          	 alt={book.title}
								 title={book.title}
		        />
					</section>
					
	        <section id="book-info">
						<header>
							<h1>{book.title}</h1>
							<div id="author">
								{book.authors.map((author, key) => <span key={key}>{author.name}</span>).reduce((prev, curr) => [prev, ', ', curr])}
							</div>
						</header>
						<div className="info-item"><span className="title">tipo</span> {book.format}</div>
						<div className="info-item"><span className="title">editora</span> {book.publishing_company.name}</div>
						<div className="info-item"><span className="title">ano de publicação</span> {book.publication_year}</div>
						<div className="info-item">
							<span className="title">categoria(s)</span>&nbsp;
							{book.categories.map((cat, key) => <Link key={key} href={`/?category=${cat.slug}`}><a>{cat.name}</a></Link>).reduce((prev, curr) => [prev, ', ', curr])}
						</div>
						{book.subcategories ? subcategories : ""}
						<div className="info-item"><span className="title">número de páginas</span> {book.pages_number}</div>
						<div className="info-item"><span className="title">peso</span> {book.weight}g</div>
						<div className="info-item"><span className="title">dimensões</span> C: {book.length}cm / L: {book.width}cm / A: {book.height}cm</div>
					</section>
	
					<section id="book-price-and-button">
						<header hidden>
							<h1>Preço</h1>
						</header>
						{price_tag}
						{button}
					</section>

					<section id="book-description">
						<header>
							<h1>descrição</h1>
						</header>
						{book.description}
					</section>
				
				</article>
								
      </main>
    </>
  )
}

// Get the paths (the books slugs) we want to pre-render:
export const getStaticPaths = async () => {
 	const booksSlugs = await getBooksSlugs()
  const paths = booksSlugs.map(book => ({
    params: { slug: book.slug }
  }));
  return { paths, fallback: true };
};

// This function gets called at build time on server-side and also after requests:
export const getStaticProps = async ({ params }) => {
	const book = await getABook(params.slug)
  return { 
    props: { book },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  };
};