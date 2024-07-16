const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless)
  .build();

describe("Member System Tests", () => {
  beforeAll(async () => {
    await driver.get("http://localhost:3000/memberRegistration.html");
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test("should register a new member", async () => {
    await driver.findElement(By.id("firstName")).sendKeys("John");
    await driver.findElement(By.id("lastName")).sendKeys("Doe");
    await driver.findElement(By.id("email")).sendKeys("john.doe@example.com");
    await driver.findElement(By.id("password")).sendKeys("Password123!");
    await driver.findElement(By.tagName("button")).click();

    await driver.wait(until.urlContains("confirmation"), 5000);

    const confirmationText = await driver
      .findElement(By.id("confirmationMessage"))
      .getText();
    expect(confirmationText).toContain("Merci pour votre inscription");
  });
});
