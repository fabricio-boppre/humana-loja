import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthorsSlugs, getAnAuthor } from "../../lib/people";
import RelatedBook from "../../components/RelatedBook";
import AuthorCard from "../../components/AuthorCard";
import styles from "../../styles/Author.module.css";

export default function Author(props) {
  // Router:
  const router = useRouter();

  // Effects:
  // - See the explanation of why we use Effect Hook in the Masthead.js component;
  // - Visual effect on the author while route is on its way:
  // - See the explanation of this Effect Hook in the index.js page.
  useEffect(() => {
    const mainAuthor = document.getElementById(styles.author);
    const handleRouteChangeStart = (url, { shallow }) => {
      mainAuthor.classList.add("loading");
    };
    const handleRouteChangeComplete = (url, { shallow }) => {
      mainAuthor.classList.remove("loading");
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    // - If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running:
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Humana</title>
          <meta
            name="description"
            content="Loja virtual da Humana Sebo e Livraria. Enviamos para todo o Brasil."
          />
        </Head>
        <main className="content" id={styles.author}>
          <p id="loading-author">Localizando o autor ou autora...</p>
        </main>
      </>
    );
  }

  // If no author is found:
  // - This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed.
  if (!props.author) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <title>Humana</title>
          <meta
            name="description"
            content="Loja virtual da Humana Sebo e Livraria. Enviamos para todo o Brasil."
          />
        </Head>
        <main className="content" id={styles.author}>
          <p id="inexistent-author">
            Este autor ou autora não consta em nosso catálogo. Convidamos você a
            entrar em contato conosco para avaliarmos se conseguimos
            encomendá-lo. Nosso telefone/WhatsApp é: 49 3316-4566. Nosso email:{" "}
            <a href="mailto:humanasebolivraria@gmail.com">
              humanasebolivraria@gmail.com
            </a>
            .
          </p>
        </main>
      </>
    );
  }

  // Author image width:
  // - This value must be kept in accordance with the #author-image $author-image-width (Author.module.scss).
  const width = 260;

  // Parse Markdown code on description to HTML code:
  // - Then, on the front-end, we decode the HTML code using dangerouslySetInnerHTML (https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).
  if (props.author.description !== null) {
    var md = require("markdown-it")();
    var formattedDescription = md.render(props.author.description);
  }

  // Prepare the books:
  var related_books;
  if (props.author.books && props.author.books.length > 0) {
    related_books = (
      <section id="author-related-books">
        <header hidden>
          <h1>livros deste(a) autor(a) em nosso catálogo</h1>
        </header>
        <ul id="related-books-list">
          {props.author.books.map((book, key) => (
            <RelatedBook book={book} key={book.id} />
          ))}
        </ul>
      </section>
    );
  } else {
    related_books = (
      <p id="author-no-books">
        No momento não possuímos nenhum livro deste autor ou autora em nosso
        catálogo. Convidamos você a entrar em contato conosco para avaliarmos se
        conseguimos encomendá-lo. Nosso telefone/WhatsApp é: 49 3316-4566. Nosso
        email:{" "}
        <a href="mailto:humanasebolivraria@gmail.com">
          humanasebolivraria@gmail.com
        </a>
        .
      </p>
    );
  }

  // Prepare the related authors:
  var related_authors;
  if (props.author.related_authors && props.author.related_authors.length > 0) {
    related_authors = (
      <section id="author-related-authors">
        <header>
          <h1>autoras ou autores que podem lhe interessar</h1>
        </header>
        <ul id="related-authors-list">
          {props.author.related_authors.map((author, key) => (
            <AuthorCard author={author} key={author.id} />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{props.author.name + " | Humana"}</title>
        <meta
          name="description"
          content={`Livros de ${props.author.name} em nosso catálogo.`}
        />
      </Head>

      <main className="content" id={styles.author}>
        <article>
          {props.author.mainImageUrl && (
            <section id="author-image">
              <header hidden>
                <h1>Foto</h1>
              </header>
              <img
                alt={props.author.name}
                src={props.author.mainImageUrl + "?w=" + width}
              />
            </section>
          )}

          <section id="author-info">
            <header>
              <h1>{props.author.name}</h1>
            </header>
            {props.author.description && (
              <div
                className="info-item"
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              ></div>
            )}
          </section>

          {related_books}

          {related_authors}
        </article>
      </main>
    </>
  );
}

// Get the paths (the authors slugs) we want to pre-render:
export const getStaticPaths = async () => {
  const authorsSlugs = await getAuthorsSlugs();
  const paths = authorsSlugs.map((author) => ({
    params: { slug: author.slug },
  }));
  return { paths, fallback: true };
};

// This function gets called at build time on server-side and also after requests:
// - Next.js will attempt to re-generate the page when a request comes in at most once every 60 seconds (Incremental Static Regeneration);
// - Using ISR on Netlify: https://github.com/netlify/netlify-plugin-nextjs/blob/main/docs/isr.md
export const getStaticProps = async ({ params }) => {
  const author = await getAnAuthor(params.slug);
  return {
    props: { author },
    revalidate: 60,
  };
};
