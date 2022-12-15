import React, { useState } from 'react';
import {
	UserAdminContextProvider,
	useUserAdmin,
} from '~/providers/user-admin-prodiver';

function Admin() {
	useState();
	const adminContext = useUserAdmin();
	console.log({ adminContext });

	return <div>Admin</div>;
}

export default function AdminWrapper() {
	return (
		<UserAdminContextProvider>
			<Admin />
		</UserAdminContextProvider>
	);
}
