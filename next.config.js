/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');
const nextConfig = {
  i18n: {
    locales: ['en', 'vn'],
    defaultLocale: 'vn',
  },
  reactStrictMode: true,
  ...nextTranslate(),
};

module.exports = nextConfig;
