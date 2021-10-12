module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },

      use: ["@svgr/webpack"],
    });

    return config;
  }, // next.config.js
  images: {
    domains: ["www.gravatar.com", "localhost", "http:localhost:5000"],
  },
};
