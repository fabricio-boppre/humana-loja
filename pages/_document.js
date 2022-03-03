import { Html, Head, Main, NextScript } from 'next/document'

// A custom Document is commonly used to augment your application's <html> and <body> tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.
// - We use here to change the attribute "lang" of the <html> tag;
// - https://nextjs.org/docs/advanced-features/custom-document
export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <meta name="description" content="Site da Humana Sebo e Livraria. Enviamos para todo o Brasil." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}