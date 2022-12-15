import {
	Button,
	Card,
	Center,
	PasswordInput,
	Stack,
	TextInput,
	Title,
	Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Head from 'next/head';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import css from './style.module.css';

export default function LoginComponent() {
	const { dispatch } = useUserAdmin();
	const [isLoading, setIsLoading] = useState(false);

	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
		},
	});

	const login = (e: FormEvent) => {
		e.preventDefault();
		Http.post('/auth/signin', loginForm.values, {
			onSuccess: (data) => {
				dispatch({
					action: 'set-user-admin',
					payload: {
						access_token: data.access_token,
						email: loginForm.values.email,
					},
				});
				showNotification({
					message: 'Login successful',
					title: 'Success',
					color: 'green',
				});
			},
			onFail: (message) =>
				showNotification({
					message,
					title: 'Error',
					color: 'red',
				}),
			loadingToggler: setIsLoading,
		});
	};

	return (
		<>
			<Head>
				<title> Login - FMH Clinic </title>
			</Head>
			<Center className={css.rootContainer}>
				<form
					className={css.form}
					onSubmit={login}
				>
					<Card
						shadow={'md'}
						p='xl'
					>
						<Stack>
							<div>
								<Title color={'dimmed'}>Sign in</Title>
								<Text>Please provide your credentials</Text>
							</div>
							<TextInput
								size='lg'
								required
								label='Email'
								placeholder='Email'
								{...loginForm.getInputProps('email')}
							/>
							<PasswordInput
								required
								size='lg'
								label='Password'
								placeholder='Password'
								{...loginForm.getInputProps('password')}
							/>
							<Button
								size='lg'
								mt={10}
								type='submit'
								loading={isLoading}
							>
								Login
							</Button>

							<Link
								passHref
								href={'/sign-up'}
							>
								<Button variant='white'> Sign up instead </Button> if you dont
								have an account
							</Link>
						</Stack>
					</Card>
				</form>
			</Center>
		</>
	);
}
