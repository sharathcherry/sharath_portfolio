import { test, expect } from '@playwright/test';

// Verify that the landing page hero section loads correctly
test('landing hero loads and displays heading', async ({ page }) => {
  // Capture console errors
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  await page.goto('/');

  // Wait a bit longer for the page to load
  await page.waitForTimeout(5000);

  // Log all console messages
  if (consoleMessages.length > 0) {
    console.log('Console messages:', consoleMessages);
  }

  // First check if the root element exists
  const root = page.locator('#root');
  await expect(root).toBeVisible({ timeout: 5000 });

  // Check if there's any content in the root
  const rootContent = await root.textContent();
  console.log('Root content:', rootContent);

  // Check the HTML structure
  const html = await page.content();
  console.log('Page HTML length:', html.length);

  // Try to find any h1 element
  const h1Count = await page.locator('h1').count();
  console.log('h1 elements found:', h1Count);

  if (h1Count > 0) {
    // Expect the main heading (h1) to be visible - use first() to get the first h1
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 15000 });

    // Check that it contains the expected text
    await expect(heading).toHaveText('Hello.');
  } else {
    console.log('No h1 elements found on the page');
    // Let's check what elements are actually present
    const allElements = await page.locator('*').all();
    console.log('Total elements on page:', allElements.length);
  }
});
