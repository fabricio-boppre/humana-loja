import Link from 'next/link'
import priceFormat from '../lib/utils'
import BookAuthors from '../components/BookAuthors.js'
import styles from './IndexBook.module.css'

export default function IndexBook(props) {

	const book = props.book
	const width = 180 // This value must be kept in accordance with the li.index_book flex-basis (IndexBook.module.scss).
	if (book.price_discount !== undefined) {
		var discount = true
		var active_price = book.price_discount
		var inactive_price_span = <span className='index_book_text_inactive_price'>{priceFormat(book.price)}</span>
	} else {
		var discount = false
		var active_price = book.price
	}

	return <li className={styles.index_book + (book.stock_situation == "esgotado_visivel" ? " unavailable" : "")}>

				    <Link href={`/livro/${book.slug}`}>
				      <a>
				        <img src={book.mainImageUrl + '?w=' + width}
				          	 alt={book.title}
										 title={book.title}
				        />
				      </a>
				    </Link>

						<div className="index_book_text">
		        	<div className={book.format == "livro" ? "index-book-text-format-livro" : "index-book-text-format-ebook"}>
								{book.format}
							</div>
					    <div className="index_book_text_title">
								<Link href={`/livro/${book.id}`}><a>{book.title}</a></Link>
							</div>
							<BookAuthors authors={book.authors} />
							<div className="index_book_text_price">
								{discount ? inactive_price_span : ""}
								{priceFormat(active_price)}
							</div>
							<div className="index_book_text_unavailable">esgotado</div>
			        <button className="snipcart-add-item"
			            data-item-id={book.id}
				          data-item-name={book.title}
			            data-item-price={active_price}
			            data-item-url="/"
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
						</div>

  			 </li>
}
