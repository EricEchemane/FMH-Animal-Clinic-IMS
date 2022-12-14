import Router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import { Product } from '~/entities-interfaces/product.entity';
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
	if (action === 'add-new-service') {
		const services = state.services;
		const index = services.findIndex(
			(service: any) => service.id === payload.id
		);
		if (index === -1) {
			services.push(payload);
		}
		return { ...state, services };
	}

	if (action === 'remove-service') {
		Http.delete('/service/' + payload, {});
		const services = state.services.filter(
			(service: any) => service.id !== payload
		);
		return { ...state, services };
	}

	if (action === 'update-service') {
		const services = state.services;
		const index = services.findIndex(
			(service: any) => service.id === payload.id
		);
		services[index] = payload;
		return { ...state, services };
	}

	if (action === 'set-services') {
		return { ...state, services: payload };
	}

	if (action === 'unpublish-feedback') {
		const feedbacks = state.feedbacks;
		const index = feedbacks.findIndex(
			(feedback: any) => feedback.id === payload
		);
		feedbacks[index].is_published = false;
		Http.patch('/feedback/' + payload, { is_published: false });
		return { ...state, feedbacks };
	}

	if (action === 'publish-feedback') {
		const feedbacks = state.feedbacks;
		const index = feedbacks.findIndex(
			(feedback: any) => feedback.id === payload
		);
		feedbacks[index].is_published = true;
		Http.patch('/feedback/' + payload, { is_published: true });
		return { ...state, feedbacks };
	}

	if (action === 'set-feedbacks') {
		return { ...state, feedbacks: payload };
	}

	if (action === 'add-new-product') {
		const products = [payload, ...state.products];
		return { ...state, products };
	}

	if (action === 'set-product-image-url') {
		const products = state.products;
		const index = products.findIndex(
			(product: Product) => product.id === payload.id
		);
		products[index] = payload;
		return { ...state, products };
	}

	if (action === 'set-products') {
		return { ...state, products: payload };
	}

	if (action === 'archive-product') {
		Http.patch('/product/toggle-archive/' + payload, {});
		const products = [...state.products];
		const index = products.findIndex(
			(product: Product) => product.id === payload
		);
		products[index].archived = true;
		return { ...state, products };
	}

	if (action === 'unarchive-product') {
		Http.patch('/product/toggle-archive/' + payload, {});
		const products = [...state.products];
		const index = products.findIndex(
			(product: Product) => product.id === payload
		);
		products[index].archived = false;
		return { ...state, products };
	}

	if (action === 'sign-out') {
		Http.post('/auth/signout', {});
		Router.replace('/sign-in');
	}

	if (action === 'set-prefer-color-scheme') {
		Http.patch('/user/' + payload.id, { prefer_color_scheme: payload.theme });
		Http.post('/auth/signout', {});
		Router.replace('/sign-in');
	}

	if (action === 'set-user-admin') {
		return { ...state, ...payload };
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
		Http.patch('/scheduling/' + payload, { status: 'done' });
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-cancelled') {
		const schedules = state.schedules;
		const index = schedules.findIndex(
			(schedule: any) => schedule.id === payload
		);
		schedules[index].status = 'cancelled';
		Http.patch('/scheduling/' + payload, { status: 'cancelled' });
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-pending') {
		const schedules = state.schedules;
		const index = schedules.findIndex(
			(schedule: any) => schedule.id === payload
		);
		schedules[index].status = 'pending';
		Http.patch('/scheduling/' + payload, { status: 'pending' });
		return { ...state, schedules };
	}

	if (action === 'mark-schedule-as-archived') {
		const schedules = state.schedules.filter(
			(schedule: Schedule) => schedule.id !== payload
		);
		Http.patch('/scheduling/' + payload, { archived: true });
		return { ...state, schedules };
	}

	return state;
};
