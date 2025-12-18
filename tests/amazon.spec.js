import {test,expect} from "@playwright/test";

test("Search iphone in amazon searchbox and select first resultant phone",async({page})=>{
      await page.goto("https://www.amazon.in/");
      await page.locator('[class="nav-search-field "] #twotabsearchtextbox').fill("iphone"); 
      await page.locator('[class="nav-right"] [class="nav-search-submit nav-sprite"]').click();
      //await page.locator('[data-component-type="s-search-results"] [class="a-link-normal s-line-clamp-2 s-line-clamp-3-for-col-12 s-link-style a-text-normal"]').nth(0).click();
      //await page.locator('[data-component-type="s-search-results"] [data-index="3"] [class="a-link-normal s-line-clamp-2 s-line-clamp-3-for-col-12 s-link-style a-text-normal"]').click();
      await page.locator('[data-component-type="s-search-results"] [class="a-link-normal s-line-clamp-2 s-line-clamp-3-for-col-12 s-link-style a-text-normal"]').first().click();
      await page.pause();
})

test("Search iphone on searchbox and click the iphone17 pro on the dynamic dropdown",async({page})=>{
      await page.goto("https://www.amazon.in/");
      await page.locator('[class="nav-search-field "] #twotabsearchtextbox').fill("iphone"); 
      const productList=await page.locator(`[id="sac-autocomplete-results-container"] [class="left-pane-results-container"] div[id*="sac-suggestion-row"]`);
      await productList.first().waitFor({ state: 'visible', timeout: 5000 });
      let productCount=await productList.count();
      //console.log(productCount);

      for(let i=0;i<productCount;i++){
            let productName=await productList.nth(i).textContent();
            if(productName==="iphone 17 pro"){
                  await productList.nth(i).click();
                  break;
            }
      }
      await page.pause();
})

test('Search mobile,choose realme checkbox,select related mobile,add to cart,verify item added to cart',async({page,context})=>{
      await page.goto("https://www.amazon.in/");
      await page.locator('[class="nav-search-field "] #twotabsearchtextbox').fill("mobile");
      await page.locator('[id="nav-search-submit-button"]').click();
      await page.waitForLoadState();
      await page.locator('#brandsRefinements').getByRole('link', { name: 'realme' }).click();  
      
      //Same page add to cart
      const productName = 'realme NARZO 80 Lite 4G';
      const productContainer = page.locator('div.puisg-col-inner', { hasText: productName }).first();
      const addToCartButton = productContainer.getByRole('button', { name: 'Add to cart' });
      await addToCartButton.click();

      //Different tab add to cart
      const [newTab]=await Promise.all([
            context.waitForEvent('page'),
            await  page.locator('h2[aria-label*="realme P3x"] ').first().click()
      ])
      await newTab.waitForLoadState();
     await newTab.getByRole('button',{name:'Add to Cart'}).click();

     const cart=newTab.locator('xpath=//*[@id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]/h1');
     await expect(cart).toHaveText('Added to cart');
      await page.pause();
})



