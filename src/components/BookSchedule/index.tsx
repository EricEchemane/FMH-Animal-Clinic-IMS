import {
	Avatar,
	Button,
	Card,
	Center,
	Group,
	Stack,
	Title,
	Text,
	LoadingOverlay,
	Modal,
	TextInput,
	Textarea,
	Badge,
	Tooltip,
} from '@mantine/core';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import useCustomerSignIn from '~/hooks/useCustomerSignIn';
import { useCustomer } from '~/providers/customer-provider';
import { IconBrandGoogle, IconCircleCheck } from '@tabler/icons';
import style from './style.module.css';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Schedule } from '~/entities-interfaces/schedule.entity';
import ServiceSelect from './ServiceSelect';
import Router from 'next/router';
import Http from '~/utils/http-adapter';
import { useViewportSize } from '@mantine/hooks';
import Appointments from './Appointments';

export const formatdate = (date: Date) =>
	dayjs(new Date(date)).format('YYYY-MM-DD');
const formatChosenDate = (date: Date) => dayjs(date).format('MMMM D, YYYY');

const scheduleThresholdPerDay = 10;

const countSchedules = (schedules: Schedule[], date: Date) => {
	const formattedDate = formatdate(date);
	return schedules.filter((sched) => {
		const d = new Date(sched.date);
		const schedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
		return formatdate(schedDate) === formattedDate;
	}).length;
};

