import {test,expect} from "@playwright/test";
import loginData from "../testData/login.json";

test("Positive LogIn test",async({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('div input[id="username"]').fill(loginData.valid_username);
    await page.locator('div input[id="password"]').fill(loginData.valid_password);
    await page.locator('button[id="submit"]').click();
    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//i);

    const title=await page.locator('[class="post-title"]').textContent();
    expect(title).toBe("Logged In Successfully");

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await page.pause();
})

test("Negative username test",async({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('div input[id="username"]').fill(loginData.invalid_username);
    await page.locator('div input[id="password"]').fill(loginData.valid_password);
    await page.locator("xpath=//button[@id='submit']").click();          //xpath selector

    const errorMessage=await page.locator('div[id="error"]').textContent();
    expect(errorMessage).toBe("Your username is invalid!")
    await page.pause();
})

test("Negative password test",async({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('div input[id="username"]').fill(loginData.valid_username);
    await page.locator('div input[id="password"]').fill(loginData.invalid_password);
    await page.locator('button[id="submit"]').click();

    const errorMessage=await page.locator('div[id="error"]').textContent();
    expect(errorMessage).toBe("Your password is invalid!")
    await page.pause();
})

