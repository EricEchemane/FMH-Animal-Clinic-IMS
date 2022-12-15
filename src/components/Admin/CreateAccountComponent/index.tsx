import {
	Button,
	Card,
	Center,
	Group,
	PasswordInput,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';
import css from './style.module.css';

export default function CreateAccountComponent() {
	const [isLoading, setIsLoading] = useState(false);
	const { data, status } = useSession({
		required: true,
		onUnauthenticated() {
			signIn('google');
		},
	});

	const signUpForm = useForm({
		initialValues: {
			email: data?.user?.email || '',
			name: data?.user?.name || '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			confirmPassword: (value, values) => {
				if (value !== values.password) {
					return 'Passwords must match';
				}
			},
		},
	});

	useEffect(() => {
		if (status === 'authenticated') {
			signUpForm.setFieldValue('email', data?.user?.email || '');
			signUpForm.setFieldValue('name', data?.user?.name || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	const createAccount = (e: FormEvent) => {
		e.preventDefault();
		const error = signUpForm.validate();
		if (error.hasErrors) return;

		Http.post(
			'/auth/signup',
			{
				...signUpForm.values,
				role: UserRole.pending,
			},
			{
				onSuccess: (data) => {
					showNotification({
						message: 'Account created successfully',
						title: 'Success',
						color: 'green',
					});
				},
				onFail: (message) => {
					showNotification({
						message,
						title: 'Error',
						color: 'red',
					});
				},
				loadingToggler: setIsLoading,
			}
		);
	};

	return (
		<>
			<Head>
				<title>Create Account</title>
			</Head>
			<Center className={css.root}>
				<form
					className={css.form}
					onSubmit={createAccount}
				>
					<Card
						shadow={'md'}
						p='xl'
					>
						<Stack>
							<Title
								order={2}
								color={'dimmed'}
							>
								{' '}
								Create Account{' '}
							</Title>
							<TextInput
								required
								readOnly
								size='lg'
								label='Email'
								placeholder='Email'
								defaultValue={signUpForm.values.email}
							/>
							<TextInput
								required
								readOnly
								size='lg'
								label='Name'
								placeholder='Name'
								defaultValue={signUpForm.values.name}
							/>
							<PasswordInput
								required
								size='lg'
								label='Create password'
								placeholder='Create password'
								{...signUpForm.getInputProps('password')}
							/>
							<PasswordInput
								required
								size='lg'
								label='Confirm password'
								placeholder='Confirm password'
								{...signUpForm.getInputProps('confirmPassword')}
								error={signUpForm.errors.confirmPassword}
							/>
							<Group
								grow
								mt={10}
							>
								<Button
									size='md'
									type='submit'
									loading={isLoading}
								>
									Submit
								</Button>
								<Button
									size='md'
									variant='outline'
									onClick={() => signOut()}
									disabled={isLoading}
								>
									Use a different email
								</Button>
							</Group>
						</Stack>
					</Card>
				</form>
			</Center>
		</>
	);
}
