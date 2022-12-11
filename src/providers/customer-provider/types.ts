
export enum UserRole {
  vet = 'vet',
  admin = 'admin',
  staff = 'staff',
  super_admin = 'super_admin',
  customer = 'customer',
}

export interface Customer {
  email: string;
  access_token: string;
}

export interface DispatchConfig {
  action: 'sign-in' | 'set-user';
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