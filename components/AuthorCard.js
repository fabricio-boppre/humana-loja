import Link from "next/link";
import styles from "./AuthorCard.module.css";

export default function AuthorCard(props) {
  const author = props.author;

  // Author component width:
  // - This value must be kept in accordance with the li.author flex-basis (AuthorCard.module.scss).
  const width = 180;

  return (
    <li className={styles.author}>
      <Link href={`/autor/${author.slug}`}>
        <a>
          <div className="author_image">
            <img alt={author.name} src={author.mainImageUrl + "?w=" + width} />
          </div>
          <div className="author_text">
            <div className="author_text_name">{author.name}</div>
          </div>
        </a>
      </Link>
    </li>
  );
}
