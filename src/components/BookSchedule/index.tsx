import {
	Avatar,
	Button,
	Card,
	Center,
	Group,
	Stack,
	Title,
	Text,
	Box,
	LoadingOverlay,
	Indicator,
} from '@mantine/core';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import useCustomerSignIn from '~/hooks/useCustomerSignIn';
import { useCustomer } from '~/providers/customer-provider';
import { IconBrandGoogle } from '@tabler/icons';
import style from './style.module.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import useSWR from 'swr';
import { createGet } from '~/providers/customer-provider/helpers';
import { Schedule } from '~/entities-interfaces/schedule.entity';

const formatdate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
const formatChosenDate = (date: Date) => dayjs(date).format('MMMM D, YYYY');

const scheduleThresholdPerDay = 5;

const countSchedules = (schedules: Schedule[], date: Date) => {
	const formattedDate = formatdate(date);
	return schedules.filter((sched) => sched.date.toString() === formattedDate)
		.length;
};

export default function BookSchedule() {
	useCustomerSignIn();
	const { customer } = useCustomer();

	const [chosenDate, setChosenDate] = useState<Date | null>(null);

	const { data, error, isLoading } = useSWR('scheds', () =>
		createGet('/scheduling/from-this-month-and-next', customer.access_token)
	);

	const schdules: Schedule[] = data ? data.map((sched: Schedule) => sched) : [];

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
						<Text>Please choose a date for your appointment</Text>
					) : (
						<Group position={'apart'}>
							<div>
								<Text>Chosen Date:</Text>
								<Text weight={'bold'}>{formatChosenDate(chosenDate)}</Text>
							</div>
							<Button size='lg'> Book Now </Button>
						</Group>
					)}

					<Stack
						align={'center'}
						sx={{ position: 'relative' }}
					>
						<LoadingOverlay visible={!data} />
						<Calendar
							size='xl'
							value={chosenDate}
							onChange={setChosenDate}
							minDate={dayjs(new Date()).toDate()}
							maxDate={dayjs(new Date())
								.add(1, 'month')
								.endOf('month')
								.toDate()}
							excludeDate={(date) => {
								const count = countSchedules(schdules, date);
								const isFull = count >= scheduleThresholdPerDay;
								return date.getDay() === 0 || date.getDay() === 6 || isFull;
							}}
							renderDay={(date) => {
								const day = date.getDate();
								const count = countSchedules(schdules, date);
								const isFull = count >= scheduleThresholdPerDay;
								return (
									<div>
										<div className={isFull ? style.full : ''}>{day}</div>
									</div>
								);
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}
