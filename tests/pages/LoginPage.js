
class Orange {
  constructor(page) {
    this.page = page;
    this.username_page_Inside = page.locator("//input[@name='username']");
    this.password_page_Inside = page.locator("//input[@name='password']");
    this.login_page_locator = page.locator("//button[@type='submit']");
  }

  async gotoLogin() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }


  async orangeLogin(username, password) {
    await this.username_page_Inside.fill(username);
    await this.password_page_Inside.fill(password);
    await this.login_page_locator.click();
  }
}export default Orange;