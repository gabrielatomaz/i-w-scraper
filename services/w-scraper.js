const puppeteer = require('puppeteer');

const loginScrapper = async (account) => {
    try {
        let { page, browser } = await config();

        page = await login(page, account);

        await page.click("#acessar");

        await page.waitFor(15000);

        await page.screenshot({ path: 'example.png' });

        await browser.close();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const config = async () => {
    try {
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
        await page.goto('https://www.itau.com.br/');

        return { page, browser };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const login = async (page, account) => {
    try {
        await page.type("#agencia", account.agency);
        await page.type("#conta", account.number);

        await page.waitFor(500);

        await page.click('#btnLoginSubmit');

        await page.waitFor(15000);

        page = await setPassword(page, account.password);

        return page;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const setPassword = async (page, password) => {
    try {
        const passwordSplit = password.split("");

        const options = (await page.evaluate(() => Array.from(document.querySelectorAll(".teclas .tecla"),
            e => {
                return { text: e.innerText.split("ou"), rel: e.rel };
            })));

        for (const caracter of passwordSplit) {
            for (const option of options) {
                if (new String(option.text).includes(caracter)) {
                    await page.waitFor(500);

                    await page.click(`a[rel="${option.rel}"]`);

                    await page.waitFor(500);
                }
            }
        }

        return page;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { loginScrapper };