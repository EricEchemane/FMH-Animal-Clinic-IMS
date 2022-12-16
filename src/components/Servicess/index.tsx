import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import vaccinationImg from './assets/Vaccination.svg';
import antiRabiesImg from './assets/Antirabies.svg';
import surgicalImg from './assets/Surgery.svg';
import radiologyImg from './assets/Radiology.svg';
import diagnosticImg from './assets/Diagnostic.svg';
import therapeuticImg from './assets/Therapeutic.svg';
import ultraSoundImg from './assets/Ultrasound.svg';
import xrayImg from './assets/X-ray.svg';
import minorSurgeryImg from './assets/Minor-Surgery.svg';
import petGroomingImg from './assets/Pet-Grooming.svg';
import confinementImg from './assets/Confinement.svg';




export default function Service() {
	return (
		<div
			className={style.main}
			id='services'
		>
			<div className={style.wrapper}>
				<div className={style.titleCon}>
					<div className={style.textCon}>
						<h6 className={style.titleh6}>OUR SERVIES</h6>
						<h1 className={style.titleh1}>
							All Pet Care <span className={style.spanText}>Services</span>
						</h1>
					</div>
				</div>

				<div className={style.cardCon}>
					<div className={style.cardConWrapper}>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={vaccinationImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Vaccination</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										'We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.'
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={antiRabiesImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Deworming
								</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										"We offer deworming services for dogs and cats. This treatment involves administering medication to kill any worms or parasites"
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={surgicalImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Check-up</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										"Our team of skilled veterinarians and support staff are dedicated to providing high-quality care for your furry friends. Our check-up service includes a thorough examination of your pet to assess their overall health and well-being."
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={radiologyImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Treatment</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										"We offer advanced radiology services for pets. Our state-of-the-art equipment allows us to take high-quality X-ray images of your pet's body, providing valuable information about their health and any potential medical conditions."
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={diagnosticImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Rapid Test Kits</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										"Rapid test kits can save pet owners time and money by allowing them to quickly determine whether their pet is suffering from a particular condition."
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={ultraSoundImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Ultrasound</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{"Our pet clinic offers ultrasound services for your furry friends. Ultrasound is a non-invasive and painless imaging technique that uses sound waves to produce pictures of the inside of the body."}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={xrayImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>X-ray</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										'Our pet clinic offers x-ray services for your beloved pets. X-ray, or radiography, is a common imaging technique that uses ionizing radiation to produce images of the inside of the body.'
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={minorSurgeryImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Minor Surgery</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										'Our pet clinic offers minor surgical services for your furry companions. Our experienced veterinarians are skilled in performing various types of minor surgeries, such as spaying and neutering, tooth extractions, and tumor removals.'
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={petGroomingImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Pet Grooming</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										'Our pet clinic offers professional grooming services for your furry friends. Our experienced groomers provide a range of services, including bathing, brushing, trimming, and nail clipping.'
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>

						<div className={style.cards}>
							<div className={style.cardsTitleCon}>
								<Image
									src={confinementImg}
									alt='logo'
									width='50'
								/>
								<h1 className={style.titleVaccine}>Confinement</h1>
							</div>
							<div className={style.cardsParagraph}>
								<p>
									{
										'Our pet clinic offers confinement services for your furry companions. If your pet needs to be kept in a controlled environment for medical or other reasons, our clinic provides a safe and comfortable space for them to stay.'
									}
								</p>
							</div>
							<div className={style.getServiceCon}>
								<a
									href='#'
									className={style.getServiceButton}
								>
									Get Service <i className='bx bx-right-arrow-alt'></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
