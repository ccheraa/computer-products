export interface Invoice {
  _id: string;
  invoiceCode: string;
  clientCode: string;
  productCode: string;
  designation: string;
  quantity: number;
  unitPrice: number;
  date: Date;
}

export const INPUT_INVOICE_TOP = [
  // {
  //   type: 'text',
  //   placeholder: 'product code',
  //   control: 'productCode',
  //   icon: 'perm_identity',
  //   error: 'Product is required'
  // },
  {
    type: 'text',
    placeholder: 'designation',
    control: 'designation',
    icon: 'edit',
    error: 'Designation is required'
  }
];

export const INPUT_INVOICE_BOTTOM = [
  {
    type: 'number',
    placeholder: 'quantity',
    control: 'quantity',
    icon: 'edit',
    error: 'Amount is required'
  },
  {
    type: 'number',
    placeholder: 'unit price',
    control: 'unitPrice',
    icon: 'edit',
    error: 'Unit price is required'
  }
];
