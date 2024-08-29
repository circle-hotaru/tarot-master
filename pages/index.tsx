import { useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
const Content = dynamic(() => import('~/components/Content'), { ssr: false })

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  useEffect(() => {
    const userLang = navigator.language
    const defaultLang = userLang.startsWith('zh') ? 'zh' : 'en'
    if (router.locale !== defaultLang) {
      router.push(router.pathname, router.asPath, { locale: defaultLang })
    }
  }, [])

  return (
    <div className="bg-gray-900">
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta
          name="keywords"
          content="塔罗占卜, 塔罗牌, AI, Tarot, OpenAI, ChatGPT"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-xl min-h-screen mx-auto flex flex-col items-center text-slate-100">
        <Header />
        <Content />
        <Footer />
      </main>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Home
