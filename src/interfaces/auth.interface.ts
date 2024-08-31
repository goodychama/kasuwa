export interface CreateUserDTO {
  email: string;
  password: string;
  username: string;
  role?: 'MERCHANT' | 'CUSTOMER' | 'ADMIN';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateCustomerDTO {
  userId: string;
  address: string;
  image?: string;
  firstName: string;
  lastName: string;
  bio: string;
  dob: string;
}

export interface UpdateCustomerDTO {
  address?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  dob?: string;
}




export interface UpdateMerchantDTO {
  bio?: string;
  image?: string;
  country?: string;
  address?: string;
  businessAddress?: string;
  businessCred?: string;
  approved?: boolean;
}

export interface CreateCustomerInput {
  email: string;
  password: string;
  username: string;
  address: string;
  firstName: string;
  lastName: string;
  bio?: string;
  dob?: string;
  image?: string;
}

export interface RegisterMerchantDTO {
  email: string;
  password: string;
  username: string;
  bio?: string;
  image?: string;
  country: string;
  address: string;
  businessAddress: string;
  businessCred: string;
}
