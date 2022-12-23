import { User } from './user.entity';

export interface Feedback {
	id: string;
	rating: number;
	message: string;
	is_published: boolean;
	user: User;
}
