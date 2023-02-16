module.exports = {
    plugins: [
        require("postcss-import"),
        require("autoprefixer"),
        require("postcss-mixins"),
        require("postcss-nesting"),
        require("postcss-custom-media"),
        require("postcss-media-minmax"),
        require('postcss-custom-selectors'),
        require('postcss-preset-env')
    ],
};
