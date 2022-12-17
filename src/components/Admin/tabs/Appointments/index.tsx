import { Group, Stack, Title, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import { AppointmentTabs } from '../../types';
import AllAppointments from './AllAppointments';
import css from './style.module.css';

export default function Appointments() {
	const { admin, dispatch } = useUserAdmin();

	useEffect(() => {
		if (!admin?.access_token) return;
		Http.get('/scheduling', {
			accessToken: admin.access_token,
			onSuccess: (data) => dispatch({ action: 'set-schedules', payload: data }),
			onFail: (message) => showNotification({ message, color: 'red' }),
		});
	}, [admin?.access_token, dispatch]);

	const [currentTab, setCurrentTab] = useState<AppointmentTabs>('Pending');
	const [appointments, setAppointments] = useState(admin?.schedules || []);

	const _appointments = admin?.schedules || [];
	const pending = _appointments.filter((a) => a.status === 'pending');
	const done = _appointments.filter((a) => a.status === 'done');
	const cancelled = _appointments.filter((a) => a.status === 'cancelled');

	useEffect(() => {
		if (currentTab === 'All') setAppointments(admin?.schedules || []);
		else if (currentTab === 'Pending') setAppointments(pending);
		else if (currentTab === 'Done') setAppointments(done);
		else if (currentTab === 'Cancelled') setAppointments(cancelled);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTab, admin]);

	return (
		<>
			<Head>
				<title>Appointments - FMH Animal Clinic</title>
			</Head>

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
					<Title order={2}> Appointments </Title>
					<Group spacing={30}>
						<button
							className={css.schedStatus}
							tabIndex={1}
							data-active={currentTab === 'Pending'}
							onClick={() => setCurrentTab('Pending')}
						>
							<Title color='blue'>{pending.length}</Title>
							<Text>Pending</Text>
						</button>
						<button
							className={css.schedStatus}
							tabIndex={1}
							data-active={currentTab === 'Done'}
							onClick={() => setCurrentTab('Done')}
						>
							<Title color='green'>{done.length}</Title>
							<Text>Done</Text>
						</button>
						<button
							className={css.schedStatus}
							tabIndex={1}
							data-active={currentTab === 'Cancelled'}
							onClick={() => setCurrentTab('Cancelled')}
						>
							<Title color='orange'>{cancelled.length}</Title>
							<Text>Cancelled</Text>
						</button>
						<button
							className={css.schedStatus}
							tabIndex={1}
							onClick={() => setCurrentTab('All')}
							data-active={currentTab === 'All'}
						>
							<Title color='violet'>{_appointments.length}</Title>
							<Text>All</Text>
						</button>
					</Group>
				</Group>

				<AllAppointments appointments={appointments} />
			</Stack>
		</>
	);
}
