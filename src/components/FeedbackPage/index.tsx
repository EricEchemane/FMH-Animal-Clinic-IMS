import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Card,
	Group,
	List,
	Rating,
	ThemeIcon,
	Title,
	Text,
	Stack,
	SimpleGrid,
	TextInput,
	Textarea,
} from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import { IconPaw } from '@tabler/icons';
import Http from '~/utils/http-adapter';
import { showNotification } from '@mantine/notifications';
import useCustomerSignIn from '~/hooks/useCustomerSignIn';
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';


export default function Feedback() {
	useCustomerSignIn();
	const { width } = useViewportSize();

	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			alert('You must be signed in to leave a feedback');
			signIn('google');
		},
	});

	const feedbackForm = useForm({
		initialValues: {
			name: '',
			email: '',
			message: '',
			rating: 5,
		},
		validate: {
			message: (value) => {
				if (value.length < 10) {
					return 'Message must be at least 10 characters long';
				}
			},
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	const submitFeedback = async (e: FormEvent) => {
		e.preventDefault();
		const errors = feedbackForm.validate();
		if (errors.hasErrors) return;

		Http.post('/feedback', feedbackForm.values, {
			loadingToggler: setIsLoading,
			onFail: alert,
			onSuccess: () => {
				showNotification({
					message: 'Thank you for your feedback!',
					title: 'Feedback submitted',
					icon: <IconPaw size={24} />,
					color: 'green',
				});
			},
		});
	};

	useEffect(() => {
		if (session && session.user) {
			feedbackForm.setValues({
				name: session.user.name!,
				email: session.user.email!,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	return (
		<>
			<Head>
				<title> Write Feedback </title>
			</Head>

			<SimpleGrid
				cols={width < 800 ? 1 : 2}
				m='auto'
				my={'xl'}
				spacing='xl'
				sx={{ maxWidth: '1000px' }}
				p={'lg'}
			>
				<form
					onSubmit={submitFeedback}
					method='post'
				>
					<Stack mt={'xl'}>
						<Stack>
							<Title order={2}>How was your experience with our clinic?</Title>
							<label htmlFor='rating'>Your rating</label>
							<Rating
								{...feedbackForm.getInputProps('rating')}
								name='rating'
							/>
						</Stack>
						<TextInput
							label='Your name'
							{...feedbackForm.getInputProps('name')}
							required
							readOnly
							size='lg'
						/>
						<TextInput
							label='Your email'
							{...feedbackForm.getInputProps('email')}
							required
							readOnly
							size='lg'
						/>
						<Textarea
							label='Your comment'
							placeholder='Your comment'
							{...feedbackForm.getInputProps('message')}
							required
							size='lg'
							minRows={5}
							error={feedbackForm.errors.message}
						/>
						<Group mt='md'>
							<Button
								size='md'
								color={'orange'}
								type='submit'
								loading={isLoading}
							>
								Submit review

							</Button>
							<Link href="/" color='white'>
								<Button
									size='md'
									color={'orange'}
									variant='outline'
								>
									Cancel
								</Button>
							</Link>
						</Group>
					</Stack>
				</form>

				<Card
					withBorder
					radius={'lg'}
					shadow={'md'}
					p='xl'
				>
					<Title
						mb={'lg'}
						order={2}
						color='dimmed'
					>
						How to write review
					</Title>
					<List
						spacing='md'
						size='sm'
						center
						icon={
							<ThemeIcon
								color='teal'
								size={24}
								radius='xl'
							>
								<IconPaw />
							</ThemeIcon>
						}
					>
						<List.Item>
							<Text size={'md'}>
								{
									'Think about your overall experience with the clinic. Did you have a positive or negative experience? What stood out to you?'
								}
							</Text>
						</List.Item>
						<List.Item>
							<Text size={'md'}>
								{
									"Be specific about what you liked or didn't like. Did the staff treat you and your pet well? Was the clinic clean and well-maintained? Did the veterinarian take the time to explain things to you?"
								}
							</Text>
						</List.Item>
						<List.Item>
							<Text size={'md'}>
								{
									'Keep it brief. A few sentences or a short paragraph should be sufficient.'
								}
							</Text>
						</List.Item>
						<List.Item>
							<Text size={'md'}>
								{
									"Be honest and respectful. Don't leave a fake review or use offensive language."
								}
							</Text>
						</List.Item>
						<List.Item>
							<Text size={'md'}>
								{
									"Consider the tone of your review. You don't want to sound angry or bitter, even if you had a negative experience. Try to be constructive and offer suggestions for improvement."
								}
							</Text>
						</List.Item>
						<List.Item>
							<Text size={'md'}>
								{
									"Proofread your review before submitting it. Make sure it's clear and easy to understand."
								}
							</Text>
						</List.Item>
					</List>
				</Card>
			</SimpleGrid>
		</>
	);
}
