/**
 * Created by ssilvestri on 1/5/16.
 */
describe('routes', function(){
    "use strict";

    beforeEach(function(){
        browser.get('http://localhost:8000/')
    });

    var history = element(by.css('a[href="#history"]'));
    var about = element(by.css('a[href="#about"]'));
    var home = element(by.css('a[href="#/"]'));
    var settings = element(by.css('a[href="#settings"]'));

    it('should go load and compile the correct template', function(){
        browser.waitForAngular();

        browser.executeScript('return arguments[0].click()', history.getWebElement());
        expect(browser.getCurrentUrl()).toContain('#/history');

        browser.executeScript('return arguments[0].click()', about.getWebElement());
        expect(browser.getCurrentUrl()).toContain('#/about');

        browser.executeScript('return arguments[0].click()', home.getWebElement());
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');

        browser.executeScript('return arguments[0].click()', settings.getWebElement());
        expect(browser.getCurrentUrl()).toContain('#/settings');
    });
});