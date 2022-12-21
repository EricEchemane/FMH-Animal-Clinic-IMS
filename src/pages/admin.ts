import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import Admin from '~/components/Admin';

export default Admin;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const cookies = new Cookies(req, res);
	const token = cookies.get('token');
	console.log({ cookies: req.cookies });
	
	if (!token) {
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
};
