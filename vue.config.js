module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://lifestealer86',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};