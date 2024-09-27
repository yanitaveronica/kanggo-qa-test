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
import tukangjagoan from "../../selector/tukangjagoan.js";

describe("Tukang Jagoan", function () {
    this.beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        driver.get(url);
        await driver.manage().window().maximize();
    });

    it("User successfully access perbaiki bangunan - untuk tukang jagoan", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txtperbaikibangunan = await driver.wait(until.elementLocated(By.xpath(beranda.txtperbaikibangunan)));
        await txtperbaikibangunan.click()

        const txtuntuktukangjagoan = await driver.wait(until.elementLocated(By.xpath(beranda.txtuntuktukangjagoan)));
        await txtuntuktukangjagoan.click()

        //expect correct url web
        await driver.wait(until.urlIs(tukangjagoan.linkjoinus), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkjoinus, 'URL did not match!');

        const txtheaderjagoan = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.txtheaderjagoan)));
        elementText = await txtheaderjagoan.getText();
        expect(elementText).to.include('Lebih Jago Gabung');
      }
      catch (error) {
        await catchfailed("tukangjagoan", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access 'daftar mitra'", async function () {
      try {
        //expect wait text menu
        const txtperbaikibangunan = await driver.wait(until.elementLocated(By.xpath(beranda.txtperbaikibangunan)));
        await txtperbaikibangunan.click()

        const txtuntuktukangjagoan = await driver.wait(until.elementLocated(By.xpath(beranda.txtuntuktukangjagoan)));
        await txtuntuktukangjagoan.click()

        //expect correct url web
        await driver.wait(until.urlIs(tukangjagoan.linkjoinus), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkjoinus, 'URL did not match!');

        const txtheaderjagoan = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.txtheaderjagoan)));
        let elementText = await txtheaderjagoan.getText();
        expect(elementText).to.include('Lebih Jago Gabung');

        const btndaftarmitra = await driver.findElement(By.xpath(tukangjagoan.btndaftarmitra));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btndaftarmitra);    
        await driver.executeScript('arguments[0].click();', btndaftarmitra);

        //expect correct url web in other tab
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkdaftarwa, 'URL did not match!');
      }
      catch (error) {
        await catchfailed("tukangjagoan_daftar", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access 'saya juga mau jadi Tukang Jagoan'", async function () {
      try {
        //expect wait text menu
        const txtperbaikibangunan = await driver.wait(until.elementLocated(By.xpath(beranda.txtperbaikibangunan)));
        await txtperbaikibangunan.click()

        const txtuntuktukangjagoan = await driver.wait(until.elementLocated(By.xpath(beranda.txtuntuktukangjagoan)));
        await txtuntuktukangjagoan.click()

        //expect correct url web
        await driver.wait(until.urlIs(tukangjagoan.linkjoinus), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkjoinus, 'URL did not match!');

        const txtheaderjagoan = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.txtheaderjagoan)));
        let elementText = await txtheaderjagoan.getText();
        expect(elementText).to.include('Lebih Jago Gabung');

        const btnsayajugamaujaditukangjagoan = await driver.findElement(By.xpath(tukangjagoan.btnsayajugamaujaditukangjagoan));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnsayajugamaujaditukangjagoan);    
        await driver.executeScript('arguments[0].click();', btnsayajugamaujaditukangjagoan);

        //expect correct url web in other tab
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkdaftarwa, 'URL did not match!');
      }
      catch (error) {
        await catchfailed("tukangjagoan_maujaditukangjagoan", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully check condition to be tukang jagoan", async function () {
      try {
        //expect wait text menu
        const txtperbaikibangunan = await driver.wait(until.elementLocated(By.xpath(beranda.txtperbaikibangunan)));
        await txtperbaikibangunan.click()

        const txtuntuktukangjagoan = await driver.wait(until.elementLocated(By.xpath(beranda.txtuntuktukangjagoan)));
        await txtuntuktukangjagoan.click()

        //expect correct url web
        await driver.wait(until.urlIs(tukangjagoan.linkjoinus), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, tukangjagoan.linkjoinus, 'URL did not match!');

        const txtheaderjagoan = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.txtheaderjagoan)));
        let elementText = await txtheaderjagoan.getText();
        expect(elementText).to.include('Lebih Jago Gabung');

        const btnstep1 = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.btnstep1)));
        elementText = await btnstep1.getText();
        expect(elementText).to.include('Siapkan Berkas');

        const btnstep2 = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.btnstep2)));
        elementText = await btnstep2.getText();
        expect(elementText).to.include('Evaluasi Keahlian');

        const btnstep3 = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.btnstep3)));
        elementText = await btnstep3.getText();
        expect(elementText).to.include('Dapatkan Sertifikasi');

        const btnstep4 = await driver.wait(until.elementLocated(By.xpath(tukangjagoan.btnstep4)));
        elementText = await btnstep4.getText();
        expect(elementText).to.include('Dapat Orderan');
      }
      catch (error) {
        await catchfailed("tukangjagoan_condition", error);

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