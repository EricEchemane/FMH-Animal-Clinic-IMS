import { Badge, Text, Card, Group, Stack, Title, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { Schedule } from '~/entities-interfaces/schedule.entity';
import Http from '~/utils/http-adapter';
import { getServiceBadgeColor } from '../Admin/tabs/Appointments/AllAppointments';

type Props = {};

export default function Appointments({}: Props) {
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		Http.get('/scheduling/me', {
			onSuccess: (data: Schedule[]) => setSchedules(data),
			loadingToggler: setIsLoading,
			onFail: (message) =>
				showNotification({ message, color: 'red', autoClose: false }),
		});
	}, []);

	const cancelAppointment = (id: string) => {
		const confirmed = confirm(
			'Are you sure you want to cancel your appointment?'
		);
		if (!confirmed) return;
		Http.patch(
			`/scheduling/${id}`,
			{
				status: 'cancelled',
			},
			{
				loadingToggler: setIsLoading,
				onFail: (message) =>
					showNotification({ message, color: 'red', autoClose: false }),
				onSuccess: () => {
					showNotification({
						message: 'Appointment cancelled',
						color: 'green',
					});
					setSchedules((prev) => {
						const newSchedules = [...prev];
						const index = newSchedules.findIndex((sched) => sched.id === id);
						newSchedules[index].status = 'cancelled';
						return newSchedules;
					});
				},
			}
		);
	};

	return (
		<>
			<Title
				my='md'
				order={2}
				color='dimmed'
			>
				Your Appointments
			</Title>

			<Stack>
				{schedules.map((sched) => {
					return (
						<Card
							key={sched.id}
							p='xl'
							withBorder
							shadow={'md'}
						>
							<Stack>
								<Group>
									<Title order={3}>
										{' '}
										{new Date(sched.date).toDateString()}{' '}
									</Title>
									<Badge
										size='lg'
										color={getServiceBadgeColor(sched.service)}
									>
										{sched.service}
									</Badge>
								</Group>
								<Text>
									Fur Patient: <strong>{sched.pet_name}</strong>
								</Text>
								{sched.concern && (
									<Text>
										Concern: <strong>{sched.concern}</strong>
									</Text>
								)}
								<Group position='right'>
									<Button
										radius={'xl'}
										variant='subtle'
										color={'orange'}
										disabled={sched.status === 'cancelled'}
										loading={isLoading}
										onClick={() => cancelAppointment(sched.id)}
									>
										{sched.status === 'cancelled'
											? 'Cancelled'
											: 'Cancel Appointment'}
									</Button>
								</Group>
							</Stack>
						</Card>
					);
				})}
			</Stack>
		</>
	);
}
