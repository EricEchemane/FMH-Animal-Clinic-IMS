import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import heroImage from './assets/heroImage.svg';
import googleIcon from './assets/Google__G__Logo.svg.webp';
import { useSession, signIn } from 'next-auth/react';
import { Title } from '@mantine/core';

export default function Hero() {
	const { data: session } = useSession();

	return (
		<div className={style.main}>
			<div className={style.mainCon}>
				<div className={style.wrapper}>
					<div className={style.contentCon}>
						{session && session.user && (
							<div className={style.user}>
								<h2> Hello, {session.user.name} </h2>
								<p> {session.user.email} </p> <br />
							</div>
						)}
						<Title className={style.title}>
							Welcome to <br />
							<span className={style.spanText}>FMH Clinic</span>
						</Title>
						<Title className={style.titleQoute}>
							Your pets deserve the finest <br /> in veterinary care!
						</Title>
						{!session && (
							<button
								onClick={() => signIn('google')}
								className={style.googleButton}
							>
								<Image
									src={googleIcon}
									alt='image'
									width='20'
								/>
								Continue with Google
							</button>
						)}
					</div>

					<div className={style.imageCon}>
						<Image
							src={heroImage}
							alt='image'
							width='480'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
