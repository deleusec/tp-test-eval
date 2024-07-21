const calculateTotalPrice = require('./calculateTotalPrice');

function generateInvoice(products) {
  const total = calculateTotalPrice(products);
  const invoice = `Invoice\n\nProducts:\n` +
    products.map(product => `- ${product.name}: $${product.price} x ${product.quantity}`).join('\n') +
    `\n\nTotal: $${total}`;
  return invoice;
}

module.exports = generateInvoice;
