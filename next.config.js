/** @type {import('next').NextConfig} */
const million = require('million/compiler')

const nextConfig = {
	experimental: {
		serverActions: true,
	},
}

const millionConfig = {
	auto: true,
	// if you're using RSC:
	// auto: { rsc: true },
}

module.exports = million.next(nextConfig, millionConfig)
