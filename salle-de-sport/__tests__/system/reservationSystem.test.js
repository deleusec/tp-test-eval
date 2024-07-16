const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless)
  .build();

describe("Reservation System Tests", () => {
  beforeAll(async () => {
    await driver.get("http://localhost:3000/memberRegistration.html");
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test("should complete the reservation process", async () => {
    // Register a new member
    await driver.findElement(By.id("firstName")).sendKeys("Jane");
    await driver.findElement(By.id("lastName")).sendKeys("Doe");
    await driver.findElement(By.id("email")).sendKeys("jane.doe@example.com");
    await driver.findElement(By.id("password")).sendKeys("Password123!");
    await driver.findElement(By.tagName("button")).click();

    await driver.wait(until.urlContains("gymSelection.html"), 5000);

    // Select a gym
    await driver.findElement(By.id("gym")).sendKeys("Salle de Sport 1");
    await driver.findElement(By.tagName("button")).click();

    await driver.wait(until.urlContains("machineSelection.html"), 5000);

    // Select a machine
    await driver.findElement(By.id("machine")).sendKeys("Machine 1");
    await driver.findElement(By.tagName("button")).click();

    await driver.wait(until.urlContains("reservationConfirmation.html"), 5000);

    // Verify reservation confirmation
    const confirmationText = await driver
      .findElement(By.id("confirmationMessage"))
      .getText();
    expect(confirmationText).toContain("Merci pour votre réservation");
  });
});
