import React, { useRef } from 'react';
import Image from 'next/image';
import style from './style.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@mantine/core';

export default function Navbar() {
	const navLinkRef = useRef<HTMLDivElement>(null);
	const showRef = useRef<boolean>(false);
	const { data: session } = useSession();

	const toggleNavbar = () => {
		if (!navLinkRef.current || window.innerWidth > 758) return;

		if (showRef.current === false) {
			navLinkRef.current.style.translate = '0% 0';
			showRef.current = true;
		} else {
			navLinkRef.current.style.translate = '100% 0';
			showRef.current = false;
		}
	};

	return (
		<nav className={style.nav}>
			<div className={style.logoDiv}>
				<Image
					src={'/assets/Logo.svg'}
					alt='logo'
					width={180}
					height={80}
				/>
			</div>

			<div
				ref={navLinkRef}
				className={style.navLinks}
			>
				<ul>
					<i
						onClick={toggleNavbar}
						className={`bx bx-x ${style.closeIcon}`}
					></i>
					<li>
						{' '}
						<a
							onClick={toggleNavbar}
							href='#'
							className={style.navLinkText}
						>
							Home
						</a>{' '}
					</li>
					<li>
						{' '}
						<a
							onClick={toggleNavbar}
							href='#services'
						>
							Services
						</a>{' '}
					</li>
					<li>
						{' '}
						<a
							onClick={toggleNavbar}
							href='#products'
						>
							Products
						</a>{' '}
					</li>
					<li>
						{' '}
						<Link
							onClick={toggleNavbar}
							href='/book-schedule'
						>
							Book Schedule
						</Link>{' '}
					</li>
					<li>
						{' '}
						<a
							onClick={toggleNavbar}
							href='#testimonials'
						>
							Customer Review
						</a>{' '}
					</li>
					{session && session.user && (
						<li>
							<Button
								onClick={() => signOut()}
								variant='default'
							>
								Sign out
							</Button>
						</li>
					)}
				</ul>
			</div>

			<i
				onClick={toggleNavbar}
				className={`bx bx-menu ${style.hamburger}`}
			></i>
		</nav>
	);
}
