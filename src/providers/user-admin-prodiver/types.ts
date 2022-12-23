import { Feedback } from '~/entities-interfaces/feedback.entity';
import { Product } from '~/entities-interfaces/product.entity';
import { Schedule } from '~/entities-interfaces/schedule.entity';
import { UserRole } from '../customer-provider/types';

export interface Admin {
	email: string;
	name: string;
	prefer_color_scheme: string;
	schedules: Schedule[];
	products: Product[];
	feedbacks: Feedback[];
}

export interface DispatchConfig {
	action:
		| 'set-user-admin'
		| 'set-schedules'
		| 'set-prefer-color-scheme'
		| 'sign-out'
		| 'mark-schedule-as-done'
		| 'mark-schedule-as-cancelled'
		| 'mark-schedule-as-pending'
		| 'mark-schedule-as-archived'
		| 'set-products'
		| 'unarchive-product'
		| 'archive-product'
		| 'set-product-image-url'
		| 'add-new-product'
		| 'set-feedbacks'
		| 'publish-feedback';

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
