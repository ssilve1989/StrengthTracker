/**
 * Created by ssilvestri on 1/5/16.
 */
exports.config = {
    framework : 'jasmine',
    seleniumAddress : 'http://localhost:4444/wd/hub',
    specs : ['navigation-spec.js'],
    capabilities : {
        browserName : 'chrome',
        chromeOptions : {
            mobileEmulation : {
                deviceName : 'Apple iPhone 6'
            }
        }
    }
};