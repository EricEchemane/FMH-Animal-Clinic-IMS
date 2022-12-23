import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import fmhLogo from './assets/Logo.svg';
import Link from 'next/link'

export default function Footer() {
	return (
		<div className={style.main}>
			<div className={style.socialLinks}>
				<div className={style.socialLinksContainer}>
					<div className={style.logo}>
						<Image
							src={fmhLogo}
							alt='logo'
						/>
					</div>

					<div className={style.businessHours}>
						<label htmlFor='business-hours'>
							<h3>BUSINESS HOURS</h3>
						</label>
						<input
							type='checkbox'
							hidden
							id='business-hours'
						/>
						<ul>
							<li>8AM–5PM | Saturday</li>
							<li>8AM–3PM | Sunday</li>
							<li>8AM–5PM | Monday</li>
							<li>8AM–5PM | Tuesday</li>
							<li>8AM–5PM | Wednesday</li>
							<li>8AM–5PM | Thursday</li>
							<li>8AM–5PM | Friday</li>
						</ul>
					</div>
					<div className={style.footerLink}>
						<label htmlFor='pages'>
							<h3>PAGES</h3>
						</label>
						<input
							type='checkbox'
							hidden
							id='pages'
						/>
						<ul>
							<li>
								<a href='#'>Home</a>
							</li>
							<li>
								<a href='#services'>Services</a>
							</li>
							<li>
								<a href='#products'>Products</a>
							</li>
							<li>
								<a href='#'>Book Schedule</a>
							</li>
							<li>
								<a href='#testimonials'>Feedback</a>
							</li>
							<li>
								<Link href="/feedback">Write feedback</Link>
							</li>
						</ul>
					</div>

					<div className={style.infoFmh}>
						<label htmlFor='info'>
							<h3>INFO</h3>
						</label>
						<input
							type='checkbox'
							hidden
							id='info'
						/>
						<ul>
							<li>
								11 Ruby Rd, Las Piñas, Metro Manila Philippines
							</li>
							<li className={style.location}>
								{/* <i className='bx bxs-location-plus' ></i> */}
								<a
									target={'_blank'}
									href='https://www.google.com/maps/dir/14.4081327,121.0414667/11+Ruby+Rd,+Las+Pi%C3%B1as,+Metro+Manila/@14.4220543,121.008966,16.66z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3397d1ea3c1a3835:0xa2a4607a02aebc1b!2m2!1d121.0088434!2d14.424671'
									rel='noreferrer'
								>
									Check Location
								</a>
								<i className='bx bx-link-external'></i>
							</li>
							<li>(02)88065772</li>
							<li>Fmhcliinic@gmail.com</li>
						</ul>
					</div>
				</div>
			</div>

			<div className={style.copyRight}>
				Copyright © 2022 FMH Animal Clinic. All rights reserved.
			</div>
		</div>
	);
}
