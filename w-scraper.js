const puppeteer = require('puppeteer');


const testingNightmare = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true,
        defaultViewport: {
            width: 1500,
            height: 1500,
            isMobile: false,
          }
    });
    const page = await browser.newPage();
    await page.goto('https://www.itau.com.br/index.html');
    await page.type("#agencia", '1111');

    await page.screenshot({ path: 'example.png' });

    await browser.close();
}

module.exports = { testingNightmare };