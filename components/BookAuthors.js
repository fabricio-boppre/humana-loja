import Link from "next/link";

export default function BookAuthors(props) {
  const AuthorsList = props.authors
    .map(function (author, key) {
      if (author.slug !== null) {
        return (
          <span key={key}>
            <Link key={key} href={`/autor/${author.slug}`}>
              {author.name}
            </Link>
          </span>
        );
      }
      return <span key={key}>{author.name}</span>;
    })
    .reduce((prev, curr) => [prev, ", ", curr]);
  return <div className="showcase_book_text_author">{AuthorsList}</div>;
}
