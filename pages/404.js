import Head from 'next/head'

export default function Custom404() {
  return (
				<>
		      <Head>
		        <meta name="robots" content="noindex" />
						<title>Humana</title>
		      </Head>
		      <main className="content">
						<p id="inexistent-page">Esta página não existe.</p>
					</main>
		    </>	
	)
}