import React, { useEffect } from 'react';
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
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import { IconPaw } from '@tabler/icons';
import BACKG from './assets/BACKG.svg';

export default function Feedback() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			Router.replace('/');
		},
	});

	const feedbackForm = useForm({
		initialValues: {
			name: '',
			email: '',
			message: '',
			rating: 0,
		},
	});

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
				cols={2}
				m='auto'
				my={'xl'}
				spacing='xl'
				sx={{ maxWidth: '1000px' }}
			>
				<form>
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
							readOnly
							size='lg'
							minRows={5}
						/>
						<Group mt='md'>
							<Button
								size='md'
								color={'orange'}
							>
								Submit review
							</Button>
							<Button
								size='md'
								color={'orange'}
								variant='outline'
								onClick={() => Router.back()}
							>
								Cancel
							</Button>
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
						spacing='xs'
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
