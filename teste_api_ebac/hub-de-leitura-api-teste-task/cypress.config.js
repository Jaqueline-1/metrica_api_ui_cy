const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yc4s14',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/api/'
  },
});
