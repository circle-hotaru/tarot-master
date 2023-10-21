import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Header from '~/components/Header'
const Content = dynamic(() => import('~/components/Content'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div className='bg-gray-900'>
      <Head>
        <title>AI塔罗占卜</title>
        <meta
          name="description"
          content="与AI塔罗大师一起踏上一段神秘的塔罗之旅，预测未来并探索塔罗卡牌的智慧和奥秘。"
        />
        <meta name="keywords" content="塔罗占卜, 塔罗牌, AI, Tarot, OpenAI, ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-xl min-h-screen mx-auto flex flex-col items-center text-slate-100">
        <Header />
        <Content />
      </main>
    </div>
  )
}

export default Home
