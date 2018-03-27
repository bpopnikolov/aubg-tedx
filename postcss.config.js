module.exports = {
    parser: 'postcss-scss',
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'postcss-simple-vars': {},
        // 'postcss-uncss': {
        //     html: ['src/index.html'],
        //     ignore: ['.fade'],
        // },
        'cssnano': {},

    },
};
