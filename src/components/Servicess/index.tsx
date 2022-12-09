import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import vaccinationImg from './assets/Vaccination.svg'
import antiRabiesImg from './assets/Antirabies.svg'
import surgicalImg from './assets/Surgery.svg'
import radiologyImg from './assets/Radiology.svg'
import diagnosticImg from './assets/Diagnostic.svg'
import therapeuticImg from './assets/Therapeutic.svg'


export default function Service() {
    return (
        <div className={style.main}>

            <div className={style.wrapper}>
                <div className={style.cardContainer}>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={vaccinationImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Vaccination</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={antiRabiesImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Anti-Rabbies</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We take the health and safety of your pets seriously, and strongly recommend that all animals be up-to-date on their vaccines, including the anti-rabies vaccine.</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={surgicalImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Surgical Services</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We perform soft tissue surgeries like Neutering and spaying, orthopaedic, and other speciality surgeries right here in our clinic.</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={radiologyImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Radiology Services</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We offer advanced radiology services for pets. Our state-of-the-art equipment allows us to take high-quality X-ray images of your pet's body, providing valuable information about their health and any potential medical conditions.</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={diagnosticImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Diagnostic Services</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We offer comprehensive diagnostic services for pets. Our team of experienced veterinarians uses the latest diagnostic tools and techniques to help identify and treat medical conditions in animals.</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.titleCon}>
                            <div className={style.titleLogo}>
                                <Image src={therapeuticImg} alt="logo" width='60' />
                            </div>
                            <div className={style.titleTextCon}>
                                    <h3 className={style.titleText}>Therapuetic Services</h3>
                                </div>
                            </div>
                            <div className={style.paragraph}>
                            <p>We offer a range of therapeutic services for pets. Our team of experienced veterinarians provides specialized treatment to help manage and improve your pet's health  .</p>
                            </div>
                            <div className={style.getService}>
                                <button className={style.getSeriveButton}>Get Service <i className='bx bx-right-arrow-alt'></i></button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
