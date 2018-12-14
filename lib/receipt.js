class Good {
  constructor(name, category, price, quantity, isImported, options) {
    this.name = name;
    this.category = category;
    this.unitPrice = price;
    this.quantity = quantity;
    this.isImported = isImported;

    this.options = options;
  }

  roundUp(number) {
    const operand = 1 / this.options.roundNearest;

    return (Math.ceil(number * operand) / operand).toFixed(2);
  }

  // eslint-disable-next-line class-methods-use-this
  round(number) {
    return Math.round(number * 100) / 100;
  }

  get importTax() {
    return this.isImported ? this.unitPrice * this.options.importTaxRate : 0;
  }

  get salesTax() {
    return this.options.exemptCategories.includes(this.category) ? 0 : this.unitPrice * this.options.taxRate;
  }

  get unitTax() {
    return this.roundUp(this.salesTax + this.importTax);
  }

  get tax() {
    return this.round(this.unitTax * this.quantity).toFixed(2);
  }

  get price() {
    return this.round(this.unitPrice * this.quantity).toFixed(2);
  }

  get taxedPrice() {
    return (parseFloat(this.price) + parseFloat(this.tax)).toFixed(2);
  }

  toString() {
    return `- ${this.quantity} ${this.isImported ? 'imported ' : ''}${this.name}: ${this.taxedPrice}`;
  }
}

class Receipt {
  static get DEFAULT_CONFIG() {
    return {
      exemptCategories: ['book', 'food', 'medical'],
      taxRate: 0.1,
      importTaxRate: 0.05,
      roundNearest: 0.05,
    };
  }

  constructor(goods, options = {}) {
    this.options = Object.assign({}, options, Receipt.DEFAULT_CONFIG);

    // eslint-disable-next-line object-curly-newline
    this.goods = goods.map(({ name, category, price, quantity, isImported }) => new Good(name, category, price, quantity, isImported, this.options));
  }

  get tax() {
    return this.goods.reduce((sum, good) => sum + parseFloat(good.tax), 0).toFixed(2);
  }

  get price() {
    return this.goods.reduce((sum, good) => sum + parseFloat(good.price), 0).toFixed(2);
  }

  get taxedPrice() {
    return this.goods.reduce((sum, good) => sum + parseFloat(good.taxedPrice), 0).toFixed(2);
  }

  toString() {
    return `${this.goods.map(good => `${good}`).join('\n')}
- Sales Taxes: ${this.tax}
- Total: ${this.taxedPrice}`;
  }
}

module.exports = Receipt;
