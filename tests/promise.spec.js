import {test,expect} from "@playwright/test";



test("Download file",async({page})=>{
await page.goto("https://the-internet.herokuapp.com/download");
const[download] =await Promise.all([
    page.waitForEvent("download"),
    page.locator('//a[text()="image.png"]').click()
])


})