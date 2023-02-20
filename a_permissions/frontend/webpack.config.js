const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/** =====================================
 * WORKAROUND: https://stackoverflow.com/a/72219174/2332365
 * md4 algorithm is not available anymore in NodeJS 17+ (because of lib SSL 3).
 * In that case, silently replace md4 by md5 algorithm.
*/
const crypto = require('crypto')
try {
    crypto.createHash('md4')
} catch (e) {
    console.warn('Crypto "md4" is not supported anymore by this Node version')
    const origCreateHash = crypto.createHash
    crypto.createHash = (alg, opts) => {
        return origCreateHash(alg === 'md4' ? 'md5' : alg, opts)
    }
}
// =====================================

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    devServer: {
        historyApiFallback: true,
        port: 4000,
        proxy: {
            '/users*': {
                target: 'http://localhost:3000'
            }
         }
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}