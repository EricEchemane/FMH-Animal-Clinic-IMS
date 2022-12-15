
export enum UserRole {
  vet = 'vet',
  admin = 'admin',
  staff = 'staff',
  super_admin = 'super_admin',
  customer = 'customer',
  pending = 'pending'
}

export interface Customer {
  email: string;
  name: string;
  image: string;
  access_token: string;
}

export interface DispatchConfig {
  action: 'set-customer' | 'set-access-token';
  payload: any;
}

export interface ICustomerContext {
  customer: Customer;
  dispatch: (config: DispatchConfig) => void;
}

export interface CustomerProviderProps {
  children: JSX.Element;
}

export interface SignInDto {
  email: string;
  password: string;
  name: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  role: UserRole;
}

export interface ErrorFromBackend {
  statusCode: number;
  message: string;
  error: string[];
}

export interface AccessToken {
  access_token: string;
}