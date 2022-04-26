import Head from 'next/head'

export default function Custom404() {
  return (
				<>
		      <Head>
		        <meta name="robots" content="noindex" />
						<title>Humana</title>
						<meta name="description" content="Site da Humana Sebo e Livraria. Enviamos para todo o Brasil." />
		      </Head>
		      <main className="content">
						<p id="inexistent-page">Esta página não existe.</p>
					</main>
		    </>	
	)
}