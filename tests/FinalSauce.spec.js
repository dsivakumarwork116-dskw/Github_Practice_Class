import{test,expect} from "@playwright/test";

test("Sauce Demo practice site project",async({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByRole("textbox",{name:'password'}).fill('secret_sauce');
    await page.getByRole('button',{name:"Login"}).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const sortDropdown = page.locator('.product_sort_container');
    await sortDropdown.selectOption('hilo');

    //Items to add into the cart
    const productsToInclude = [
        
        'Sauce Labs Bolt T-Shirt', 
        'Sauce Labs Bike Light', 
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Fleece Jacket'
    ]; 

    //Items to remove from the cart
    const productsToExclude = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bolt T-Shirt',
        'Test.allTheThings() T-Shirt (Red)' 
    ];

    const allInventoryItems = page.locator('.inventory_item');  // Common locator for all inventory item containers by class
    const cartList = [];                                         // To track which items were actually clicked and added
    const buttonsToClick = [];                                   // To store the button locators

    // --- 2. Filter and Collect Items for Action ---

    const totalItems = await allInventoryItems.count();          //total number of items in the inventory
    console.log(`Total number of items in the inventory = ${totalItems}`);

    for (let i = 0; i < totalItems; i++) {
        const itemContainer = allInventoryItems.nth(i);                                 //getting elements of inventory one by one    
        const productNameLocator = itemContainer.locator('.inventory_item_name');       //Holds current the product name
        const buttonLocator = itemContainer.locator('[id^="add-to-cart-"]');            //Holds currents product's  add to cart button
        const currentProductName = await productNameLocator.innerText();

        // a) Check for EXCLUSION first: If the product is on the exclude list, skip it.
        if (productsToExclude.includes(currentProductName)) {
            console.log(`🚫 Excluding (on removal list): ${currentProductName}`);
            continue; // Skip the rest of this iteration
        }
        // b) Check for INCLUSION: If the product is on the include list, add it.
        if (productsToInclude.includes(currentProductName)) {
            console.log(`✅ Adding: ${currentProductName}`);     
            // Store the names to add in the cartList
            cartList.push(currentProductName);
            //Store the button to add in the buttonsToClick list  
            buttonsToClick.push(buttonLocator);
        } 
    }
    for (const button of buttonsToClick) {                      //adding items to cart
        await button.click();
    }

    // --- 3. Execute Actions (Clicks) and Verify ---
    console.log('\n--- Products Added in Cart ---');         //items added inside the cart
    console.log(productsToInclude);

    console.log('\n--- Products Removed from Cart ---');     //items Removed from the cart
    console.log(productsToExclude);

    console.log('\n--- Final Cart List Confirmed ---');
    console.log(cartList);

    const cartIcon = page.locator('.shopping_cart_link');       //Navigating to cart page
    await cartIcon.click();                                     

    const expectedCartUrl = 'https://www.saucedemo.com/cart.html';  
    await expect(page).toHaveURL(expectedCartUrl);
    const checkoutButton = page.locator('#checkout');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    
    const expectedCheckoutUrl = 'https://www.saucedemo.com/checkout-step-one.html';
    await expect(page).toHaveURL(expectedCheckoutUrl);
    await page.getByPlaceholder("First Name").fill("Siva");
    await page.getByPlaceholder("Last Name").fill("Kumar");
    await page.getByPlaceholder("Zip/Postal Code").fill("932007");
    const continueButton = page.locator('#continue');
    await continueButton.click();

    const expectedCheckoutTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';
    await expect(page).toHaveURL(expectedCheckoutTwoUrl);
   // await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    const priceLocators = page.locator('[data-test="inventory-item-price"]');
    const count = await priceLocators.count();
    let calculatedTotal = 0;
    // 2. Loop for adding all price values in the cart items
    for (let i = 0; i < count; i++) {
        const priceText = await priceLocators.nth(i).innerText();
        // Remove '$' and convert to number
        const price = parseFloat(priceText.replace('$', ''));
        calculatedTotal += price;
    }
    const finalCalculatedTotal = parseFloat(calculatedTotal.toFixed(2));  // Round the calculated total to 2 decimal
    
    // 3. Get the displayed subtotal
    const subtotalLabel = page.locator('[data-test="subtotal-label"]');
    const subtotalText = await subtotalLabel.innerText();
    
    // Extract the displayed subtotal number using a regex
    // This looks for "Item total: $" followed by a number
    const subtotalRegex = /Item total: \$(\d+\.\d+)/;
    const match = subtotalText.match(subtotalRegex);
    
    // Ensure extraction was successful
    await expect(match).toBeTruthy();
    const displayedSubtotal = parseFloat(match[1]);

    // 4. Assert calculated total against displayed total
    // The expected total for 4 items ($49.99, $29.99, $15.99, $9.99) is $105.96
    expect(finalCalculatedTotal).toBe(displayedSubtotal);
    console.log(`Products Price Total is ${finalCalculatedTotal} which is equal to Cart Total of ${displayedSubtotal}`);
        await page.pause();


})