import { Group, Stack, Table, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import { ClinicService } from '../../../../entities-interfaces/service.entity';

export default function Services() {
	const { admin, dispatch } = useUserAdmin();

	const services = admin?.services || [];

	useEffect(() => {
		Http.get('/service', {
			onSuccess: (data: ClinicService[]) => {
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

				<Table>
					<thead>
						<tr>
							<th> Name </th>
							<th> Description </th>
							<th> Action </th>
						</tr>
					</thead>
					<tbody>
						{services.map((service) => (
							<tr key={service.id}>
								<td> {service.name} </td>
								<td> {service.description} </td>
								<td> Action </td>
							</tr>
						))}
					</tbody>
				</Table>
			</Stack>
		</>
	);
}
