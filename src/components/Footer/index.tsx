import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import fmhLogo from './assets/Logo.svg'
import Link from 'next/link'



export default function Footer() {
    return (
        <div className={style.main}>
            <div className={style.socialLinks}>
                <div className={style.socialLinksContainer}>
                    <Image src={fmhLogo} alt="logo" />
                    <div className={style.businessHours}>
                        <ul>
                            <h3>BUSINESS HOURS</h3>
                            <h5>Saturday 8AM–6PM</h5>
                            <h5>Sunday 8AM–6PM</h5>
                            <h5>Monday
                                8AM–6PM</h5>
                            <h5>Tuesday
                                8AM–6PM</h5>
                            <h5>Wednesday
                                8AM–6PM</h5>
                            <h5>Thursday
                                8AM–6PM</h5>
                            <h5>Friday
                                8AM–6PM</h5>
                        </ul>
                    </div>
                    <div className={style.footerLink}>
                        <ul>
                            <h3>PAGES</h3>
                            <li><a href="#">Home</a></li>
                            <li><a href="#services">SERVICES</a></li>
                            <li><a href="#products">PRODUCTS</a></li>
                            <li><a href="#">BOOK SCHEDULE</a></li>
                            <li><a href="#testimonials">FEEDBACK</a></li>
                            <li><a href="#testimonials">WRITE FEEDBACK</a></li>
                        </ul>
                    </div>

                    <div className={style.infoFmh}>
                        <ul>
                            <h3>INFO</h3>
                            <h5>Stall E BM 7 Bldg.<br></br> Molino Road Molino II,<br></br> Bacoor, Cavite Philippines</h5>
                            <a href="https://www.google.com/maps/place/FMH+Animal+Clinic/@14.4155944,120.9722367,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d23a999c7881:0x466009b758b0f4f1!8m2!3d14.4155944!4d120.9744254">CHECK LOCATION <i className='bx bxs-location-plus' ></i></a>
                            <h5>(046)4772846</h5>
                            <h5>fmhcliinic@gmail.com</h5>
                        </ul>
                    </div>
                </div>
            </div>




            <div className={style.copyRight}>
                Copyright © 2022 FMH Clinic. All rights reserved.
            </div>
        </div>















        // <div className={style.mainCon}>
        //         <Image src={fmhLogo} alt="logo" />
        //         <div className={style.businessHours}>
        //             <ul>
        //                 <h3>BUSINESS HOURS</h3>
        //                 <h5>Saturday 8AM–6PM</h5>
        //                 <h5>Sunday 8AM–6PM</h5>
        //                 <h5>Monday
        //                     8AM–6PM</h5>
        //                 <h5>Tuesday
        //                     8AM–6PM</h5>
        //                 <h5>Wednesday
        //                     8AM–6PM</h5>
        //                 <h5>Thursday
        //                     8AM–6PM</h5>
        //                 <h5>Friday
        //                     8AM–6PM</h5>
        //             </ul>
        //         </div>
        //         <div className={style.footerLink}>
        //             <ul>
        //                 <h3>PAGES</h3>
        //                 <li><a href="#">Home</a></li>
        //                 <li><a href="#services">SERVICES</a></li>
        //                 <li><a href="#products">PRODUCTS</a></li>
        //                 <li><a href="#">BOOK SCHEDULE</a></li>
        //                 <li><a href="#testimonials">FEEDBACK</a></li>
        //                 <li><a href="#testimonials">WRITE FEEDBACK</a></li>
        //             </ul>
        //         </div>

        //         <div className={style.infoFmh}>
        //             <ul>
        //                 <h3>INFO</h3>
        //                 <h4>Stall E BM 7 Bldg.<br></br> Molino Road Molino II,<br></br> Bacoor, Cavite Philippines</h4>
        //                 <a href="https://www.google.com/maps/place/FMH+Animal+Clinic/@14.4155944,120.9722367,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d23a999c7881:0x466009b758b0f4f1!8m2!3d14.4155944!4d120.9744254">CHECK LOCATION <i className='bx bxs-location-plus' ></i></a>
        //                 <h4>(046)4772846</h4>
        //                 <h4>fmhcliinic@gmail.com</h4>
        //             </ul>
        //         </div>
        //         <div className={style.copyright}>
        //             <h5>© 2022 FMH Clinic. All rights reserved.</h5>
        //         </div>
        //     </div>
    )
}

