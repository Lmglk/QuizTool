module.exports = {
    entry: {
        'vendors': './src/vendors.tsx',
        'app': './src/app.tsx'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    devtool: "source-map",
    mode: 'none',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
};