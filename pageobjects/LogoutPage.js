class LogoutPage {

    constructor(page) {
        this.page = page;
        this.signOutbutton = page.getByText(' Sign Out ');
    }

    async SignOut() {
        await this.signOutbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
module.exports = { LogoutPage };