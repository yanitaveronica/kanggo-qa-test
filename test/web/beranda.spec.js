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
import berita from "../../selector/berita.js";
import aboutus from "../../selector/aboutus.js";
import blog from "../../selector/blog.js";
import karir from "../../selector/karir.js";

describe("Beranda", function () {
    this.beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        driver.get(url);
        await driver.manage().window().maximize();
    });

    it("User successfully access hubungi kami", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const btnhubungikami = await driver.findElement(By.xpath(beranda.btnhubungikami));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btnhubungikami);    
        await driver.executeScript('arguments[0].click();', btnhubungikami);

        //expect correct url web in other tab
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, beranda.linkwa, 'URL did not match!');
      }
      catch (error) {
        await catchfailed("hubungikami", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access 'cek berita'", async function () {
      try {
        //expect correct title text in homepage
        let txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const btncekberitalain = await driver.findElement(By.xpath(beranda.btncekberitalain));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btncekberitalain);    
        await driver.executeScript('arguments[0].click();', btncekberitalain);

        //expect correct url web
        await driver.wait(until.urlIs(berita.linkberita), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, berita.linkberita, 'URL did not match!');

        //expect correct title text in homepage
        let txtberita = await driver.findElement(By.xpath(berita.txtberita));
        elementText = await txtberita.getText();
        expect(elementText).to.include('Berita');

        await driver.navigate().back();

        //expect correct title text in homepage
        txtberanda = await driver.wait(until.elementLocated(By.xpath(beranda.txtberanda)));
        elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        txtberita = await driver.findElement(By.xpath(beranda.txtberita));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", txtberita);    
        await driver.executeScript('arguments[0].click();', txtberita);

        //expect correct url web
        await driver.wait(until.urlIs(berita.linkberita), 120000);
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, berita.linkberita, 'URL did not match!');

        //expect correct title text in homepage
        txtberita = await driver.findElement(By.xpath(berita.txtberita));
        elementText = await txtberita.getText();
        expect(elementText).to.include('Berita');
      }
      catch (error) {
        await catchfailed("cekberita", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access download application kanggo", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const btndownloadqr = await driver.findElement(By.xpath(beranda.btndownloadqr));
        // Scroll to the element
        driver.executeScript("arguments[0].scrollIntoView();", btndownloadqr);    
        await driver.executeScript('arguments[0].click();', btndownloadqr);

        //wait element qrcode
        const imgqr = await driver.wait(until.elementLocated(By.xpath(beranda.imgqr)));
        await imgqr.isDisplayed();
      }
      catch (error) {
        await catchfailed("download", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access menu 'tentang kami'", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        const txttentangkami = await driver.findElement(By.xpath(beranda.txttentangkami));
        driver.executeScript("arguments[0].scrollIntoView();", txttentangkami);    
        await driver.executeScript('arguments[0].click();', txttentangkami);

        //expect correct url web
        await driver.wait(until.urlIs(aboutus.linkaboutus), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, aboutus.linkaboutus, 'URL did not match!');

        //wait element title show
        const txtmenuinilahkanggo = await driver.wait(until.elementLocated(By.xpath(aboutus.txtmenuinilahkanggo)));
        await txtmenuinilahkanggo.isDisplayed();
      }
      catch (error) {
        await catchfailed("tentangkami", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access menu 'blog'", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        let txtblog = await driver.findElement(By.xpath(beranda.txtblog));
        driver.executeScript("arguments[0].scrollIntoView();", txtblog);    
        await driver.executeScript('arguments[0].click();', txtblog);

        //expect correct url web
        await driver.wait(until.urlIs(blog.linkblog), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, blog.linkblog, 'URL did not match!');

        //wait element title show
        txtblog = await driver.findElement(By.xpath(blog.txtblog));
        elementText = await txtblog.getText();
        expect(elementText).to.include('Yuk, Liat Apa yang');
      }
      catch (error) {
        await catchfailed("blog", error);

        // Attach the screenshot path to the error for the report
        this.test.ctx.attachments = screenshotPath;

        throw error; // Re-throw the error to ensure the test is marked as failed
      }
    });

    it("User successfully access menu 'karir'", async function () {
      try {
        //expect correct title text in homepage
        const txtberanda = await driver.findElement(By.xpath(beranda.txtberanda));
        let elementText = await txtberanda.getText();
        expect(elementText).to.include('Bersama, Kita Ciptakan\nJutaan Pekerjaan untuk Tukang');

        let txtkarir = await driver.findElement(By.xpath(beranda.txtkarir));
        driver.executeScript("arguments[0].scrollIntoView();", txtkarir);    
        await driver.executeScript('arguments[0].click();', txtkarir);

        //expect correct url web
        await driver.wait(until.urlIs(karir.linkkarir), 120000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, karir.linkkarir, 'URL did not match!');

        //wait element title show
        const imgkarir = await driver.wait(until.elementLocated(By.xpath(karir.imgkarir)));
        await imgkarir.isDisplayed();
      }
      catch (error) {
        await catchfailed("karir", error);

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