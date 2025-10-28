import Link from "next/link";
import BookAuthors from "./BookAuthors";
import styles from "./RelatedBook.module.css";

export default function RelatedBook(props) {
  const book = props.book;

  // Book component width:
  // - This value must be kept in accordance with the li.related_book flex-basis (RelatedBook.module.scss).
  const width = 180;

  // Create the "Humana indica" and "Pré-venda" labels:
  const humana_indica = <div className="humana_indica">Humana indica</div>;
  const pre_venda = <div className="pre_venda">Pré-venda</div>;

  return (
    <li className={styles.related_book}>
      {book.special_category !== null &&
      book.special_category.includes("humana_indica")
        ? humana_indica
        : ""}
      {book.special_category !== null &&
      book.special_category.includes("pre_venda")
        ? pre_venda
        : ""}
      <Link href={`/livro/${book.slug}`}>
        <a>
          <div className="related_book_image">
            <img alt={book.title} src={book.mainImageUrl + "?w=" + width} />
          </div>
        </a>
      </Link>
      <div className="related_book_text">
        <div
          className={
            book.format == "livro"
              ? "related-book-text-format-livro"
              : "related-book-text-format-ebook"
          }
        >
          {book.format}
        </div>
        <div className="related_book_text_title">{book.title}</div>
        <BookAuthors authors={book.authors} />
      </div>
    </li>
  );
}
