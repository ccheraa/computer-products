export interface Client {
  _id: string;
  clientCode: string;
  name: string;
  email: string;
  mobile: number;
  city: string;
  gender: string;
}

export const INPUT_CLIENT = [
  // {
    // type: 'text',
    // placeholder: 'code client',
    // control: 'codeClient',
    // icon: 'edit',
    // error: 'Maximum 4 characters.'
  // },
  {
    type: 'text',
    placeholder: 'name',
    control: 'name',
    icon: 'edit',
    error: 'This field is mandatory.'
  },
  {
    type: 'text',
    placeholder: 'email',
    control: 'email',
    icon: 'email',
    error: 'Invalid email adress.'
  },
];
