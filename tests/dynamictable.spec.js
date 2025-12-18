import {test,expect} from "@playwright/test";

test("Dynamic Table data Handling",async({page})=>{
    await page.goto("https://www.espncricinfo.com/records/most-runs-in-career-83548")
    const playerName="SR Tendulkar (IND)";
    const playerData=page.locator(" //table")
    const rowCount=await playerData.count();
    for(let i=0;i<rowCount;i++){
        const rowText=await playerData.nth(i).innerText();
        if(rowText.includes(playerName)){
            const columns=playerData.nth(i).locator("td");
            const colCount=await columns.count();
            for(let j=0;j<colCount;j++){
                const colText=await columns.nth(j).innerText();
                console.log(colText);
            }
        }
    }


})