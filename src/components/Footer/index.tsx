import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import fmhLogo from './assets/Logo.svg';

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
							<li>8AM–6PM | Saturday</li>
							<li>8AM–6PM | Sunday</li>
							<li>8AM–6PM | Monday</li>
							<li>8AM–6PM | Tuesday</li>
							<li>8AM–6PM | Wednesday</li>
							<li>8AM–6PM | Thursday</li>
							<li>8AM–6PM | Friday</li>
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
								<a href='#customer-review'>Customer Review</a>
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
								Stall E BM 7 Bldg. Molino Road Molino II, Bacoor, Cavite
								Philippines
							</li>
							<li className={style.location}>
								{/* <i className='bx bxs-location-plus' ></i> */}
								<a
									target={'_blank'}
									href='https://www.google.com/maps/place/FMH+Animal+Clinic/@14.4155944,120.9722367,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d23a999c7881:0x466009b758b0f4f1!8m2!3d14.4155944!4d120.9744254'
									rel='noreferrer'
								>
									Check Location
								</a>
								<i className='bx bx-link-external'></i>
							</li>
							<li>(046)4772846</li>
							<li>fmhcliinic@gmail.com</li>
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
