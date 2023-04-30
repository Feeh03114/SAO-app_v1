/* eslint-disable no-undef */
//const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	//runtimeCaching,
	register: true,
	skipWaiting: true,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	//reactStrictMode: true,
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

		return config;
	},
});
