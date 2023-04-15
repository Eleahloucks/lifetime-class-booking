//env file contains user and pass
require('dotenv').config();
const puppeteer = require('puppeteer');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const LOGIN_URL = 'https://my.lifetime.life/login.html';
const CLASSLIST_URL = 'https://my.lifetime.life/clubs/co/flatirons/classes.html';
const BOOKING_URL = 'https://yourgymwebsite.com/booking';


// Using await inside these async functions ensures that the code inside the functions
//is executed sequentially, and each step is completed before moving to the next one.
(async () => {
  //open browser
  const browser = await puppeteer.launch();
  //opens a new page at the login url
  const page = await browser.newPage();

  // Log in
  await login(page, USERNAME, PASSWORD);

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
})();

async function login(page, username, password) {
  // Navigate to the login page
  await page.goto(LOGIN_URL);

  // Fill in the username and password fields
  await page.type('#account-username', username);
  await page.type('#account-password', password);

  // Click the login button and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click('#login-btn'),
  ]);
  // Take a screenshot of the logged-in page
  await page.screenshot({ path: 'loggedin.png' });

  // Close the browser
  await browser.close();
}

async function goToClassListPage(page) {
  // Implement the navigation logic here
}

async function scrapePickleballClasses(page) {
  // Implement the scraping logic here
  // Return an array of class information, including booking URLs
}

async function bookClass(page, classInfo) {
  // Implement the class booking logic here
}
