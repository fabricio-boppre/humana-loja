import Head from 'next/head'
import Link from 'next/link'
import { readCMS } from '../lib/sanity'
// import styles from '../styles/Home.module.css'

const Books = ({ books }) => {
  return (
      <>
        <Head>
          <title>Humana | Livros</title>
        </Head>

        <ul>
          {books.map(book => (
            <li key={book.id} className="list__item">
              <Link href={`/livro/${book.id}`}>
                <a>
                  {book.title}
                </a>
              </Link>
							<br />
							<span className="format">({book.format})</span>
            </li>
          ))}
        </ul>
      </>
  )
}
                    
const booksQuery = `*[_type == "book"]{
                      "id": _id, 
                      title,
                      description, 
                      price, 
                      weight,
											format, 
                      "mainImageUrl": main_image.asset->url
                    }`;

// This function gets called at build time on server-side and also after requests:
export async function getStaticProps() {
  const books = await readCMS.fetch(booksQuery)
  return {
    props: {
      books
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  }
}

export default Books;