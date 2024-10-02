import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { ExternalLink } from 'lucide-react'

const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col items-center gap-2">
      <Link href='https://talk.incircle.dev' className='flex items-center hover:text-violet-500' target='_blank'><span>{t('talk_boost_link')}</span><ExternalLink size={16} /></Link>
      <p className='mt-0'>
        Made with ❤️ by{' '}
        <Link className="font-bold" href="https://github.com/circle-hotaru" target='_blank'>
          incircle
        </Link>
      </p>
    </div>
  )
}

export default Footer
