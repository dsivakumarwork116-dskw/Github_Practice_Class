import {test,expect} from "@playwright/test";

test("Webtable automation",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        const column=page.locator("//table[@id='productTable']/thead//th");
        const row=page.locator("//table[@id='productTable']/tbody//tr");
        console.log("Total column=",await column.count());
        console.log("Total row=",await row.count());

       //single checkbox
        // const name=await row.filter({
        //     has:page.locator('td'),
        //     hasText:"Tablet"
        // })

        // await name.locator('//input[@type="checkbox"]').check();

        //multiple checkbox
        // const name=await row.filter({
        //     has:page.locator('td'),
        //     hasText:/Tablet|Smartwatch|Laptop/
        // })
        // const count =await name.count();
        // for(let i=0;i<count;i++){
        //     await name.nth(i).locator('//input[@type="checkbox"]').check();
        // }

    // Check all

        const totalPages=await page.locator('//ul[@id="pagination"]/li').count();
        console.log(totalPages);
        for(let i=0;i<totalPages;i++){
            const name=await row.filter({
                has:page.locator('td'),
            })
            const count =await name.count();
            for(let j=0;j<count;j++){
                await name.nth(j).locator('//input[@type="checkbox"]').check();
            }
            
            if(i<totalPages-1)
            {
                await page.locator('//ul[@id="pagination"]/li').nth(i+1).click();
            }
            else{
                break;
            }
        }
        await page.pause();
    })


// import { test, expect } from "@playwright/test";

// test("Pagination table check and assert", async ({ page }) => {
//     await page.goto("https://testautomationpractice.blogspot.com/");
    
//     const paginationList = page.locator('//ul[@id="pagination"]/li');
//     const tableRows = page.locator("//table[@id='productTable']/tbody//tr");
//     const totalPages = await paginationList.count();
    
//     // --- PART 1: CHECK ALL CHECKBOXES ACROSS ALL PAGES ---
//     console.log("--- Starting Check Phase ---");
//     for (let i = 0; i < totalPages; i++) {
        
//         const rowCount = await tableRows.count();
//         console.log(`Checking boxes on Page ${i + 1}. Rows found: ${rowCount}`);

//         // Loop through all visible rows on the current page and check the box
//         for (let j = 0; j < rowCount; j++) {
//             await tableRows.nth(j).locator('//input[@type="checkbox"]').check();
//         }

//         // Navigate to the next page if it exists
//         if (i < totalPages - 1) {
//             await paginationList.nth(i + 1).click();
//             await page.waitForTimeout(5000); // Wait for content load
//         }
//     }

//     // --- PART 2: ASSERTION ACROSS ALL PAGES ---
//     console.log("--- Starting Assertion Phase ---");
//     // Start the loop again from the first page (index 0)
//     for (let i = 0; i < totalPages; i++) {

//         // Find all checkbox elements on the CURRENT page
//         const allCheckboxesOnPage = page.locator('//table[@id="productTable"]/tbody//tr//input[@type="checkbox"]');
//         const count = await allCheckboxesOnPage.count();
        
//         console.log(`Asserting state on Page ${i + 1}. Checkboxes to verify: ${count}`);

//         // Assert every single checkbox on the current page is checked
//         for (let j = 0; j < count; j++) {
//             // Assertion: The specific checkbox must be checked
//             await expect(allCheckboxesOnPage.nth(j), 
//                 `Checkbox in Row ${j + 1} on Page ${i + 1} should be checked`
//             ).toBeChecked();
//         }
        
//         // Navigate to the next page if it exists
//         if (i < totalPages - 1) {
//             await paginationList.nth(i + 1).click();
//             await page.waitForTimeout(500); // Wait for content load
//         }
//     }

//     // Optional: Add a pause to inspect the final state after all assertions pass
//     await page.pause();
// });

