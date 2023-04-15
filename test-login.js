//env file contains user and pass
const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;


async function login(page, username, password) {
  console.log('Username:', username);
  try {
    // Replace with the actual selectors and login URL
    await page.goto('https://my.lifetime.life/login.html');
    await page.type('#account-username', username);
    await page.type('#account-password', password);
    await Promise.all([
      page.waitForNavigation(),
      page.click('#login-btn'),
    ]);
  } catch (error) {
    console.error('Error in login function:', error);
  }
}

(async () => {
  try {
    // Launch the browser and create a new page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await login(page, username, password);

    // Take a screenshot of the logged-in page
    await page.screenshot({ path: 'loggedin.png' });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error in main script:', error);
  }
})();
