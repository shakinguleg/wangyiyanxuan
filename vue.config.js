module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 75,
                        unitPrecision: 5,
                        propList: ['*'],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                        exclude: /node_modules/i
                    })
                ]

            }
        }
    },
    devServer: {
        open: true,
        proxy: {
            "/api": {
                target: 'https://m.you.163.com',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                }
            }
        }
    }
}