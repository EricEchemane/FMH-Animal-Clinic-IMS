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

const formatdate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
const formatChosenDate = (date: Date) => dayjs(date).format('MMMM D, YYYY');

const scheduleThresholdPerDay = 10;

const countSchedules = (schedules: Schedule[], date: Date) => {
	const formattedDate = formatdate(date);
	return schedules.filter((sched) => sched.date.toString() === formattedDate)
		.length;
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

	useEffect(() => {
		Http.get('/scheduling/from-this-month-and-next', {
			onSuccess: (data) => setSchedules(data),
		});
	}, []);

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
			onSuccess: () => setSubmitted(true),
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
						<Title>FMH Animal Clnic</Title>
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

						<Button
							variant='outline'
							radius={'xl'}
							onClick={() => signOut()}
						>
							Sign Out
						</Button>
					</Group>
				</Card>
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
							size={width > 700 ? 'xl' : 'md'}
							value={chosenDate}
							onChange={setChosenDate}
							minDate={dayjs(new Date()).toDate()}
							maxDate={dayjs(new Date())
								.add(1, 'month')
								.endOf('month')
								.toDate()}
							excludeDate={(date) => {
								const count = countSchedules(schedules, date);
								const isFull = count >= scheduleThresholdPerDay;
								return isFull || date.getDay() === new Date().getDay();
							}}
							renderDay={(date) => {
								const day = date.getDate();
								const count = countSchedules(schedules, date);
								const isFull = count >= scheduleThresholdPerDay;
								return (
									<div>
										<div className={isFull ? style.full : ''}>
											{isFull ? 'Full' : day}{' '}
										</div>
									</div>
								);
							}}
						/>
					</Stack>
				</Stack>
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
