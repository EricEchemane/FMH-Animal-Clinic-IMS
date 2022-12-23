import React from 'react'
import css from './style.module.css'
import { Button, Group } from '@mantine/core';



export default function Feedback() {
	return (
		<div className={css.main}>
			<div className={css.Container}>
				<div className={css.titleContainer}><h1>Write a Feedback</h1></div>
				<div className={css.formContainer}>
					<div className={css.forms}>
						<div className={css.labelNameCon}>
							<label htmlFor="Name">Name</label>
							<input required className={css.userName} type="text" id='name' name='name' placeholder='Your Name' />
						</div>
						<div className={css.labelEmailCon}>
							<label htmlFor="Email">Email</label>
							<input className={css.userEmail} type="email" id='email' placeholder='Your Email' />
						</div>
						<div className={css.labelMessageCon}>
							<label htmlFor="Message">Write a feedback</label>
							<textarea className={css.textArea} name="message" id="message" cols={30} rows={10} placeholder='Message'></textarea>
						</div>
						{/* <div className={css.buttonContainer}> */}
						<Group>
							<Button color="yellow" size="md">
								Submit
							</Button>
						</Group>
						{/* </div> */}
					</div>
					<div className={css.instructions}>
						<h1>How to write review</h1>
						<ul>
							<li>
								{"Think about your overall experience with the clinic. Did you have a positive or negative experience? What stood out to you?"}
							</li>
							<li>
								{"Be specific about what you liked or didn't like. Did the staff treat you and your pet well? Was the clinic clean and well-maintained? Did the veterinarian take the time to explain things to you?"}
							</li>
							<li>
								{"Keep it brief. A few sentences or a short paragraph should be sufficient."}
							</li>
							<li>
								{"Be honest and respectful. Don't leave a fake review or use offensive language."}
							</li>
							<li>
								{"Consider the tone of your review. You don't want to sound angry or bitter, even if you had a negative experience. Try to be constructive and offer suggestions for improvement."}
							</li>
							<li>
								{"Proofread your review before submitting it. Make sure it's clear and easy to understand."}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
