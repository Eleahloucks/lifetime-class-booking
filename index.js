//env file contains user and pass
const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const LOGIN_URL = 'https://my.lifetime.life/login.html';
const CLASSLIST_URL = 'https://my.lifetime.life/clubs/co/flatirons/classes.html';
const BOOKING_URL = 'https://yourgymwebsite.com/booking';



(async function() => {
  try {
    // Your main function's code here
    // Open browser
    const browser = await puppeteer.launch();
    // Opens a new page at the login url
    const page = await browser.newPage();

    // Log in
    await login(page, username, password);

    // Navigate to the page with the list of classes
    await goToClassListPage(page);

    // Scrape available Pickleball classes
    const pickleballClasses = await scrapePickleballClasses(page);

    // Book each class
    for (const classInfo of pickleballClasses) {
      await bookClass(page, classInfo);
    }

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error in main script:', error);
  }
})();


async function login(page, username, password) {
  try {
    await page.goto(LOGIN_URL);
    await page.type('#account-username', username);
    await page.type('#account-password', password);
    await page.click('#login-btn');
    await page.waitForNavigation();
  } catch (error) {
    console.error('Error during login:', error);
  }
}


async function goToClassListPage(page) {
  try {
    await page.goto(CLASSLIST_URL);
    // may need to wait for some specific element to load before you start scraping.
    // If that's the case, you can use page.waitForSelector() function.
    // Example:
    // await page.waitForSelector('.class-list-selector');
  } catch (error) {
    console.error('Error in goToClassListPage function:', error);
  }
}

async function scrapePickleballClasses(page) {
  // Implement the scraping logic here
  // Return an array of class information, including booking URLs
  return [];
}

async function bookClass(page, classInfo) {
  // Implement the class booking logic here
}

//export function for test.js
module.exports = { login, LOGIN_URL };
