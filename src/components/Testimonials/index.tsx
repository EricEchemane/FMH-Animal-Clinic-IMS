import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import profilePic from './assets/Profilepic.svg';


export default function Testimonials() {
    return (
        <div className={style.main} id='testimonials'>
            <div className={style.mainWrapper}>
                <div className={style.testimonialContainer}>
                    <div className={style.titleContainer}>
                        <h1 className={style.titleh1}>OUR CUSTOMERS FEEDBACK</h1>
                        <h3 className={style.titleh3}>Don’t take our word for it. Trust our customers</h3>
                    </div>
                    <div className={style.cardContainer}>
                        <Image className={style.profilePic} src={profilePic} alt="picture" />
                        <div className={style.userName}>
                            <h2>James Santos</h2>
                            <div>jamessantos@gmail.com</div>
                        </div>
                        <div className={style.userMessage}>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil recusandae animi saepe placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas!</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
