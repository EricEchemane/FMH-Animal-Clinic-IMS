import { Group, Stack, Title, SimpleGrid } from '@mantine/core';
import React, { useEffect } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import ClinicService from './ClinicService';

export default function Services() {
	const { admin, dispatch } = useUserAdmin();

	const services = admin?.services || [];

	useEffect(() => {
		Http.get('/service', {
			onSuccess: (data) => {
				dispatch({ action: 'set-services', payload: data });
			},
		});
	}, [dispatch]);

	return (
		<>
			<Stack
				style={{
					height: '100%',
					overflowY: 'auto',
				}}
			>
				<Group
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 2,
						backdropFilter: 'blur(3rem)',
						padding: '1rem',
					}}
					position='apart'
				>
					<Title order={2}> Clinic Services </Title>
				</Group>

				<SimpleGrid
					cols={3}
					spacing={'xl'}
				>
					{services.map((service) => (
						<ClinicService
							service={service}
							key={service.id}
						/>
					))}
				</SimpleGrid>
			</Stack>
		</>
	);
}
