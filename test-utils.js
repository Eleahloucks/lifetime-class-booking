const createMockPage = () => {
  return {
    goto: jest.fn(),
    type: jest.fn(),
    click: jest.fn(),
    waitForNavigation: jest.fn(),
    screenshot: jest.fn(),
    // Add any other methods that you use in your Puppeteer script.
  };
};

// At the end of your test-utils.js file, add the following line:
module.exports = { createMockPage };
