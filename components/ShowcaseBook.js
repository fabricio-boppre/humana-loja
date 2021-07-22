import Link from 'next/link'
import {priceFormat} from '../lib/utils'
import BookAuthors from './BookAuthors'
import styles from './ShowcaseBook.module.css'

export default function ShowcaseBook(props) {

	const book = props.book

	// Book component width:
	// - This value must be kept in accordance with the li.showcase_book flex-basis (ShowcaseBook.module.scss).
	const width = 180

	// Create the "Humana indica" label:
	const humana_indica = <div className="humana_indica">Humana indica</div>
	
	// Prepare the buy button (or the unavailable sign) and the price tag:
	// - If the book is available:
	if (book.stock_situation == "disponivel") {
		// Check if there is a discount and create the price tag:
		if (book.price_old !== undefined) {
			var discount = true
			var original_price_span = <span className='showcase_book_text_original_price'>{priceFormat(book.price_old)}</span>
		} else {
			var discount = false
		}
		var price_tag = (
			<div className="showcase_book_text_price">
				{discount ? original_price_span : ""}
				{priceFormat(book.price)}
			</div>
		)
		// ... and create the buy button:
		var button = (
      <button className="snipcart-add-item"
          data-item-id={book.id}
          data-item-name={book.title}
          data-item-price={book.price}
          data-item-url={`/livro/${book.slug}`}
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
		var button = <div className="showcase_book_text_unavailable">esgotado</div>
	}

	return <li className={styles.showcase_book}>
						{((book.special_category !== undefined) && (book.special_category.includes("humana_indica"))) ?
					  	humana_indica :
							""
						}
				    <Link href={`/livro/${book.slug}`}>
				      <a>
				        <img src={book.mainImageUrl + '?w=' + width}
				          	 alt={book.title}
										 title={book.title}
				        />
				      </a>
				    </Link>
						<div className="showcase_book_text">
		        	<div className={book.format == "livro" ? "showcase-book-text-format-livro" : "showcase-book-text-format-ebook"}>
								{book.format}
							</div>
					    <div className="showcase_book_text_title">
								<Link href={`/livro/${book.slug}`}><a>{book.title}</a></Link>
							</div>
							<BookAuthors authors={book.authors} />
							{price_tag}
							{button}
						</div>
  			 </li>
}
