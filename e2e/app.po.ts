import { browser, by, element } from 'protractor';

export class MeatPage {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('mt-root h1')).getText();
    }
}
