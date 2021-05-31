import Link from 'next/link'
import BookAuthors from '../components/BookAuthors.js'
import styles from './IndexBook.module.css'

export default function IndexBook(props) {

	const book = props.book
	if (book.price_discount != undefined) {
		var discount = true
		var active_price = book.price_discount
		var inactive_price = <span className='index_book_text_inactive_price'>R$ {book.price}</span>
	} else {
		var discount = false
		var active_price = book.price
	}

	return <li className={styles.index_book}>

				    <Link href={`/livro/${book.id}`}>
				      <a>
				        <img src={book.mainImageUrl + '?w=180'}
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
								{discount ? inactive_price : ""}
								R$ {active_price}
							</div>
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
