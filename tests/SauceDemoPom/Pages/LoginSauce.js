class LoginSauce{
     constructor(page){
        this.page=page;
        this.username=page.getByPlaceholder("Username");
        this.password=page.getByRole("textbox",{name:'password'});
        this.loginButton=page.getByRole('button',{name:"Login"});
     }

    async visitSauceURL() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async loginIntoSauce(uname,pword){
        await this.username.fill(uname)
        await this.password.fill(pword);
        await this.loginButton.click();
    }


}export default LoginSauce;