// ./next.config.js
module.exports = {
    basePath: process.env.BASE_PATH,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};