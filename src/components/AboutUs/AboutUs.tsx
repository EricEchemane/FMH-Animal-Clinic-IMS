import css from './style.module.css'
import Image from 'next/image'
import AboutUsImg from './assets/About us image.svg'
import AdressIcon from './assets/Address Icon.svg'
import PhoneIcon from './assets/Phone Icon.svg'
import EmailIcon from './assets/Email Icon.svg'



export const AboutUs = () => {
    return (
        <div className={css.main}>
            <div className={css.mainWrapper}>
                <div className={css.textContainer}>
                    <h1>ABOUT US</h1>
                    <div>
                        <p>Welcome to our pet clinic! We are a team of passionate and dedicated veterinarians, technicians, and support staff who are committed to providing the highest quality medical care for your furry friends.</p>
                        <p>Our team is dedicated to maintaining a warm and welcoming environment for both pets and their owners, and we are always happy to answer any questions or concerns you may have.</p>
                        <p> We are grateful for the trust that our clients place in us and we look forward to serving you and your beloved pets for many years to come. Thank you for choosing us as your trusted pet care provider.</p>
                    </div>
                </div>


                <div className={css.infoContainer}>
                    <Image src={AboutUsImg} alt="image" />
                    <div>
                        <Image src={AdressIcon} alt="icon" />
                        <h3>Address</h3>
                        <a
                            target={'_blank'}
                            href='https://www.google.com/maps/dir/14.4081327,121.0414667/11+Ruby+Rd,+Las+Pi%C3%B1as,+Metro+Manila/@14.4220543,121.008966,16.66z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3397d1ea3c1a3835:0xa2a4607a02aebc1b!2m2!1d121.0088434!2d14.424671'
                            rel='noreferrer'
                        >
                            11 Ruby Rd, Las Piñas, Metro Manila Philippines
                        </a>
                        <i className='bx bx-link-external'></i>
                    </div>
                    <div>
                        <Image src={PhoneIcon} alt="icon" />
                        <h3>Phone</h3>
                        <p>(02)88065772</p>
                    </div>
                    <div>
                        <Image src={EmailIcon} alt="icon" />
                        <h3>Email</h3>
                        <p>fmhanimalclinic@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
