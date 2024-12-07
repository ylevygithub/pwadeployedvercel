
const { exec } = require('child_process');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// Function to run Lighthouse for performance testing
async function runLighthouse(url) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };
    const runnerResult = await lighthouse(url, options);
    
    console.log(`Lighthouse Performance Score: ${runnerResult.lhr.categories.performance.score * 100}`);
    await chrome.kill();
}

// Function to test API endpoints
function testApiEndpoint(endpoint, method = 'GET') {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: endpoint,
        method: method,
    };
    
    const req = require('http').request(options, (res) => {
        console.log(`API Test - Endpoint: ${endpoint}, Status Code: ${res.statusCode}`);
        res.on('data', (d) => process.stdout.write(d));
    });
    
    req.on('error', (e) => console.error(`Error: ${e.message}`));
    req.end();
}

// Main function to execute tests
(async function main() {
    console.log('Starting Performance and API Tests...');
    try {
        // Test Lighthouse Performance
        await runLighthouse('http://localhost:3000');
        
        // Test API Endpoints
        testApiEndpoint('/api/movies', 'GET');
        testApiEndpoint('/api/users', 'POST');
    } catch (error) {
        console.error(`Testing failed: ${error.message}`);
    }
})();
