import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import Admin from '~/components/Admin';
import jwt from 'jsonwebtoken';
import { User } from '~/entities-interfaces/user.entity';
import { UserRole } from '~/providers/customer-provider/types';

export default Admin;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const cookies = new Cookies(req, res);
	const token = cookies.get('token');

	if (!token) {
		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		};
	}

	if (!process.env.JWTSECRET) {
		console.log('no JWTSECRET is provided');
		throw new Error('no JWTSECRET is provided');
	}

	try {
		const user = jwt.verify(token, process.env.JWTSECRET) as User;

		if (
			user.role === UserRole.staff ||
			user.role === UserRole.super_admin ||
			user.role === UserRole.veterinarian
		) {
			return {
				props: { user },
			};
		}
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	} catch (error: any) {
		console.log({ error: error?.message });

		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		};
	}
};
