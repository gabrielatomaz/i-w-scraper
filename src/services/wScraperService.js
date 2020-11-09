import puppeteer from 'puppeteer';
import UserController from '../controllers/userController.js';

class WScrapperService {
    async loginScraper (account) {
        try {
            let { page, browser } = await config();

            page = await login(page, account);

            await page.click('#acessar');

            await page.waitFor(15000);

            const { newPage, name, balance } = await accountInfos(page);

            const agency = `${account.agency}${account.number}`;

            const user = await saveInfos({ name, balance, agency });

            page = newPage;

            await browser.close();

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async config() {
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

    async login(page, account) {
        try {
            await page.type('#agencia', account.agency);
            await page.type('#conta', account.number);

            await page.waitFor(500);

            await page.click('#btnLoginSubmit');

            await page.waitFor(15000);

            page = await setPassword(page, account.password);

            await page.waitFor(1000);

            return page;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async setPassword(page, password) {
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

    async accountInfos(page) {
        await page.click('#iconeMeusDados');

        await page.waitFor(1000);

        const name = await page.evaluate(() => document.querySelector('#nomeCliente').innerText);
        const balance = await page.evaluate(() => document.querySelector('#saldo').innerText);

        const newPage = page;

        return { newPage, name, balance };
    }

    async saveInfos(userModel) {
        let user = await UserController.findUser(userModel.agency);

        return user ? await UserController.updateUser(userModel) : await UserController.createUser(userModel);
    }

}

export default new WScrapperService();
