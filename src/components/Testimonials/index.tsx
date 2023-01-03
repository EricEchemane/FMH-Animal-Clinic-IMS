import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Image from 'next/image';
import profilePic1 from './assets/ImageProfilePic-1.svg';
import profilePic2 from './assets/ImageProfilePic-2.svg';
import profilePic3 from './assets/ImageProfilePic-3.svg';
import { Rating, Center, Avatar } from '@mantine/core';
import Http from '~/utils/http-adapter';
import { Feedback } from '~/entities-interfaces/feedback.entity';

export default function Testimonials() {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

	useEffect(() => {
		Http.get('/feedback', {
			onSuccess: (data: Feedback[]) => {
				console.log(data);
				setFeedbacks(data.filter((f) => f.rating > 3));
			},
		});
	}, []);

	return (
		<div
			className={style.main}
			id='testimonials'
		>
			<div className={style.mainWrapper}>
				<div className={style.testimonialContainer}>
					<div className={style.titleContainer}>
						<h1 className={style.titleh1}>OUR CUSTOMER FEEDBACK</h1>
						<h3 className={style.titleh3}>
							Don’t take our word for it. Trust our customers
						</h3>
					</div>
					<div className={style.cardsContainer}>
						{feedbacks.map((feedback) => (
							<div
								key={feedback.id}
								className={style.cardsthis}
							>
								<Avatar
									alt={feedback.user.name}
									size={'xl'}
								/>
								<Center>
									<Rating
										value={feedback.rating}
										readOnly
									/>
								</Center>
								<div className={style.userName}>
									<h2> {feedback.user.name} </h2>
									<div>
										<h4> {feedback.user.email} </h4>
									</div>
								</div>
								<div className={style.userMessage}>
									<p>{feedback.message}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

{
	/* <div className={style.cardContainer} >
    <Image className={style.profilePic} src={profilePic} alt="picture" />
    <div className={style.userName}>
        <h2>James Santos</h2>
        <div><h4>jamessantos@gmail.com</h4></div>
    </div>
    <div className={style.userMessage}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil recusandae animi saepe placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas placeat temporibus culpa a sunt quas consequuntur sint. Odio totam ipsam vel voluptas!</p>
    </div>
</div> */
}
