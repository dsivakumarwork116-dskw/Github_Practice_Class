import { expect } from "@playwright/test";

class InventortyAndCheckout{

    constructor(page) {
        this.page = page; // Essential: Store the page object

        // --- 1. Move ALL Locators Here ---
        this.allInventoryItems = page.locator('.inventory_item');
        this.priceLocators = page.locator('[data-test="inventory-item-price"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('#checkout');
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.zipCodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = page.locator('#continue');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');

        // --- 2. Move Fixed Data Here ---
        // Lists of products (if they are constant and not test-specific input)
        this.productsToInclude = [
            'Sauce Labs Bolt T-Shirt', 
            'Sauce Labs Bike Light', 
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Fleece Jacket'
        ]; 
        this.productsToExclude = ['Sauce Labs Onesie'];
        
        // Fixed URLs for assertions
        this.expectedCartUrl = 'https://www.saucedemo.com/cart.html';
        this.expectedCheckoutUrl = 'https://www.saucedemo.com/checkout-step-one.html';
        this.expectedCheckoutTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';
    }

    async addProductsToCart(){
        // Variables that track state during this specific run must stay.
        const cartList = []; 
        const buttonsToClick = []; 
        let priceTotal = 0;
        
        // --- Dynamic Logic & Action Steps ---
        const totalItems = await this.allInventoryItems.count(); 
        console.log(`Total number of items in the inventory = ${totalItems}`);
    
        for (let i = 0; i < totalItems; i++) {
            const itemContainer = this.allInventoryItems.nth(i); 
            // The locator within the loop is still necessary as it depends on the itemContainer.
            const productNameLocator = itemContainer.locator('.inventory_item_name');
            const currentProductName = await productNameLocator.innerText();
            const buttonLocator = itemContainer.locator('[id^="add-to-cart-"]'); 
    
            if (this.productsToExclude.includes(currentProductName)) {
                console.log(`🚫 Excluding (on removal list): ${currentProductName}`);
                continue;
            }
            if (this.productsToInclude.includes(currentProductName)) {
                console.log(`✅ Adding: ${currentProductName}`); 
                cartList.push(currentProductName);
                buttonsToClick.push(buttonLocator);
                
                // Price calculation logic stays here
                const priceText = await this.priceLocators.nth(i).innerText();
                const price = parseFloat(priceText.replace('$', '')); 
                priceTotal += price;
            } 
        }

        const finalCalculatedTotal = parseFloat(priceTotal.toFixed(2));
        
        // Execute Clicks
        for (const button of buttonsToClick) { 
            await button.click();
        }
        
        // Navigations and Input (using the 'this' locators defined above)
        await this.cartIcon.click(); 
        await expect(this.page).toHaveURL(this.expectedCartUrl);
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
        
        await expect(this.page).toHaveURL(this.expectedCheckoutUrl);
        await this.firstNameInput.fill("Siva"); // Input data is generally test data
        await this.lastNameInput.fill("Kumar"); // and could optionally be passed 
        await this.zipCodeInput.fill("932007"); // as parameters to this method.
        await this.continueButton.click();
        
        await expect(this.page).toHaveURL(this.expectedCheckoutTwoUrl);
        
        // Final assertions
        const subtotalText = await this.subtotalLabel.innerText(); 
        const displayedSubtotal =parseFloat(subtotalText.replace('Item total: $',''));
        expect(finalCalculatedTotal).toBe(displayedSubtotal);
        console.log(`Products Price Total is ${finalCalculatedTotal} which is equal to Cart Total of ${displayedSubtotal}`);
    }


}export default InventortyAndCheckout;