module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    [
      'tailwindcss',
      {
        // 在生产环境中移除未使用的 CSS 代码
        purge: process.env.NODE_ENV === 'production',
        // 配置文件路径
        config: './tailwind.config.js',
      },
    ],
    [
      'autoprefixer',
      {
        // 针对 flexbox 布局的一些 bug 进行修复
        flexbox: 'no-2009',
      },
    ],
  ],
}
