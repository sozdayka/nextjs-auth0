/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
    AUTH0_SECRET: 'viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3s',
    AUTH0_BASE_URL: 'https://main.d36qbm057x7wa8.amplifyapp.com',
    AUTH0_ISSUER_BASE_URL: 'https://sozdayka.us.auth0.com',
    AUTH0_CLIENT_ID: 'ROvjey82bOGLD2UZMUmjagniGEfzOPSf',
    AUTH0_CLIENT_SECRET: 'tIvlJu1mT8XimZa8dlO8nw59QhaMELwhNecQCIPaSwioD5sQRG3RRUrhrVkopwfK'
  }
}

module.exports = nextConfig
