import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
const Content = dynamic(() => import('~/components/Content'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TarotMaster</title>
        <meta
          name="description"
          content="Tarot Master is a recreation used for divination"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-4 md:py-8 flex flex-col items-center bg-gray-900 text-slate-100">
        <h1 className="text-3xl font-bold text-center">塔罗占卜 🔮</h1>

        <Content />
      </main>
    </div>
  )
}

export default Home
