import React from 'react';
import Hero from '~/components/Hero';
import Navbar from '~/components/Navbar';
import Service from '~/components/Servicess';
import Testimonials from '~/components/Testimonials';
import Footer from '~/components/Footer';
import Head from 'next/head';

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
		</>
	);
}
