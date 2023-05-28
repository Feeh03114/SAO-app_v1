/* eslint-disable no-undef */
//const runtimeCaching = require("next-pwa/cache");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	//runtimeCaching,
	register: true,
	skipWaiting: true,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	reactStrictMode: true,
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		// if (!isServer) {
		// 	config.node = {
		// 		fs: "empty",
		// 	};
		// }
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}

		config.module.rules.push({
			test: /\^(?!tailwind.css).(le|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
				loader: 'css-loader',
				},
				{
				loader: 'less-loader',
				options: {
					sourceMap: true,
					lessOptions: {
					javascriptEnabled: true,
					},
				},
				},
			],
		})
	
		config.plugins.push(
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].css',
				chunkFilename: 'static/css/[contenthash].css',
			}),
		)

		return config;
	},
});
