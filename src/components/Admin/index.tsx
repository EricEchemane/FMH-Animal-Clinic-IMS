import Head from 'next/head';
import React, { useState } from 'react';
import {
	UserAdminContextProvider,
	useUserAdmin,
} from '~/providers/user-admin-prodiver';
import LoginComponent from './LoginComponent/LoginComponent';

function Admin() {
	useState();
	const adminContext = useUserAdmin();
	console.log({ adminContext });

	return (
		<>
			<Head>
				<title> Admin - FMH Animal Clinic</title>
			</Head>
			<LoginComponent />
		</>
	);
}

export default function AdminWrapper() {
	return (
		<UserAdminContextProvider>
			<Admin />
		</UserAdminContextProvider>
	);
}
