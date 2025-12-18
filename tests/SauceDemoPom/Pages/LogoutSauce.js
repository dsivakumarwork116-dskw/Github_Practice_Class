class LogoutSauce{
    constructor(page){
        this.page=page;
        this.menuButton=page.locator("button[id='react-burger-menu-btn']");
        this.logoutButton=page.locator("//a[text()='Logout']");
    }

    async logoutFromSauce(){
        await this.menuButton.click();
        await this.logoutButton.click();
    }


}export default LogoutSauce;