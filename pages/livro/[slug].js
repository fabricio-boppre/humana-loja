import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { priceFormat } from '../../lib/utils'
import { getBooksSlugs, getABook } from '../../lib/books'
import styles from '../../styles/Book.module.css'

export default function Book(props) {

	// Router:
	// - See the explanation of why we use Router Hook in the index.js page.
  const router = useRouter()

	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component;
	// - We clean our search states, because we are in a new page.
	useEffect(() => {
		props.setFormSearchStringWithValue('')
		props.zeroSearchCount()
	}, [])
	// - Visual effect on the book while route is on its way:
	// - See the explanation of this Effect Hook in the index.js page.
  useEffect(() => {
		const mainBook = document.getElementById(styles.book)
    const handleRouteChangeStart = (url, { shallow }) => {
			mainBook.classList.add("loading")
    }
    const handleRouteChangeComplete = (url, { shallow }) => {
			mainBook.classList.remove("loading")
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // - If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

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
  if (!props.book) {
    return (
				<>
		      <Head>
		        <meta name="robots" content="noindex" />
						<title>Humana</title>
		      </Head>
		      <main className="content" id={styles.book}>
						<p id="inexistent-book">Este livro não consta em nosso catálogo. Convidamos você a entrar em contato conosco para avaliarmos se conseguimos encomendá-lo. Nosso telefone/WhatsApp é: 49 3316-4566. Nosso email: <a href="mailto:humanasebolivraria@gmail.com">humanasebolivraria@gmail.com</a>.</p>
					</main>
		    </>
  	)
	}

	// Book image width:
	// - This value must be kept in accordance with the #book-image $book-image-width (Book.module.scss).
	const width = 260
		
	// Prepare the subcategories:
	var subcategories
	if ((props.book.subcategories) && (props.book.subcategories.length > 0)) {
		subcategories = (
			<div className="info-item">
				<span className="title">subcategoria(s)</span>&nbsp;
				{props.book.subcategories.map((subcat, key) => <Link key={key} href={`/?subcategory=${subcat.slug}`}><a>{subcat.name}</a></Link>).reduce((prev, curr) => [prev, ', ', curr])}
			</div>
		)
	}

	// Prepare the buy button (or the unavailable sign) and the price tag:
	// - If the book is available:
	if (props.book.stock_situation == "disponivel") {
		// Check if there is a discount and create the price tag:
		if (props.book.price_old !== undefined) {
			var discount = true
			var original_price = <div className='original_price'>{priceFormat(props.book.price_old)}</div>
		} else {
			var discount = false
		}
		var price_tag = (
			<>
				{discount ? original_price : ""}
				<div className="price">{priceFormat(props.book.price)}</div>
			</>
		)
		// ... and create the buy button:
		var button = (
	        <button className="snipcart-add-item"
	            data-item-id={props.book.id}
		          data-item-name={props.book.title}
	            data-item-price={props.book.price}
	            data-item-url={`/livro/${props.book.slug}`}
	            data-item-description={props.book.description}
	            data-item-image={props.book.mainImageUrl}
							data-item-file-guid={props.book.file_guid}
							{...((props.book.format == 'ebook') ? {'data-item-max-quantity': '1'} : {})}
	            data-item-weight={props.book.weight}
	            data-item-width={props.book.width}
	            data-item-length={props.book.length}
	            data-item-height={props.book.height}>
	            comprar
	        </button>
		)
	// - If the book is not available, we show the the unavailable sign and no price tag:
	// - We also take the opportunity to create the message about unavailable books.
	} else if (props.book.stock_situation == "esgotado_visivel") {
		var price_tag = null
		var button = <div className="unavailable">falta temporária</div>
		var sectionUnavailable = <section id="book-unavailable">No momento este item está em falta. Convidamos você a entrar em contato para avaliarmos a encomenda do que você deseja. Fone/WhatsApp: 49 3316-4566 / Instagram: <a href="https://www.instagram.com/humanasebolivraria/">@humanasebolivraria</a> / E-mail: <a href="mailto:humanasebolivraria@gmail.com">humanasebolivraria@gmail.com</a>.</section>
	}
	
	// Parse Markdown code on description to HTML code:
	// - Then, on the front-end, we decode the HTML code using dangerouslySetInnerHTML (https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).
	var md = require('markdown-it')()
	var formattedDescription = md.render(props.book.description)

	// Preparing the data to put on <Head> title and description, to be used for search engines & SEO:
	const headAuthors = props.book.authors.map((author) => author.name).flat().join(', ')
	
  return (
    <>
      <Head>
        <title>Humana | {headAuthors  + ': ' + props.book.title}</title>
				<meta name="description" content={`${props.book.title}, de ${headAuthors}. Publicado pela editora ${props.book.publishing_company.name} em ${props.book.publication_year}. `} />
      </Head>

      <main className="content" id={styles.book}>

				<article>

					<section id="book-image">
						<header hidden>
							<h1>Capa</h1>
						</header>
						{((props.book.special_category !== undefined) && (props.book.special_category.includes("humana_indica"))) ?
					  	<div className="humana_indica">Humana indica</div> :
							""
						}
						{((props.book.special_category !== undefined) && (props.book.special_category.includes("pre_venda"))) ?
					  	<div className="pre_venda">Pré-venda</div> :
							""
						}
					  <Image
     			 		alt={props.book.title}
					    src={props.book.mainImageUrl + '?w=' + width}
					    layout="fill"
					    className="custom-img"
							objectFit="contain"
					  />
					</section>
					
	        <section id="book-info">
						<header>
							<h1>{props.book.title}</h1>
							<div id="author">
								{props.book.authors.map((author, key) => <span key={key}>{author.name}</span>).reduce((prev, curr) => [prev, ', ', curr])}
							</div>
						</header>
						<div className="info-item"><span className="title">tipo</span> {props.book.format}</div>
						<div className="info-item"><span className="title">estado</span> {props.book.condition}</div>
						{(props.book.cover_type !== undefined) ?
					  	<div className="info-item"><span className="title">capa</span> {props.book.cover_type}</div> :
							""
						}
						<div className="info-item"><span className="title">editora</span> {props.book.publishing_company.name}</div>
						<div className="info-item"><span className="title">ano de publicação</span> {props.book.publication_year}</div>
						<div className="info-item">
							<span className="title">categoria(s)</span>&nbsp;
							{props.book.categories.map((cat, key) => <Link key={key} href={`/?category=${cat.slug}`}><a>{cat.name}</a></Link>).reduce((prev, curr) => [prev, ', ', curr])}
						</div>
						{props.book.subcategories ? subcategories : ""}
						<div className="info-item"><span className="title">número de páginas</span> {props.book.pages_number}</div>
						{(props.book.weight !== undefined) ?
					  	<div className="info-item"><span className="title">peso</span> {props.book.weight}g</div> :
							""
						}
						{((props.book.length !== undefined) && (props.book.width !== undefined) && (props.book.height !== undefined)) ?
					  	<div className="info-item"><span className="title">dimensões</span> {props.book.length}cm / {props.book.width}cm / {props.book.height}cm</div> :
							""
						}
					</section>
	
					<section id="book-price-and-button">
						<header hidden>
							<h1>Preço</h1>
						</header>
						{price_tag}
						{button}
					</section>
					
					{props.book.stock_situation == "esgotado_visivel" ? sectionUnavailable : ""}

					<section id="book-description">
						<header>
							<h1>descrição</h1>
						</header>
						<div className="formatted-text" dangerouslySetInnerHTML={{ __html: formattedDescription }}></div>
					</section>
					
          <div id="previous-page">
						<div id="previous-page-button" onClick={() => router.back()} >
							<div className="arrow-left"></div>
							<div className="text">voltar à tela anterior</div>
						</div>
					</div>
						
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
// - Next.js will attempt to re-generate the page when a request comes in at most once every 60 seconds (Incremental Static Regeneration);
// - Using ISR on Netlify: https://github.com/netlify/netlify-plugin-nextjs/blob/main/docs/isr.md
export const getStaticProps = async ({ params }) => {
	const book = await getABook(params.slug)
  return { 
    props: { book },
    revalidate: 60,
  };
};