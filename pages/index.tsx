import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Header from '~/components/Header'
const Content = dynamic(() => import('~/components/Content'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div className="bg-gray-900">
      <Head>
        <title>Tarot Master</title>
        <meta
          name="description"
          content="Tarot Master is a recreation used for divination"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center text-slate-100">
        <Header />
        <Content />
      </main>
    </div>
  )
}

export default Home
