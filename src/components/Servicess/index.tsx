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
        <div className={style.main} id='services'>
            <div className={style.wrapper}>

                <div className={style.titleCon}>
                    <div className={style.textCon}>
                        <h6 className={style.titleh6}>OUR SERVIES</h6>
                        <h1 className={style.titleh1}>All Pet Care <span className={style.spanText}>Services</span></h1>
                    </div>
                </div>

                <div className={style.cardCon}>
                    <div className={style.cardConWrapper}>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={vaccinationImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Vaccination</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={antiRabiesImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Anti-Rabbies</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={surgicalImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Surgical</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={radiologyImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Radiology</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={diagnosticImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Diagnostic</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                        <div className={style.cards}>
                            <div className={style.cardsTitleCon}>
                                <Image src={therapeuticImg} alt="logo" width='50' />
                                <h1 className={style.titleVaccine}>Therapuetic</h1>
                            </div>
                            <div className={style.cardsParagraph}><p>We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.</p></div>
                            <div className={style.getServiceCon}>
                                <a href="#" className={style.getServiceButton}>Get Service <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}