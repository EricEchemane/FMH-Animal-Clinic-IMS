import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import SuperAdmin from '~/components/SuperAdmin';
import jwt from 'jsonwebtoken';
import { User } from '~/entities-interfaces/user.entity';

export default SuperAdmin;

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

		if (user.role !== 'super_admin') {
			return {
				redirect: {
					destination: '/sign-in',
					permanent: false,
				},
			};
		}

		return {
			props: {},
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
