// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
const path = require('path')

const createNextPluginPreval = require('next-plugin-preval/config')
const withNextPluginPreval = createNextPluginPreval()

const withImages = require('next-images')
// const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')

module.exports = withNextPluginPreval(
  withImages({
    trailingSlash: true,

    webpack (config, options) {
      const raw = Object.keys(process.env)
        .reduce(
          (env, key) => {
            env[key] = process.env[key]
            return env
          },
          {
            AUTH0_SECRET: process.env.AUTH0_SECRET,
            AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
            AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
            AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
            AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
          }
        )

      const env = {
        'process.env': Object.keys(raw).reduce((env, key) => {
          env[key] = JSON.stringify(raw[key])
          return env
        }, {})
      }

      config.plugins.push(
        new options.webpack.DefinePlugin(env)
      )

      return config
    }
  })
)
