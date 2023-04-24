//env file contains user and pass
const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const CLASSLIST_URL = 'https://my.lifetime.life/clubs/co/flatirons/classes.html';





(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser actions
  const page = await browser.newPage();

  // Log in
  await login(page, username, password);

  // Navigate to the page with the list of classes
  await goToClassListPage(page);

  // You can comment out the rest of the script for testing purposes
  // ...

  // Close the browser
  await browser.close();
})();

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

async function goToClassListPage(page) {
  try {
    await page.goto(CLASSLIST_URL);
    // Wait for a specific element that signifies the page has loaded, e.g. a class list container
    await page.waitForSelector('.schedules-component-container');

    // Take a screenshot of the class list page for testing purposes
    await page.screenshot({ path: 'classListPage.png' });

    // You can also log a message to the console to confirm that the function worked
    console.log('Navigated to class list page successfully');
  } catch (error) {
    console.error('Error in goToClassListPage function:', error);
  }
}

