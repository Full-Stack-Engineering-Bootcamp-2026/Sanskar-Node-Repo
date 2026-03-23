function calculateTotal(prices) {
  let total = 0;
  for (let i = 0; i < prices.length; i++) { //(let i = 0; i <= prices.length; i++)
    let price = prices[i]; //as the array was being traversed till i = price.length it was accesing an element out of array index range hence it was giving the price as undefined and when it was being added to the total the result was NaN . It was fixed by changing i<=prices.length condition to i<prices.length
    total += price;
  }
  return total;
}
module.exports = calculateTotal;