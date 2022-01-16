const path = require("path");
const CracoAlias = require('craco-alias')

module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [{
                    type: "javascript/auto",
                    test: /\.mjs$/,
                    include: /node_modules/,
                }],
            }
        },
        alias: {
            '@ui': path.resolve(__dirname, 'src/Assets/UI/'),
        },
    },
    plugins: [{
        plugin: CracoAlias,
        options: {
            source: 'tsconfig',
            baseUrl: '.',
            tsConfigPath: './tsconfig.extend.json',
        },
    }]
};