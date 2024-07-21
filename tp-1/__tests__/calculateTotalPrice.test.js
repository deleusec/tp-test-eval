const calculateTotalPrice = require("../src/calculateTotalPrice");
test("calculates total price for valid products", () => {
  const products = [
    { price: 10, quantity: 2 },
    { price: 20, quantity: 3 },
  ];
  expect(calculateTotalPrice(products)).toBe(80);
});
test("throws error for non-array input", () => {
  expect(() => calculateTotalPrice("not an array")).toThrow(
    "Input must be an array"
  );
});
test("throws error for invalid product price", () => {
  const products = [{ price: "10", quantity: 2 }];
  expect(() => calculateTotalPrice(products)).toThrow(
    "Price and quantity must be numbers"
  );
});

test("returns 0 for an empty list of products", () => {
  expect(calculateTotalPrice([])).toBe(0);
});

test("handles products with zero quantity", () => {
  const products = [{ price: 10, quantity: 0 }];
  expect(calculateTotalPrice(products)).toBe(0);
});

test("throws error for negative quantity", () => {
  const products = [{ price: 10, quantity: -1 }];
  expect(() => calculateTotalPrice(products)).toThrow( "Price and quantity must be numbers");
});
