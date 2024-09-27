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
import perusahaan from "../../selector/perusahaan.js";

describe("Perusahaan", function () {
    this.beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        driver.get(url);
        await driver.manage().window().maximize();
    });

    it("User successfully access perbaiki bangunan - untuk perusahaan", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txtperbaikibangunan = await driver.findElement(By.xpath(beranda.txtperbaikibangunan));
        await driver.executeScript('arguments[0].click();', txtperbaikibangunan);

        const txtuntukperusahaan = await driver.findElement(By.xpath(beranda.txtuntukperusahaan));
        await driver.executeScript('arguments[0].click();', txtuntukperusahaan);

        //expect correct url web
        await driver.wait(until.urlIs(perusahaan.linkperusahaan), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, perusahaan.linkperusahaan, 'URL did not match!');

        const txtheaderperusahaan = await driver.wait(until.elementLocated(By.xpath(perusahaan.txtheaderperusahaan)));
        elementText = await txtheaderperusahaan.getText();
        expect(elementText).to.include('Kelola Bangunan Bisnis dengan Nyaman Bersama Kanggo');
      }
      catch (error) {
        await catchfailed("perusahaan", error);

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

        const txtuntukperusahaan = await driver.findElement(By.xpath(beranda.txtuntukperusahaan));
        await driver.executeScript('arguments[0].click();', txtuntukperusahaan);

        //expect correct url web
        await driver.wait(until.urlIs(perusahaan.linkperusahaan), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, perusahaan.linkperusahaan, 'URL did not match!');

        const txtheaderperusahaan = await driver.wait(until.elementLocated(By.xpath(perusahaan.txtheaderperusahaan)));
        let elementText = await txtheaderperusahaan.getText();
        expect(elementText).to.include('Kelola Bangunan Bisnis dengan Nyaman Bersama Kanggo');

        const btnhubungikami = await driver.wait(until.elementLocated(By.xpath(perusahaan.btnhubungikami)));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnhubungikami);    
        await driver.executeScript('arguments[0].click();', btnhubungikami);

        //expect correct url web in other tab
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, perusahaan.linkdaftarwaperusahaan, 'URL did not match!');
      }
      catch (error) {
        await catchfailed("perusahaan_hubungikami", error);

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