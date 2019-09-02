module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: '@import "~@/scss/_main.scss"',
                implementation: require('sass'),
            },
        },
        sourceMap: true,
    },
    chainWebpack: config => {
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
            config.module
                .rule('scss')
                .oneOf(match)
                .use('sass-loader')
                .tap(opt => Object.assign(opt, { data: `@import '~@/scss/_main.scss';` }));
        });
    },
    devServer: {
        watchOptions: {
            poll: true,
        },
    },
};
