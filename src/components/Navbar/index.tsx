import React, { useRef } from 'react';
import Image from 'next/image';
import style from './style.module.css';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@mantine/core';
import Navlogo from './assets/Navlogo.svg'



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
					src={Navlogo}
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
						<a
							onClick={toggleNavbar}
							href='#'
							className={style.navLinkText}
						>
							<Button
								radius={'xl'}
								variant='subtle'
							>
								Home
							</Button>
						</a>
					</li>
					<li>
						<a
							onClick={toggleNavbar}
							href='#services'
						>
							<Button
								radius={'xl'}
								variant='subtle'
							>
								Services
							</Button>
						</a>
					</li>
					<li>
						<a
							onClick={toggleNavbar}
							href='#products'
						>
							<Button
								radius={'xl'}
								variant='subtle'
							>
								Products
							</Button>
						</a>
					</li>
					<li>
						<Link
							onClick={toggleNavbar}
							href='/book-schedule'
						>
							<Button
								radius={'xl'}
								variant='subtle'
							>
								Book Schedule
							</Button>
						</Link>
					</li>
					<li>
						<a
							onClick={toggleNavbar}
							href='#testimonials'
						>
							<Button
								radius={'xl'}
								variant='subtle'
							>
								Customer Review
							</Button>
						</a>
					</li>
					{session && session.user ? (
						<li>
							<Button
								radius={'xl'}
								onClick={() => signOut()}
								variant='outline'
							>
								Sign out
							</Button>
						</li>
					) : (
						<li>
							<Button
								radius={'xl'}
								onClick={() => signIn('google')}
								variant='filled'
							>
								Sign In
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
