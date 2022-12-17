import {
	Card,
	Group,
	Stack,
	Title,
	Text,
	Divider,
	ActionIcon,
	Menu,
	Badge,
	TextInput,
	Select,
	Button,
} from '@mantine/core';
import {
	IconArchive,
	IconCalendar,
	IconCheck,
	IconDots,
	IconFilter,
	IconFolderOff,
	IconSearch,
	IconTrash,
} from '@tabler/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { dateFilters } from '~/components/Admin/types';
import {
	ClinicServices,
	ClinicServicesArray,
	Schedule,
} from '~/entities-interfaces/schedule.entity';
import NoPending from './NoPending';

type Props = {
	pending: Schedule[];
};

export default function PendingAppointments(props: Props) {
	const [pending, setPending] = useState(props.pending);
	const [serviceFilter, setServiceFilter] = useState('');
	const [dateFilter, setDateFilter] = useState<dateFilters>('All');

	const searchListener = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value.toLowerCase();
		const filtered = props.pending.filter((sched) => {
			const date = new Date(sched.date).toDateString().toLowerCase();
			const service = sched.service.toLowerCase();
			const name = sched.name.toLowerCase();
			const email = sched.email.toLowerCase();
			const pet_name = sched.pet_name.toLowerCase();

			return (
				name.includes(search) ||
				service.includes(search) ||
				email.includes(search) ||
				pet_name.includes(search) ||
				date.includes(search)
			);
		});
		setPending(filtered);
	};

	const filterByService = (service: ClinicServices) => {
		setServiceFilter(service);
		const filtered = props.pending.filter((sched) => sched.service === service);
		setPending(filtered);
	};

	const filterByDate = (filter: dateFilters) => {
		const filtered = props.pending.filter((sched) => {
			const date = new Date(sched.date);
			const today = new Date();
			const tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);
			const thisWeek = new Date();
			thisWeek.setDate(today.getDate() + 7);
			const nextWeek = new Date();
			nextWeek.setDate(today.getDate() + 14);

			switch (filter) {
				case 'Today':
					return date.toDateString() === today.toDateString();
				case 'Tomorrow':
					return date.toDateString() === tomorrow.toDateString();
				case 'This Week':
					return date.toDateString() <= thisWeek.toDateString();
				case 'Next Week':
					return date.toDateString() <= nextWeek.toDateString();
				default:
					return true;
			}
		});
		setDateFilter(filter);
		setPending(filtered);
	};

	const resetFilters = useCallback(() => {
		setPending(props.pending);
		setServiceFilter('');
		setDateFilter('All');
	}, [props.pending]);

	useEffect(() => {
		resetFilters();
	}, [resetFilters]);

	if (props.pending.length === 0) return <NoPending />;

	return (
		<Stack
			pr={'xl'}
			spacing={30}
		>
			<Title
				order={2}
				color='dimmed'
				weight={'normal'}
			>
				Pending Appointments
			</Title>

			<Group align={'flex-end'}>
				<TextInput
					onChange={searchListener}
					size='md'
					icon={<IconSearch />}
					label='Search schedule'
					placeholder='Start typing'
					radius={'xl'}
					style={{ width: '24rem' }}
				/>
				<Select
					size='md'
					icon={<IconFilter />}
					radius={'xl'}
					label='Filter by service type'
					placeholder='Pick service type'
					data={ClinicServicesArray.map((service) => ({
						value: service,
						label: service,
					}))}
					onChange={filterByService}
					value={serviceFilter}
				/>
				<Select
					size='md'
					icon={<IconCalendar />}
					radius={'xl'}
					label='Filter by date'
					placeholder='Filter by date'
					data={[
						{ value: 'All', label: 'All' },
						{ value: 'Today', label: 'Today' },
						{ value: 'Tomorrow', label: 'Tomorrow' },
						{ value: 'This Week', label: 'This Week' },
						{ value: 'Next Week', label: 'Next Week' },
					]}
					value={dateFilter}
					onChange={filterByDate}
				/>
				<Button
					onClick={resetFilters}
					variant='outline'
					radius={'xl'}
					size='md'
				>
					Reset filters
				</Button>
			</Group>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '2rem',
				}}
			>
				{pending.map((sched) => (
					<Card
						shadow='sm'
						p={'xl'}
						radius='lg'
						withBorder
						key={sched.id}
						style={{ overflow: 'visible' }}
					>
						<Stack spacing={1}>
							<Group
								position='apart'
								align='flex-start'
							>
								<Group align={'flex-start'}>
									<Badge
										variant='filled'
										size='lg'
										color={getServiceBadgeColor(sched.service)}
									>
										{sched.service}
									</Badge>
									<Text mb='md'>{new Date(sched.date).toDateString()}</Text>
								</Group>
								<Menu
									shadow='md'
									width={200}
									position='bottom-end'
								>
									<Menu.Target>
										<ActionIcon>
											<IconDots size={30} />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>Schedule</Menu.Label>
										<Menu.Item icon={<IconCheck size={14} />}>
											Mark as done
										</Menu.Item>
										<Menu.Item icon={<IconFolderOff size={14} />}>
											Mark as cancelled
										</Menu.Item>

										<Menu.Divider />

										<Menu.Label>Danger zone</Menu.Label>
										<Menu.Item icon={<IconArchive size={14} />}>
											Archive
										</Menu.Item>
										<Menu.Item
											color='red'
											icon={<IconTrash size={14} />}
										>
											Delete permanently
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
							<Title order={2}> {sched.name} </Title>
							<Text color={'dimmed'}> {sched.email} </Text>

							<Divider my={'md'} />

							<Text>
								<strong>Pet Name:</strong> {sched.pet_name}
							</Text>
							<Text>
								<strong>Concern:</strong> {sched.concern}
							</Text>
						</Stack>
					</Card>
				))}
			</div>
		</Stack>
	);
}

function getServiceBadgeColor(service: ClinicServices) {
	switch (service) {
		case 'Check-up':
			return 'red';
		case 'Confinement':
			return 'pink';
		case 'Deworming':
			return 'grape';
		case 'Minor Surgery':
			return 'pink';
		case 'Pet Grooming':
			return 'violet';
		case 'Rapid Test Kits':
			return 'blue';
		case 'Treatment':
			return 'indigo';
		case 'Ultrasound':
			return 'cyan';
		case 'Vaccination':
			return 'teal';
		case 'X-ray':
			return 'green';
		default:
			return '';
	}
}
