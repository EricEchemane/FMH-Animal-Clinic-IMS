import {
	Group,
	Stack,
	Title,
	SimpleGrid,
	Modal,
	TextInput,
	Textarea,
	Button,
} from '@mantine/core';
import React, { FormEvent, useEffect, useState } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import ClinicService from './ClinicService';
import { ClinicService as ClinicServiceType } from '~/entities-interfaces/service.entity';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

export default function Services() {
	const { admin, dispatch } = useUserAdmin();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedService, setSelectedService] = useState<
		ClinicServiceType | undefined
	>();
	const form = useForm({
		initialValues: {
			name: selectedService?.name || '',
			description: selectedService?.description || '',
		},
	});
	const services = admin?.services || [];

	const save = (e: FormEvent) => {
		e.preventDefault();
		Http.patch(`/service/${selectedService?.id}`, form.values, {
			loadingToggler: setIsLoading,
			onSuccess: (data) => {
				dispatch({ action: 'update-service', payload: data });
				setSelectedService(undefined);
				showNotification({
					title: 'Saved!',
					message: 'Service updated successfully',
					color: 'green',
				});
			},
		});
	};

	useEffect(() => {
		if (!selectedService) return;
		form.setValues({ ...selectedService });
		form.resetDirty();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedService]);

	useEffect(() => {
		Http.get('/service', {
			onSuccess: (data) => {
				dispatch({ action: 'set-services', payload: data });
			},
			onFail: console.log,
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
					pr='xl'
					pb='xl'
				>
					{services.map((service) => (
						<ClinicService
							service={service}
							key={service.id}
							onEdit={() => setSelectedService(service)}
						/>
					))}
				</SimpleGrid>
			</Stack>

			<Modal
				opened={selectedService !== undefined}
				onClose={() => setSelectedService(undefined)}
				title='Edit Service'
				size={'lg'}
				radius='lg'
			>
				<form onSubmit={save}>
					<Stack>
						<TextInput
							size='lg'
							label='Name'
							placeholder='Name'
							{...form.getInputProps('name')}
							required
						/>
						<Textarea
							size='lg'
							label='Description'
							placeholder='Description'
							minRows={5}
							{...form.getInputProps('description')}
							required
						/>
						<Group
							my='md'
							position='right'
						>
							<Button
								type='submit'
								loading={isLoading}
								disabled={!form.isDirty()}
							>
								Save
							</Button>
						</Group>
					</Stack>
				</form>
			</Modal>
		</>
	);
}
