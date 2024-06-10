import { Beneficiary } from './store/types/types';

const mockBeneficiaries: Beneficiary[] = [
  {
    id:'001',
    fullName: 'John Doe',
    address: '123 Main St',
    country: 'USA',
    pincode: '12345',
    bankName:'ICICI Bank',
    accountNumber:'200908940231'
  },
  {
    id:'020',
    fullName: 'John Doe2',
    address: '123 Main St',
    country: 'USA',
    pincode: '12345',
    bankName:'HDFC Bank',
    accountNumber:'900763329046'
  },
  
  // Add more mock beneficiaries
];

export default mockBeneficiaries;
