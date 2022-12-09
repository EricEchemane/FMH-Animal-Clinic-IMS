import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import heroImage from './assets/heroImage.svg'
import googleIcon from './assets/Google__G__Logo.svg.webp'

export default function Hero() {
    return (
        <div className={style.main}>

            <div className={style.mainCon}>
                <div className={style.wrapper}>

                    <div className={style.contentCon}>
                        <h1 className={style.title}>WELCOME TO <span className={style.spanText}>FMH</span> CLINIC</h1>
                        <h6 className={style.titleQoute}>“Your pets deserve the finest in veterinary care!”</h6>
                        <button className={style.googleButton}><Image src={googleIcon} alt="image" width='20'/>Continue with Google</button>
                    </div>
                    
                    <div className={style.imageCon}>
                        <Image src={heroImage} alt="image" width='480'/>
                    </div>
                </div>
            </div>

        </div>
    )
}
