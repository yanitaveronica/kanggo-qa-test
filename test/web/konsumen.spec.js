import { Builder, By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';
import log4js from 'log4js';
import fs from 'fs';
import assert from 'assert';
import path from 'path';
const localpath = path.resolve(); // Convert to absolute path
let screenshotPath;

import dotenv from 'dotenv';
dotenv.config();
const url = process.env.kanggo_url;

let driver;

// Configure Log4js
log4js.configure({
    appenders: { file: { type: 'file', filename: 'logs/test.log' } },
    categories: { default: { appenders: ['file'], level: 'debug' } }
});
const logger = log4js.getLogger('default');

import beranda from "../../selector/beranda.js";
import konsumen from "../../selector/konsumen.js";

describe("Konsumen", function () {
    this.beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        driver.get(url);
        await driver.manage().window().maximize();
    });

    it("User successfully access perbaiki bangunan - untuk konsumen", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txtperbaikibangunan = await driver.findElement(By.xpath(beranda.txtperbaikibangunan));
        await driver.executeScript('arguments[0].click();', txtperbaikibangunan);

        const txtuntukkonsumen = await driver.findElement(By.xpath(beranda.txtuntukkonsumen));
        await driver.executeScript('arguments[0].click();', txtuntukkonsumen);

        //expect correct url web
        await driver.wait(until.urlIs(konsumen.linkkonsumen), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, konsumen.linkkonsumen, 'URL did not match!');

        const txtheaderkonsumen = await driver.wait(until.elementLocated(By.xpath(konsumen.txtheaderkonsumen)));
        elementText = await txtheaderkonsumen.getText();
        expect(elementText).to.include('Semua Perbaikan Rumah Beres Bersama Kanggo');
      }
      catch (error) {
        await catchfailed("konsumen", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access hubungi kami", async function () {
      try {
        //expect wait text menu
        const txtperbaikibangunan = await driver.findElement(By.xpath(beranda.txtperbaikibangunan));
        await driver.executeScript('arguments[0].click();', txtperbaikibangunan);

        const txtuntukkonsumen = await driver.findElement(By.xpath(beranda.txtuntukkonsumen));
        await driver.executeScript('arguments[0].click();', txtuntukkonsumen);

        //expect correct url web
        await driver.wait(until.urlIs(konsumen.linkkonsumen), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, konsumen.linkkonsumen, 'URL did not match!');

        const txtheaderkonsumen = await driver.wait(until.elementLocated(By.xpath(konsumen.txtheaderkonsumen)));
        let elementText = await txtheaderkonsumen.getText();
        expect(elementText).to.include('Semua Perbaikan Rumah Beres Bersama Kanggo');

        const btnhubungikami = await driver.findElement(By.xpath(konsumen.btnhubungikami));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnhubungikami);    
        await driver.executeScript('arguments[0].click();', btnhubungikami);

        //expect correct url web in other tab
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, konsumen.linkwakonsumen, 'URL did not match!');
      }
      catch (error) {
        await catchfailed("konsumen_hubungikami", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access button 'lihat layanan lain'", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txtperbaikibangunan = await driver.findElement(By.xpath(beranda.txtperbaikibangunan));
        await driver.executeScript('arguments[0].click();', txtperbaikibangunan);

        const txtuntukkonsumen = await driver.findElement(By.xpath(beranda.txtuntukkonsumen));
        await driver.executeScript('arguments[0].click();', txtuntukkonsumen);

        //expect correct url web
        await driver.wait(until.urlIs(konsumen.linkkonsumen), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, konsumen.linkkonsumen, 'URL did not match!');

        const btnlihatlayananlain = await driver.wait(until.elementLocated(By.xpath(konsumen.btnlihatlayananlain)));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnlihatlayananlain);    
        await driver.executeScript('arguments[0].click();', btnlihatlayananlain);

        //wait element show
        const boxhide = await driver.wait(until.elementLocated(By.xpath(konsumen.boxhide)));
        await boxhide.isDisplayed();
      }
      catch (error) {
        await catchfailed("konsumen_lihatlainnya", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access button 'sembunyikan'", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txtperbaikibangunan = await driver.findElement(By.xpath(beranda.txtperbaikibangunan));
        await driver.executeScript('arguments[0].click();', txtperbaikibangunan);

        const txtuntukkonsumen = await driver.findElement(By.xpath(beranda.txtuntukkonsumen));
        await driver.executeScript('arguments[0].click();', txtuntukkonsumen);

        //expect correct url web
        await driver.wait(until.urlIs(konsumen.linkkonsumen), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, konsumen.linkkonsumen, 'URL did not match!');

        const btnlihatlayananlain = await driver.wait(until.elementLocated(By.xpath(konsumen.btnlihatlayananlain)));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnlihatlayananlain);    
        await driver.executeScript('arguments[0].click();', btnlihatlayananlain);

        //wait element show
        const boxhide = await driver.wait(until.elementLocated(By.xpath(konsumen.boxhide)));
        await boxhide.isDisplayed();

        const btnsembunyikan = await driver.findElement(By.xpath(konsumen.btnsembunyikan));
        await driver.executeScript('arguments[0].click();', btnsembunyikan);
        
        btnlihatlayananlain.isDisplayed();
      }
      catch (error) {
        await catchfailed("konsumen_sembunyikan", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    afterEach(async () => {
      await driver.quit();
    });
});

async function catchfailed(tc, error){
  logger.error('Test failed: ', error);

  // Capture a screenshot if the test fails
  const screenshot = await driver.takeScreenshot();
  screenshotPath = localpath + `/screenshot/failed_${tc+Date.now()}.png`;
  fs.writeFileSync(screenshotPath, screenshot, 'base64');
  logger.info(`Screenshot saved: ${screenshotPath}`);

  return screenshotPath
}