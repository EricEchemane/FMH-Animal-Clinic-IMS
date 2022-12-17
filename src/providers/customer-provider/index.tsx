import { createContext, useContext, useReducer } from 'react';
import {
	CustomerProviderProps,
	DispatchConfig,
	ICustomerContext,
} from './types';

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
	if (action === 'set-customer') {
		return { ...state, ...payload };
	}

	if (action === 'set-access-token') {
		return { ...state, access_token: payload };
	}

	return state;
};
