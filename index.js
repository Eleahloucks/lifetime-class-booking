//env file contains user and pass
require('dotenv').config();
const puppeteer = require('puppeteer');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const LOGIN_URL = 'https://my.lifetime.life/login.html';
const SCHEDULE_URL = 'https://my.lifetime.life/clubs/co/flatirons/classes.html?selectedDate=2023-04-15&mode=week&location=Flatirons';
const BOOKING_URL = 'https://yourgymwebsite.com/booking';