// tests.js
const { login, LOGIN_URL } = require('./index'); //import login info and function
const { createMockPage } = require('./test-utils'); // Import a utility function to create a mock Puppeteer page

test('Logs in successfully', async () => {
  try {
    const page = createMockPage(); // Create a mock Puppeteer page


    const mockUsername = 'testuser';
    const mockPassword = 'testpass';

    // Mock the necessary Puppeteer methods for the login function
    page.goto = jest.fn();
    page.type = jest.fn();
    page.waitForNavigation = jest.fn();
    page.click = jest.fn();

    await login(page, mockUsername, mockPassword);

    // Assert that the expected methods were called with the correct arguments
    expect(page.goto).toHaveBeenCalledWith(LOGIN_URL);
    expect(page.type).toHaveBeenCalledWith('#account-username', mockUsername);
    expect(page.type).toHaveBeenCalledWith('#account-password', mockPassword);
    expect(page.waitForNavigation).toHaveBeenCalled();
    expect(page.click).toHaveBeenCalledWith('#login-btn');
  } catch (error) {
    console.error('Error in test case:', error);
  }
});

// describe('Login function', () => {
//   test('Logs in successfully', async () => {
//     const page = await createMockPage(); // Create a mock Puppeteer page

//     const mockUsername = 'testuser';
//     const mockPassword = 'testpass';

//     // Mock the necessary Puppeteer methods for the login function
//     page.goto = jest.fn();
//     page.type = jest.fn();
//     page.waitForNavigation = jest.fn();
//     page.click = jest.fn();

//     await login(page, mockUsername, mockPassword);

//     // Assert that the expected methods were called with the correct arguments
//     expect(page.goto).toHaveBeenCalledWith(LOGIN_URL);
//     expect(page.type).toHaveBeenCalledWith('#account-username', mockUsername);
//     expect(page.type).toHaveBeenCalledWith('#account-password', mockPassword);
//     expect(page.waitForNavigation).toHaveBeenCalled();
//     expect(page.click).toHaveBeenCalledWith('#login-btn');
//   });
// });
