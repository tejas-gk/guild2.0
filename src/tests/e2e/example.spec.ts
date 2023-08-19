import { chromium } from '@playwright/test';

(async () => {
    // Launch the browser
    const browser = await chromium.launch();

    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    // Navigate to the website
    await page.goto('http://localhost:3000/');

    // Click on the "Sign In" button in the navbar
    await page.click('nav a[href="/signin"]');

    // Wait for the "Register" link to appear and click on it
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');

    // Fill in the registration form
    await page.fill('#name', 'Your Name');
    await page.fill('#email', 'your@email.com');
    await page.fill('#password', 'yourpassword');
    await page.fill('#username', 'yourusername');

    // Click on the "Register" button
    await page.click('button[type="submit"]');

    // Wait for the registration process to complete (you might need to adjust the selector)
    await page.waitForSelector('.registration-success');

    console.log('Registration successful!');

    // Close the browser
    await browser.close();
})();
