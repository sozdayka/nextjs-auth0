/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
    AUTH0_SECRET: 'use [openssl rand -hex 32] to generate a 32 bytes value',
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_ISSUER_BASE_URL: 'https://sozdayka.us.auth0.com',
    AUTH0_CLIENT_ID: 'ROvjey82bOGLD2UZMUmjagniGEfzOPSf',
    AUTH0_CLIENT_SECRET: 'tIvlJu1mT8XimZa8dlO8nw59QhaMELwhNecQCIPaSwioD5sQRG3RRUrhrVkopwfK'
  }
}

module.exports = nextConfig
