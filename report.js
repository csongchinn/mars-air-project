const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './cypress/reports/json/', // Must match the output in package.json
  reportPath: './cypress/reports/html/',
  metadata: {
    device: 'Local Test Machine',
    platform: {
      name: 'windows' // or 'ubuntu' for GitHub Actions
    }
  },
  customData: {
    title: 'Cypress Cucumber Run Info',
    data: [
      { label: 'Project', value: 'My Demo Project' },
      { label: 'Cycle', value: 'Regression' }
    ]
  }
});