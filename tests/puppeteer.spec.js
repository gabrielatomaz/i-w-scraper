import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('sample test', async () => {
    let page;

    before(async () => {
        const browser = await puppeteer.launch({
            headless: true,
            devtools: true,
            defaultViewport: {
                width: 1500,
                height: 1500,
                isMobile: false
            }
        });

        page = await browser.newPage();
        await page.goto('https://www.itau.com.br/');
    });


    it('should have the correct page title', async () => {
        const title = await page.title();
        
        expect(title).to.eql('Banco Itaú | O que você está buscando?');
    });

    after(async () => {
        await page.close();
    })
});