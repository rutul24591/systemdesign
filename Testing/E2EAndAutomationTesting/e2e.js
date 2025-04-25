const puppeteer = require('puppeteer');

//IIFE - Immediately Invoked Function Expression
// Genearally puppeteer is used with IIFE. So code is wrapped in IIFE
// IIFE is used to avoid polluting the global scope
// and to create a private scope for the code inside it.
// IIFE is a function that is executed immediately after it is defined
// It is a common pattern in JavaScript to create a private scope
// and avoid polluting the global scope.
(async () => {
  // Launch a new browser instance
  // headless: false - to see the browser actions
  // headless: true - to run the browser in headless mode
  // headless mode is faster and uses less memory
  // but you won't be able to see the browser actions
  // headless mode is used for running tests in CI/CD pipelines, in cloud, in production
  const browser = await puppeteer.launch({
    headless: false, // Set to true to run in headless mode
    slowMo: 100,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();

  // await page.setViewport({
  //   width: 1920,
  //   height: 1080,
  //   deviceScaleFactor: 1
  // });

  // Navigate to the desired URL
  await page.goto(`https://namastedev.com`);
  // Wait for the page to load
  console.log(`Page loaded successfully`);

  await page.setViewport({ width: 1820, height: 1080 });

  const coursesPageLink = "ul > li:nth-child(2) > a";

  await page.waitForSelector(coursesPageLink);

  await page.click(coursesPageLink);
  console.log(`Clicked on the courses page link`);

  const enrollButton = ".bg-success-btn";
  await page.waitForSelector(enrollButton);

  await page.click(enrollButton);

  console.log("Namaste FSD page loaded");

  // Run this sript everyday at 08:00 AM - CRON job
  // Collect all the logs and errors send it to email - Amazon SES, nodemailer

  await browser.close();
})();


// Automate whole user journey
// Run this sript everyday at 08:00 AM - CRON job
// Collect all the logs and erorrs send it to email - Amazon SES