import React from 'react'
import css from './style.module.css'



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
						<div className={css.buttonContainer}>
							<button type='submit'>Submit</button>
						</div>
					</div>
					<div className={css.instructions}>
						<h1>How to write feedback</h1>
						<p>Describe your experience with out clinic.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