export default function BookSchedule() {
	useCustomerSignIn();
	const { customer } = useCustomer();

	const { width } = useViewportSize();
	const [chosenDate, setChosenDate] = useState<Date | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [service, setService] = useState<string | null>(null);
	const [petName, setPetName] = useState('');
	const [concern, setConcern] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentTab, setCurrentTab] = useState<'booking' | 'appointments'>(
		'booking'
	);

	useEffect(() => {
		Http.get('/scheduling/from-this-month-and-next', {
			onSuccess: (data: Schedule[]) => setSchedules(data),
			loadingToggler: setIsLoading,
		});
	}, []);

	const checkIfUserHasScheduleOnAGivenDate = (date: Date) => {
		const formattedDate = formatdate(date);
		return schedules.some((sched) => {
			const d = new Date(sched.date);
			const schedDate = new Date(
				d.getFullYear(),
				d.getMonth(),
				d.getDate() + 1
			);
			return (
				formatdate(schedDate) === formattedDate &&
				sched.status === 'pending' &&
				sched.email === customer.email
			);
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload = {
			pet_name: petName,
			concern,
			service,
			date: chosenDate?.toISOString(),
			name: customer.name,
		};
		Http.post('/scheduling', payload, {
			onFail: alert,
			onSuccess: () => {
				setSubmitted(true);
				Router.reload();
			},
			loadingToggler: setIsSubmitting,
		});
	};

	if (!customer)
		return (
			<>
				<Head>
					<title> Book Schedule </title>
				</Head>

				<Center className={style.signinRoot}>
					<Stack
						spacing={0}
						align={'center'}
					>
						<Title>FMH Animal Clinic</Title>
						<Title
							order={3}
							mb='xl'
						>
							Please sign in to book an appointment
						</Title>
						<Button
							radius={'xl'}
							leftIcon={<IconBrandGoogle strokeWidth={4} />}
							size='xl'
							color={'violet'}
							onClick={() => signIn('google')}
						>
							Sign In with Google
						</Button>
					</Stack>
				</Center>
			</>
		);

	return (
		<>
			<Head>
				<title> {customer.name} - Book Schedule </title>
			</Head>

			<Stack p={'md'}>
				<Card
					radius={'md'}
					shadow={'md'}
				>
					<Group
						position='apart'
						align={'center'}
					>
						<Group>
							<Avatar
								size={'lg'}
								radius={'xl'}
								src={customer.image}
								alt={customer.name}
							/>
							<div>
								<Title order={4}>{customer.name}</Title>
								<Text> {customer.email} </Text>
							</div>
						</Group>

						<Group>
							<Button
								variant='filled'
								color='violet'
								radius='xl'
								onClick={() => Router.back()}
								disabled={isLoading}
							>
								Home
							</Button>
							<Button
								variant={currentTab === 'booking' ? 'filled' : 'light'}
								radius={'xl'}
								onClick={() => setCurrentTab('booking')}
							>
								Booking
							</Button>
							<Button
								variant={currentTab === 'appointments' ? 'filled' : 'light'}
								radius={'xl'}
								onClick={() => setCurrentTab('appointments')}
							>
								My Appointments
							</Button>
							<Button
								variant='outline'
								radius={'xl'}
								onClick={() => signOut()}
							>
								Sign Out
							</Button>
						</Group>
					</Group>
				</Card>
				{currentTab === 'appointments' && <Appointments />}
				{currentTab === 'booking' && (
					<Stack
						my='xl'
						spacing={'xl'}
					>
						{!chosenDate ? (
							<Text
								align='center'
								color={'violet'}
								weight={'bold'}
							>
								Please choose a date for your appointment by tapping a date from
								the calendar
							</Text>
						) : (
							<Group position={'apart'}>
								<div>
									<Text>Chosen Date:</Text>
									<Text weight={'bold'}>{formatChosenDate(chosenDate)}</Text>
								</div>
								<Button
									onClick={() => setShowModal(true)}
									size='lg'
								>
									Book Now
								</Button>
							</Group>
						)}

						<Stack
							align={'center'}
							sx={{ position: 'relative' }}
						>
							<LoadingOverlay visible={isLoading} />

							<Calendar
								fullWidth={width > 1000 ? true : false}
								size={width > 7000 ? 'lg' : 'md'}
								value={chosenDate}
								onChange={(date) => {
									setChosenDate(date ? new Date(date) : date);
								}}
								minDate={dayjs(new Date()).toDate()}
								maxDate={dayjs(new Date())
									.add(1, 'month')
									.endOf('month')
									.toDate()}
								excludeDate={(date) => {
									const count = countSchedules(schedules, date);
									const isFull = count >= scheduleThresholdPerDay;
									const d = new Date();
									const today = new Date(
										d.getFullYear(),
										d.getMonth(),
										d.getDate()
									);
									return (
										isFull ||
										date.toDateString() === today.toDateString() ||
										checkIfUserHasScheduleOnAGivenDate(date)
									);
								}}
								renderDay={(date) => {
									const day = date.getDate();
									const count = countSchedules(schedules, date);
									const isFull = count >= scheduleThresholdPerDay;
									const done = date < new Date();
									const hasAppointemtn =
										checkIfUserHasScheduleOnAGivenDate(date);

									let badgeColor = isFull ? 'red' : 'green';
									if (done) badgeColor = 'gray';
									if (hasAppointemtn) badgeColor = 'yellow';

									let badgeText: any = count + ' booked';
									if (isFull) badgeText = 'Full';
									if (done) badgeText = 'Done';
									if (hasAppointemtn) badgeText = '1 appointment';

									return (
										<Tooltip label='Book now!'>
											<div>
												<div className={isFull && !done ? style.full : ''}>
													{width > 1000 ? (
														<Group
															position='apart'
															px={'xl'}
														>
															<div>{day}</div>
															<Badge
																style={{ textTransform: 'capitalize' }}
																size='lg'
																color={badgeColor}
															>
																{badgeText}
															</Badge>
														</Group>
													) : (
														<div>{isFull ? 'Full' : day}</div>
													)}
												</div>
											</div>
										</Tooltip>
									);
								}}
								styles={(theme) => ({
									cell: {
										border: `1px solid ${theme.colorScheme === 'dark'
											? theme.colors.dark[4]
											: theme.colors.gray[2]
											}`,
									},
									day: {
										borderRadius: 0,
										height: 70,
										fontSize: theme.fontSizes.lg,
									},
									weekday: { fontSize: theme.fontSizes.lg },
									weekdayCell: {
										fontSize: theme.fontSizes.xl,
										backgroundColor:
											theme.colorScheme === 'dark'
												? theme.colors.dark[5]
												: theme.colors.gray[0],
										border: `1px solid ${theme.colorScheme === 'dark'
											? theme.colors.dark[4]
											: theme.colors.gray[2]
											}`,
										height: 70,
									},
								})}
							/>
						</Stack>
					</Stack>
				)}
			</Stack>

			<Modal
				size={'lg'}
				opened={showModal}
				closeOnClickOutside={false}
				onClose={() => setShowModal(false)}
				title="😊 Let's complete your appoinment"
			>
				{!submitted ? (
					<form
						style={{ position: 'relative' }}
						onSubmit={handleSubmit}
					>
						<LoadingOverlay visible={isSubmitting} />
						<Stack spacing={'xl'}>
							<TextInput
								size='lg'
								placeholder="Your pet's name"
								label="Your pet's name"
								value={petName}
								onChange={(e) => setPetName(e.target.value)}
								required
							/>
							<ServiceSelect
								value={service}
								onChange={setService}
							/>
							<Textarea
								placeholder='Other concern'
								label='Other concern'
								size='lg'
								value={concern}
								onChange={(e) => setConcern(e.target.value)}
							/>
							<Group position='right'>
								<Button
									size='lg'
									color={'violet'}
									type='submit'
									radius={'xl'}
								>
									Submit
								</Button>
							</Group>
						</Stack>
					</form>
				) : (
					<Stack align={'center'}>
						<Group align={'center'}>
							<IconCircleCheck
								size='2rem'
								color='green'
							/>
							<Text
								weight={'bold'}
								color='green'
								size={'lg'}
							>
								Booked Successfully!
							</Text>
						</Group>
						<Text align='center'>
							We will send you an email for the confirmation and kindly follow
							it accordingly.
						</Text>
						<Button
							mt={'xl'}
							variant='outline'
							onClick={() => Router.push('/')}
						>
							Ok, go back to home
						</Button>
					</Stack>
				)}
			</Modal>
		</>
	);
}
