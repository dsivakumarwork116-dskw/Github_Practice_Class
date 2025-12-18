import {test,expect} from "@playwright/test";

test("Practice Page Testing",async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    //Radio option
    await page.locator('input[value="radio1"]').check();  

    //Checkbox click using checkbox option
    const checkBoxOptions=['checkBoxOption1','checkBoxOption2'];
    for(let option of checkBoxOptions){
        await page.locator(`//*[@id="${option}"]`).click();
    }

    //checkbox click using option value
    // const options=['option1','option3'];
    // for(let option of options){
    //     await page.locator(`input[value="${option}"]`).click();
    // }

    //static dropdown menu
    await page.locator(`select[id="dropdown-class-example"]`).selectOption("option1");

    //Dynamic dropdown menu
    await page.locator(`[id="autocomplete"]`).fill("sr");
   await page.waitForSelector(`xpath=//*[@id="ui-id-1"]/ li`);
    const countriesList=await page.locator(`xpath=//*[@id="ui-id-1"]/ li`);
    let countriesCount=await countriesList.count();
    for(let i=0;i<countriesCount;i++){
        let countryName=await countriesList.nth(i).textContent();
        if(countryName==='Sri Lanka'){
            await countriesList.nth(i).click();
        }
    }
        console.log(countriesCount);

  
    await page.pause();
})