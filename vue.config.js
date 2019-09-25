module.exports = {
    css: {
        loaderOptions: {
            scss: {
                data: `
                    @import "@/scss/_main.scss";
                `,
            },
            sass: {
                data: `
                    @import "@/scss/_main.sass"
                `,
            },
        },
    },
};
