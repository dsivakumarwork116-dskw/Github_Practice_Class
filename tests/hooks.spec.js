import{test,expect} from "@playwright/test"
//const {test,expect} = require"@platwright/test";

test.beforeAll(async()=>{
    console.log("iam going to automate the login functionnallity")
})

test.beforeEach("Swag labs login",async({page})=>{
    await page.setViewportSize({width:375,height:667});
    await page.goto("https://www.saucedemo.com/");
    
})

test("user one",async({page})=>{
    await page.fill('//input[@id="user-name"]',"standard_user");
    await page.fill('//input[@id="password"]',"secret_sauce");
    await page.click('//input[@id="login-button"]');
})

test("user two",async({page})=>{
    await page.fill('//input[@id="user-name"]',"problem_user");
    await page.fill('//input[@id="password"]',"secret_sauce");
    await page.click('//input[@id="login-button"]');
})

test("user three",async({page})=>{
    await page.fill('//input[@id="user-name"]',"performance_glitch_user");
    await page.fill('//input[@id="password"]',"secret_sauce");
    await page.click('//input[@id="login-button"]');
})

test.afterEach(async({page})=>{
    await page.click(("//button[@id='react-burger-menu-btn']"))
    await page.click(("//a[@id='logout_sidebar_link']"))
})

test.afterAll(()=>{
    console.log("Test executed successfully");
})
