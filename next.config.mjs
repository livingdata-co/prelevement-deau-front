// Next.config.js
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Gestion des fichiers .woff2
    config.module.rules.push({
      test: /\.woff2$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[hash][ext][query]'
      }
    })

    // Alias pour '@'
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')

    // Désactiver les sourcemaps pour sass-loader
    // Fix Module parse failed: Maximum call stack size exceeded : dsfr_plus_icons.scss
    for (const rule of config.module.rules) {
      if (rule.test && rule.test.toString().includes('.scss') && Array.isArray(rule.use)) {
        for (const moduleLoader of rule.use) {
          if (
            moduleLoader.loader
              && moduleLoader.loader.includes('sass-loader')
          ) {
            moduleLoader.options = {
              ...moduleLoader.options,
              sourceMap: false
            }
          }
        }
      }
    }

    return config
  }
}

export default nextConfig
