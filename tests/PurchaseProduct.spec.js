const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const { ExcelUtils } = require('../utils/ExceUtils');
const path = require('path')
const filepath = path.join(__dirname, "..TestData/excel.xlsx")
const sheetname = 'Sheet1'
const dataset = ExcelUtils.getDataFromExcel(filepath, sheetname)
//Json->string->js object
const datasets = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


for (const data of datasets) {
  test('@Web Add to product to cart and checkout',{tag:'@Regression'}, async ({ page }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  });
}


for (const data of datasets) {
  test('@Web Delete added product from Orders page',{tag:'@regression'}, async ({ page }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.DeleteOrder();

    //Signout from the application 
    const logoutPage = poManager.getLogoutPage();
    await page.waitForTimeout(5000);
    await logoutPage.SignOut();
  });
}