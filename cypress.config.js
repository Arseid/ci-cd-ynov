require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.REACT_APP_SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
      config.env.REACT_APP_POSTS_SERVER_BASE_URL = process.env.REACT_APP_POSTS_SERVER_BASE_URL;
      return config;
    },
  },
});
