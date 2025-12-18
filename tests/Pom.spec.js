import {test,expect} from "@playwright/test";
import Orange from "./pages/LoginPage";


test("login using POM", async ({ page }) => {
  const orangeHRM = new Orange(page);

  await orangeHRM.gotoLogin();
  await orangeHRM.orangeLogin("admin", "admin123");
});