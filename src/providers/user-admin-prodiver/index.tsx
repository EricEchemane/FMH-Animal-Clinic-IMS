import { createContext, useContext, useReducer } from 'react';
import { Schedule } from '~/entities-interfaces/schedule.entity';
import Http from '~/utils/http-adapter';
import {
	UserAdminProviderProps,
	DispatchConfig,
	IUserAdminContext,
	Admin,
} from './types';

const UserAdminContext = createContext<any>(null);

export const useUserAdmin = () =>
	useContext<IUserAdminContext>(UserAdminContext);

export function UserAdminContextProvider(props: UserAdminProviderProps) {
	const [state, dispatch] = useReducer(reducer, undefined);
	return (
		<UserAdminContext.Provider value={{ admin: state, dispatch }}>
			{props.children}
		</UserAdminContext.Provider>
	);
}

const reducer = (state: Admin, { payload, action }: DispatchConfig) => {
	if (action === 'set-products') {
		return { ...state, products: payload };
	}

	if (action === 'set-user-admin') {
		return { ...state, ...payload };
	}

	if (action === 'set-access-token') {
		return { ...state, access_token: payload };
	}

	if (action === 'set-schedules') {
		return { ...state, schedules: payload };
	}

	if (action === 'mark-schedule-as-done') {
		const schedules = state.schedules;
		const index = schedules.findIndex(
			(schedule: any) => schedule.id === payload
		);
		schedules[index].status = 'done';
		Http.patch(
			'/scheduling/' + payload,
			{ status: 'done' },
			{ accessToken: state.access_token }
		);
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-cancelled') {
		const schedules = state.schedules;
		const index = schedules.findIndex(
			(schedule: any) => schedule.id === payload
		);
		schedules[index].status = 'cancelled';
		Http.patch(
			'/scheduling/' + payload,
			{ status: 'cancelled' },
			{ accessToken: state.access_token }
		);
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-pending') {
		const schedules = state.schedules;
		const index = schedules.findIndex(
			(schedule: any) => schedule.id === payload
		);
		schedules[index].status = 'pending';
		Http.patch(
			'/scheduling/' + payload,
			{ status: 'pending' },
			{ accessToken: state.access_token }
		);
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-archived') {
		const schedules = state.schedules.filter(
			(schedule: Schedule) => schedule.id !== payload
		);
		Http.patch(
			'/scheduling/' + payload,
			{ archived: true },
			{ accessToken: state.access_token }
		);
		return { ...state, schedules };
	}

	return state;
};
