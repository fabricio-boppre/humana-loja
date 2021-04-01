import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { readCMS } from '../../lib/sanity'
// import styles from '../../styles/Book.module.css'

export default function Book({book}) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running:
  if (router.isFallback) {
    return <div>Carregando...</div>
  }
  
  return (
    <>
      <Head>
        <title>Humana | {book.title}</title>
      </Head>

      <div id="livro">
        <h1>{book.title}</h1>
        <Image
          src={book.mainImageUrl}
          alt={book.title}
          width={150}
          height={217}
        />
        <button className="snipcart-add-item"
            data-item-id={book.id}
            data-item-price={book.price}
            data-item-weight={book.weight}
            data-item-url={`/livro/${book.id}`}
            data-item-description={book.description}
            data-item-image={book.mainImageUrl}
            data-item-name={book.title}>
            comprar
        </button>
        
        <Link href="/">
          <a>voltar</a>
        </Link>

      </div>
    </>
  )
}

const booksIdsQuery = `*[_type == "book"]{
                          "id": _id
                        }`;

export const getStaticPaths = async () => {
  // Get the paths (the books IDs) we want to pre-render:
  const booksIds = await readCMS.fetch(booksIdsQuery)
  const paths = booksIds.map(book => ({
    params: { id: book.id }
  }));
  return { paths, fallback: true };
};

const singleBookQuery = `*[_type == "book" && _id == $id] {
                            "id": _id, 
                            title,
                            description, 
                            price, 
                            weight, 
                            "mainImageUrl": main_image.asset->url
                         }[0]`;

// This function gets called at build time on server-side and also after requests:
export const getStaticProps = async ({ params }) => {
  const book = await readCMS.fetch(singleBookQuery, { id: params.id })
  return { 
    props: { book },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  };
};