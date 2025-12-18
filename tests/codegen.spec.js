import { test, expect } from '@playwright/test';

//codegen is a automatic code generator where we can do manual operation it will be converted into automation scripts
// comment for codegen run and save the file    
      // npx playwright codegen <url> --output=tests/filename.specs.js  

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="inventory-item-price"]').click();
  await page.locator('[data-test="inventory-item-price"]').click();
  await page.locator('[data-test="inventory-item-price"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
});