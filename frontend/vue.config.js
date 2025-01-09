// frontend/vue.config.js

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0]["process.env"], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      });
      return definitions;
    });
  },
};
