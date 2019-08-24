const path = require('path')
const nib = require('nib')
const images = require('next-images')
const withPlugins = require('next-compose-plugins')
const withStylus = require('@zeit/next-stylus')


// Next.js configuration
// ---------------------
const nextJsConfiguration = {
  // target: 'serverless',
  // useFileSystemPublicRoutes: false,

  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = { fs: 'empty' }

    return config
  }
}


// Next.js plugins
// ---------------

const nextJsPlugins = [

  images,
  [withStylus, {
    // next-stylus options
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    stylusLoaderOptions: {
      use: [
        nib()
      ],
      import: [
        path.resolve(__dirname, 'styles/imports/variables.styl'),
        // path.resolve(__dirname, 'styles/imports/mixins.styl'),
      ],
    },
  }]

]


// Finally, export the final result
module.exports = withPlugins(nextJsPlugins, nextJsConfiguration)
