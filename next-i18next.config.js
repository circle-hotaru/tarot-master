module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
  defaultNS: 'common',
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
}
