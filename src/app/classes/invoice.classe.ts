export interface Invoice {
  _id: string;
  username: string;
  description: string;
  date: Date;
  duration: number;
}

export const INPUT_INVOICE = [
  {
    type: 'text',
    label: 'username',
    icon: 'perm_identity',
    error: 'Username is required'
  },
  {
    type: 'text',
    label: 'description',
    icon: 'edit',
    error: 'Description is required'
  },
  {
    type: 'number',
    label: 'duration',
    icon: 'edit',
    error: 'Duration is required'
  }
];
