import{test,expect} from "@playwright/test";
import LoginSauce from "./Pages/LoginSauce";
import LogoutSauce from "./Pages/LogoutSauce";
import InventortyAndCheckout from "./Pages/InventoryAndChekout";


test ("Automate sauce demo",async({page})=>{

        //Login   {LoginSauce class}
        const sauceDemoLogin=new LoginSauce(page);
        await sauceDemoLogin.visitSauceURL();
        await sauceDemoLogin.loginIntoSauce("standard_user",'secret_sauce');
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        //Add products to cart and Checkoutprocess  {InventoryAndCheckout  class}
        const addToCartAndCheckout=new InventortyAndCheckout(page);
        await addToCartAndCheckout.addProductsToCart();
        
        
        //Logout     {LogoutSauce class}
        const sauceDemoLogout=new LogoutSauce(page);
        await sauceDemoLogout.logoutFromSauce();

})

