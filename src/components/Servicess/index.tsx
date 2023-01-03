//import vaccinationImg from './assets/Vaccination.svg';
//import antiRabiesImg from './assets/Antirabies.svg';
//import surgicalImg from './assets/Surgery.svg';
//import radiologyImg from './assets/Radiology.svg';
//import diagnosticImg from './assets/Diagnostic.svg';
//import ultraSoundImg from './assets/Ultrasound.svg';
//import xrayImg from './assets/X-ray.svg';
//import minorSurgeryImg from './assets/Minor-Surgery.svg';
//import petGroomingImg from './assets/Pet-Grooming.svg';
//import confinementImg from './assets/Confinement.svg';
import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ClinicService } from '~/entities-interfaces/service.entity';
import Http from '~/utils/http-adapter';

export default function Service() {
	const [services, setServices] = useState<ClinicService[]>([]);

	useEffect(() => {
		Http.get('/service', {
			onSuccess: (data: ClinicService[]) => {
				setServices(data);
			},
		});
	}, []);

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
						{services.map((service) => (
							<div
								key={service.id}
								className={style.cards}
							>
								<div className={style.cardsTitleCon}>
									<h1 className={style.titleVaccine}> {service.name} </h1>
								</div>
								<div className={style.cardsParagraph}>
									<p>{service.description}</p>
								</div>
								<div className={style.getServiceCon}>
									<Link href='/book-schedule'>
										Get Service <i className='bx bx-right-arrow-alt'></i>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
