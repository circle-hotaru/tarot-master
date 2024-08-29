import { useTranslation } from 'next-i18next'
import styles from './styles.module.css'

const Header: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="relative w-full">
      <h1 className="w-full text-3xl font-bold text-center z-10 absolute">
        🔮 {t('title')}
      </h1>
      <div className={styles.banner}>
        <img src="/images/banner.png" alt="Banner" className="w-full" />
      </div>
    </div>
  )
}

export default Header
