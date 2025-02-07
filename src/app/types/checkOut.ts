export interface CheckoutSubmission {
    _type: 'checkout';
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    postalCode: string;
    createdAt: string;
  }