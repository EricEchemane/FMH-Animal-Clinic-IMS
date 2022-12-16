import Head from 'next/head';
import React from 'react';
import useAdminSignin from '~/hooks/useAdminSignin';
import { useUserAdmin } from '~/providers/user-admin-prodiver';

export default function Admin() {
	const { admin, dispatch } = useUserAdmin();
	useAdminSignin();

	return (
		<>
			<Head>
				<title> Admin - FMH Animal Clinic</title>
			</Head>
		</>
	);
}
