import Link from 'next/link'

export default function BookAuthors(props) {
	const AuthorsList = props.authors.map((author, key) => <span key={key}>{author.name}</span>).reduce((prev, curr) => [prev, ', ', curr])		
	return <div className="index_book_text_author">{AuthorsList}</div>
}
