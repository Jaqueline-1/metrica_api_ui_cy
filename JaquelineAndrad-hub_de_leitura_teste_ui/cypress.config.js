const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "szdq7a",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       require('cypress-mochawesome-reporter/plugin')(on);

    },
    baseUrl:"http://localhost:3000",
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000

  },
});
