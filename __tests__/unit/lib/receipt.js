const Receipt = require('../../../lib/receipt');

describe('Library -> Receipt', () => {
  test('First example', () => {
    const receipt = new Receipt([{
      name: 'book',
      category: 'book',
      price: 12.49,
      quantity: 1,
    }, {
      name: 'music CD',
      category: 'cd',
      price: 14.99,
      quantity: 1,
    }, {
      name: 'chocolate bar',
      category: 'food',
      price: 0.85,
      quantity: 1,
    }]);

    expect(receipt.tax).toBe('1.50');
    expect(receipt.taxedPrice).toBe('29.83');

    expect(receipt.goods).toHaveLength(3);
    expect(receipt).toHaveProperty('goods.0.taxedPrice', '12.49');
    expect(receipt).toHaveProperty('goods.1.taxedPrice', '16.49');
    expect(receipt).toHaveProperty('goods.2.taxedPrice', '0.85');

    expect(`${receipt}`).toBe(`- 1 book: 12.49
- 1 music CD: 16.49
- 1 chocolate bar: 0.85
- Sales Taxes: 1.50
- Total: 29.83`);
  });

  test('Second example', () => {
    const receipt = new Receipt([{
      name: 'box of chocolates',
      category: 'food',
      price: 10.00,
      quantity: 1,
      isImported: true,
    }, {
      name: 'bottle of perfume',
      category: 'cosmetics',
      price: 47.50,
      quantity: 1,
      isImported: true,
    }]);

    expect(receipt.tax).toBe('7.65');
    expect(receipt.taxedPrice).toBe('65.15');

    expect(receipt.goods).toHaveLength(2);
    expect(receipt).toHaveProperty('goods.0.taxedPrice', '10.50');
    expect(receipt).toHaveProperty('goods.1.taxedPrice', '54.65');

    expect(`${receipt}`).toBe(`- 1 imported box of chocolates: 10.50
- 1 imported bottle of perfume: 54.65
- Sales Taxes: 7.65
- Total: 65.15`);
  });

  test('Third example', () => {
    const receipt = new Receipt([{
      name: 'bottle of perfume',
      category: 'cosmetics',
      price: 27.99,
      quantity: 1,
      isImported: true,
    }, {
      name: 'bottle of perfume',
      category: 'cosmetics',
      price: 18.99,
      quantity: 1,
    }, {
      name: 'packet of headache pills',
      category: 'medical',
      price: 9.75,
      quantity: 1,
    }, {
      name: 'box of chocolates',
      category: 'food',
      price: 11.25,
      quantity: 1,
      isImported: true,
    }]);

    expect(receipt.tax).toBe('6.70');
    expect(receipt.taxedPrice).toBe('74.68');

    expect(receipt.goods).toHaveLength(4);
    expect(receipt).toHaveProperty('goods.0.taxedPrice', '32.19');
    expect(receipt).toHaveProperty('goods.1.taxedPrice', '20.89');
    expect(receipt).toHaveProperty('goods.2.taxedPrice', '9.75');
    expect(receipt).toHaveProperty('goods.3.taxedPrice', '11.85');

    expect(`${receipt}`).toBe(`- 1 imported bottle of perfume: 32.19
- 1 bottle of perfume: 20.89
- 1 packet of headache pills: 9.75
- 1 imported box of chocolates: 11.85
- Sales Taxes: 6.70
- Total: 74.68`);
  });
});
