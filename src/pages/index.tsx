import React from 'react';
import Hero from '~/components/Hero';
import Navbar from '~/components/Navbar';
import Service from '~/components/Servicess';
import Testimonials from '~/components/Testimonials';
import Footer from '~/components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { IconBrandMessenger } from '@tabler/icons';

export default function HomePage() {
	return (
		<>
			<Head>
				<title>FMH Animal Clinic</title>
				<meta
					name='description'
					content='Your pets deserve the finest in veterinary care!'
				/>
			</Head>
			<Navbar />
			<Hero />
			<Service />
			{/* <Products /> */}
			<Testimonials />
			<Footer />

			<a
				id='open-chat-bot'
				target={'_blank'}
				rel='noreferrer'
				href={'https://www.messenger.com/t/107034002274525/'}
			>
				<Button
					leftIcon={<IconBrandMessenger />}
					radius={'xl'}
				>
					Message us
				</Button>
			</a>
		</>
	);
}
