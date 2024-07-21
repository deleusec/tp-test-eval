function calculateTotalPrice(products) {
    if (!Array.isArray(products)) {
      throw new Error("Input must be an array");
    }
    return products.reduce((total, product) => {
      const { price, quantity } = product;
      if (typeof price !== 'number' || typeof quantity !== 'number' || price < 0 || quantity < 0) {
        throw new Error("Price and quantity must be numbers and non-negative");
      }
      return total + price * quantity;
    }, 0);
  }
  
module.exports = calculateTotalPrice;
