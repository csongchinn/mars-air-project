const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cypress/reports/',
	reportPath: './cypress/reports/cucumber-htmlreport.html',
	metadata:{
        browser: { name: 'chrome', version: 'latest' },
        device: 'Local test machine',
        platform: { name: 'ubuntu', version: 'latest' }
    }
});