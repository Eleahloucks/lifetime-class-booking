//env file contains user and pass
const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const LOGIN_URL = 'https://my.lifetime.life/login.html';
const CLASSLIST_URL = 'https://my.lifetime.life/clubs/co/flatirons/classes.html';
const BOOKING_URL = 'https://yourgymwebsite.com/booking';



(async () => {
  try {
    // Your main function's code here
    const keywords = ['Pickleball'];
    // Open browser
    const browser = await puppeteer.launch({ headless: false });
    // Opens a new page at the login url
    const page = await browser.newPage();

    // Log in
    await login(page, username, password);

    // Navigate to the page with the list of classes
    await goToClassListPage(page);

    // Scrape available Pickleball classes
    const classes = await scrapePickleballClasses(page, keywords);;

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

async function scrapePickleballClasses(page, keywords) {
  try {
    // Wait for the schedule table or list to load
    await page.waitForSelector('.schedules-component-container');

    // Scrape the schedule data and find classes with the specified keywords in the title
    const classes = await page.evaluate((keywords) => {
      const rows = Array.from(document.querySelectorAll('.schedule-row'));
      return rows
        .map((row) => {
          const name = row.querySelector('.class-name')?.textContent.trim();
          const time = row.querySelector('.class-time')?.textContent.trim();
          const bookingUrl = row.querySelector('.booking-link')?.href;

          return { name, time, bookingUrl };
        })
        .filter((classInfo) => keywords.some((keyword) => classInfo.name.includes(keyword)));
    }, keywords);

    return classes;
  } catch (error) {
    console.error('Error in scrapeClassesWithKeywords function:', error);
    return [];
  }
}


async function bookClass(page, classInfo) {
  // Implement the class booking logic here
}

//export function for test.js
module.exports = { login, LOGIN_URL };
