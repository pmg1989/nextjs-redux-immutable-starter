const path = require('path')
const withLess = require('@zeit/next-less')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = withLess({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    webpack: (config, { dev, isServer }) => {

        /* Enable only in Production */
        if (!dev) {
            // Service Worker
            config.plugins.push(
                new SWPrecacheWebpackPlugin({
                    cacheId: 'next-ss',
                    filepath: './static/sw.js',
                    minify: true,
                    staticFileGlobsIgnorePatterns: [/\.next\//],
                    staticFileGlobs: [
                        'static/**/*' // Precache all static files by default
                    ],
                    runtimeCaching: [
                        // Example with different handlers
                        {
                            handler: 'fastest',
                            urlPattern: /[.](png|jpg|css)/
                        },
                        {
                            handler: 'networkFirst',
                            urlPattern: /^http.*/ //cache all files
                        }
                    ]
                })
            )
        }
        
        return config
    }
})