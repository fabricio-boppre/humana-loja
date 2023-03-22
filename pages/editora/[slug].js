import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { priceFormat } from "../../lib/utils";
import {
  getPublishingCompaniesSlugs,
  getAPublishingCompany,
} from "../../lib/publishing_companies";
import RelatedBook from "../../components/RelatedBook";
import styles from "../../styles/PublishingCompany.module.css";

export default function PublishingCompany(props) {
  // Router:
  const router = useRouter();

  // Effects:
  // - See the explanation of why we use Effect Hook in the Masthead.js component;
  // - Visual effect on the author while route is on its way:
  // - See the explanation of this Effect Hook in the index.js page.
  useEffect(() => {
    const mainPublishingCompany = document.getElementById(
      styles.publishing_company
    );
    const handleRouteChangeStart = (url, { shallow }) => {
      mainPublishingCompany.classList.add("loading");
    };
    const handleRouteChangeComplete = (url, { shallow }) => {
      mainPublishingCompany.classList.remove("loading");
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
        <main className="content" id={styles.publishing_company}>
          <p id="loading_publishing_company">Localizando a editora...</p>
        </main>
      </>
    );
  }

  // If no publishing company is found:
  // - This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed.
  if (!props.publishing_company) {
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
        <main className="content" id={styles.publishing_company}>
          <p id="inexistent_publishing_company">
            Esta editora não consta em nosso catálogo. Convidamos você a entrar
            em contato conosco para avaliarmos se conseguimos encomendar seus
            livros. Nosso telefone/WhatsApp é: 49 3316-4566. Nosso email:{" "}
            <a href="mailto:humanasebolivraria@gmail.com">
              humanasebolivraria@gmail.com
            </a>
            .
          </p>
        </main>
      </>
    );
  }

  // Parse Markdown code on description to HTML code:
  // - Then, on the front-end, we decode the HTML code using dangerouslySetInnerHTML (https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).
  if (props.publishing_company.description !== null) {
    var md = require("markdown-it")();
    var formattedDescription = md.render(props.publishing_company.description);
  }

  // Prepare the books:
  var related_books;
  if (
    props.publishing_company.books &&
    props.publishing_company.books.length > 0
  ) {
    related_books = (
      <section id="publishing_company_related_books">
        <header hidden>
          <h1>livros desta editora em nosso catálogo</h1>
        </header>
        <ul id="related-books-list">
          {props.publishing_company.books.map((book, key) => (
            <RelatedBook book={book} key={book.id} />
          ))}
        </ul>
      </section>
    );
  } else {
    related_books = (
      <p id="publishing_company_no_books">
        No momento não possuímos nenhum livro desta editora em nosso catálogo.
        Convidamos você a entrar em contato conosco para avaliarmos se
        conseguimos encomendar seus livros. Nosso telefone/WhatsApp é: 49
        3316-4566. Nosso email:{" "}
        <a href="mailto:humanasebolivraria@gmail.com">
          humanasebolivraria@gmail.com
        </a>
        .
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>{props.publishing_company.name + " | Humana"}</title>
        <meta
          name="description"
          content={`Livros da editora ${props.publishing_company.name} em nosso catálogo.`}
        />
      </Head>

      <main className="content" id={styles.publishing_company}>
        <article>
          <section id="publishing_company_info">
            <header>
              <h1>{props.publishing_company.name}</h1>
            </header>
            {props.publishing_company.description && (
              <div
                className="info-item"
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              ></div>
            )}
          </section>

          {related_books}
        </article>
      </main>
    </>
  );
}

// Get the paths (the publishing companies slugs) we want to pre-render:
export const getStaticPaths = async () => {
  const publishingCompaniesSlugs = await getPublishingCompaniesSlugs();
  const paths = publishingCompaniesSlugs.map((publishing_company) => ({
    params: { slug: publishing_company.slug },
  }));
  return { paths, fallback: true };
};

// This function gets called at build time on server-side and also after requests:
// - Next.js will attempt to re-generate the page when a request comes in at most once every 60 seconds (Incremental Static Regeneration);
// - Using ISR on Netlify: https://github.com/netlify/netlify-plugin-nextjs/blob/main/docs/isr.md
export const getStaticProps = async ({ params }) => {
  const publishing_company = await getAPublishingCompany(params.slug);
  return {
    props: { publishing_company },
    revalidate: 60,
  };
};
