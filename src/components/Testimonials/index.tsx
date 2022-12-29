import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import profilePic from './assets/Profilepic.svg';
import profilePic1 from './assets/ImageProfilePic-1.svg'
import profilePic2 from './assets/ImageProfilePic-2.svg'
import profilePic3 from './assets/ImageProfilePic-3.svg'
import { Rating, Center } from '@mantine/core';





export default function Testimonials() {
    return (
        <div className={style.main} id='testimonials'>
            <div className={style.mainWrapper}>

                <div className={style.testimonialContainer}>

                    <div className={style.titleContainer}>
                        <h1 className={style.titleh1}>OUR CUSTOMER FEEDBACK</h1>
                        <h3 className={style.titleh3}>Don’t take our word for it. Trust our customers</h3>
                    </div>
                    <div className={style.cardsContainer}>

                        <div className={style.cardsthis}>
                            <Image className={style.profilePic} src={profilePic1} alt="picture" />
                            <Center>
                                <Rating value={4} readOnly />
                            </Center>
                            <div className={style.userName}>
                                <h2>Tony Darien</h2>
                                <div><h4>tonydarien@gmail.com</h4></div>
                            </div>
                            <div className={style.userMessage}>
                                <p>My experience at the pet clinic was excellent. The staff were all very friendly and helpful, and they took the time to answer all of my questions and concerns. The facility was clean and well-maintained, and I felt confident that my pet was receiving top-notch care.</p>
                            </div>
                        </div>

                        <div className={style.cardsthis}>
                            <Image className={style.profilePic} src={profilePic2} alt="picture" />
                            <Center>
                                <Rating value={4} readOnly />
                            </Center>
                            <div className={style.userName}>
                                <h2>Nora Kirrily</h2>
                                <div><h4>norakirrilyn@gmail.com</h4></div>
                            </div>
                            <div className={style.userMessage}>
                                <p>I was extremely impressed with the level of professionalism and compassion shown by the staff at the pet clinic. They clearly have a deep love for animals and it shows in their work. My pet received excellent treatment and I feel grateful to have found such a great place for their care.</p>
                            </div>
                        </div>

                        <div className={style.cardsthis}>
                            <Image className={style.profilePic} src={profilePic3} alt="picture" />
                            <Center>
                                <Rating value={4} readOnly />
                            </Center>
                            <div className={style.userName}>
                                <h2>Tucker Soren</h2>
                                <div><h4>tuckesoren@gmail.com</h4></div>
                            </div>
                            <div className={style.userMessage}>
                                <p>The pet clinic exceeded my expectations in every way. The staff were knowledgeable and attentive, and the facility was clean and welcoming. I felt confident that my pet was in good hands, and I will definitely be returning for any future medical needs. Thank you for the outstanding care!</p>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}


{/* <div className={style.cardContainer} >
    <Image className={style.profilePic} src={profilePic} alt="picture" />
    <div className={style.userName}>
        <h2>James Santos</h2>
        <div><h4>jamessantos@gmail.com</h4></div>
    </div>
    <div className={style.userMessage}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil recusandae animi saepe placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas!</p>
    </div>
</div> */}
