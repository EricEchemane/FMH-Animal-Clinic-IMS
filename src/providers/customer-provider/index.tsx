import { createContext, useContext, useReducer } from 'react';
import { signIn, signUp } from './helpers';
import { CustomerProviderProps, DispatchConfig, ICustomerContext } from './types';

const CustomerContext = createContext<any>(null);

export const useCustomer = () => useContext<ICustomerContext>(CustomerContext);

export function CustomerContextProvider(props: CustomerProviderProps) {
  const [state, dispatch] = useReducer(reducer, undefined);
  return (
    <CustomerContext.Provider value={{ customer: state, dispatch }}>
      {props.children}
    </CustomerContext.Provider>
  );
}

const reducer = (state: any, { payload, action }: DispatchConfig) => {

  if (action === 'sign-in') {
    signIn(payload).then(data => {
      if (data.ok) {
        return { ...state, access_token: data.data?.access_token };
      }
      signUp({ ...payload, role: 'customer' }).then(data => {
        return { ...state, access_token: data.data?.access_token };
      });
    });
  }
  else if (action === 'set-user') {
    return { ...state, ...payload };
  }

  return state;
};