const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const { ExcelUtils } = require('../utils/ExceUtils');
const path = require('path')
const filepath = path.join(__dirname, "../TestData/excel.xlsx")
const sheetname = 'Sheet1'
const datas = ExcelUtils.getDataFromExcel(filepath, sheetname)
//Json->string->js object
//const datasets = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of datas) {
    test('Valid login and logout to the application', { tag: '@smoke' }, async ({ page }) => {
        const poManager = new POManager(page);
        //js file- Login js, DashboardPage
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        const logoutPage = poManager.getLogoutPage();
        await page.waitForTimeout(5000);
        await logoutPage.SignOut();
    });
}
