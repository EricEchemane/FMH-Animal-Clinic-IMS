import { UserRole } from '~/providers/customer-provider/types';
import { Feedback } from './feedback.entity';

export interface User {
	id: string;
	role: UserRole;
	email: string;
	name: string;
	hash: string;
	prefer_color_scheme: string;
	feedbacks: Feedback[];
}
