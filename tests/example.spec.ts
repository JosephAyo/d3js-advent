import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/D3.js Visualization Project/);
});

test('has chart heading', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of the chart.
  await expect(page.getByRole('heading', { name: 'Sample Pie Chart' })).toBeVisible();
});
