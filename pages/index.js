import Head from 'next/head'
import { client } from '../lib/sanity'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Humana</title>
      </Head>

      <p>Em construção.</p>
    </>
  )
}

// export async function getStaticProps() {
//   const books = await client.fetch(`*[_type == "book"]`)
//   return {
//     props: {
//       books
//     }
//   }
// }