const puppeteer = require('puppeteer');
const { createUser, findUser, updateUser } = require('../controllers/user.controller');

const loginScraper = async (account) => {
    try {
        let { page, browser } = await config();

        page = await login(page, account);

        await page.click('#acessar');

        await page.waitFor(13000);

        const { newPage, name, balance } = await accountInfos(page);

        const agency = `${account.agency}${account.number}`;

        await saveInfos({ name, balance, agency });

        page = newPage;

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
        await page.type('#agencia', account.agency);
        await page.type('#conta', account.number);

        await page.waitFor(500);

        await page.click('#btnLoginSubmit');

        await page.waitFor(13000);

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

        const options = (await page.evaluate(() => Array.from(document.querySelectorAll('.teclas .tecla'),
            e => {
                return { text: e.innerText.split('ou'), rel: e.rel };
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

const accountInfos = async (page) => {
    await page.click('#iconeMeusDados');

    await page.waitFor(1000);

    const name = await page.evaluate(() => document.querySelector('#nomeCliente').innerText);
    const balance = await page.evaluate(() => document.querySelector('#saldo').innerText);

    const newPage = page;

    return { newPage, name, balance };
}

const saveInfos = async (userModel) => {
    const user = await findUser(userModel.agency);

    if (!user)
        createUser(userModel);
    else
        updateUser(userModel);

}

module.exports = { loginScraper };