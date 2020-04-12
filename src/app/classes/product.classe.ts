// Product ...
export interface Product {
  _id: string;
  productCode: string;
  definition: string;
  category: string;
  quantity: number;
  price: number;
  file: string;
}

export const INPUT_ROW_TOP = [
  {
    type: 'text',
    placeholder: 'code product',
    control: 'productCode',
    icon: 'edit',
    error: 'Code product is required'
  }
];

export const INPUT_ROW_BOTTOM = [
  {
    type: 'number',
    placeholder: 'quantity product',
    control: 'quantity',
    icon: 'money',
    error: 'Quantity product is required'
  },
  {
    type: 'number',
    placeholder: 'price product',
    control: 'price',
    icon: 'money',
    error: 'Price product is required'
  }
];
