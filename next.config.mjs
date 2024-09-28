/** @type {import('next').NextConfig} */
const nextConfig = {
 /**
   * Internationalization configuration
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   */
  i18n: {
    /**
     * The default locale to use when visiting a non-locale prefixed path
     * @type {string}
     */
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
   /**
   * Configuration for Next.js Image component
   * @see https://nextjs.org/docs/api-reference/next/image
   */
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
