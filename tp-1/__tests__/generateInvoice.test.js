const generateInvoice = require("../src/generateInvoice");
test("generates invoice correctly", () => {
  const products = [
    { name: "Product A", price: 10, quantity: 2 },
    { name: "Product B", price: 20, quantity: 3 },
  ];
  const expectedInvoice =
    `Invoice\n\nProducts:\n` +
    `- Product A: $10 x 2\n` +
    `- Product B: $20 x 3\n\nTotal: $80`;
  expect(generateInvoice(products)).toBe(expectedInvoice);
});
test("throws error for invalid product in generateInvoice", () => {
  const products = [{ name: "Product A", price: "10", quantity: 2 }];
  expect(() => generateInvoice(products)).toThrow();
});

test("generates correct invoice for an empty list of products", () => {
  const expectedInvoice = `Invoice\n\nProducts:\n\n\nTotal: $0`;
  expect(generateInvoice([])).toBe(expectedInvoice);
});
