const { Builder, By } = require("selenium-webdriver");
(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/formulaire.html");
    await driver.findElement(By.id("name")).sendKeys("John Doe");
    await driver.findElement(By.id("email")).sendKeys("john@example.com");
    await driver.findElement(By.id("phone")).sendKeys("0123456789");
    await driver.findElement(By.id("submit")).click();
    // Ajoutez d'autres interactions pour les tests d'inscription
  } finally {
    await driver.quit();
  }
})();
