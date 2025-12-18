import {test,expect} from "@playwright/test";
import { text } from "stream/consumers";

test("Parabank Website Checking",async({page})=>{
    await page.goto('https://parabank.parasoft.com/parabank/lookup.htm');
     await page.getByRole("link",{name:"Forgot login info?"}).click();
    //await page.getByRole("link").click();
    //await page.getByText("Admin Page").click();
    //await page.getByLabel().fill("Siva");
    await page.getByTitle("ParaBank").click();
    await page.pause();
})