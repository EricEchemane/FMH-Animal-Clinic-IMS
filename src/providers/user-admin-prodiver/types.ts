import { UserRole } from '../customer-provider/types';

export interface Admin {
  email: string;
  name: string;
  access_token: string;
}

export interface DispatchConfig {
  action: 'set-user-admin' | 'set-access-token';
  payload: any;
}

export interface IUserAdminContext {
  admin: Admin;
  dispatch: (config: DispatchConfig) => void;
}

export interface UserAdminProviderProps {
  children: JSX.Element;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  role: UserRole.admin;
}
