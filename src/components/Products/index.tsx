import React from 'react';
import style from './style.module.css';
import Image from 'next/image';
import accessoriesImg from './assets/Accessories.svg';
import petMedImg from './assets/PetMedicine.svg';


export default function Products() {
    return (
        <div className={style.main} id='products'>
            <div className={style.mainWrapper}>
                <div className={style.wrapper}>
                    <div className={style.titleCon}>
                        <div className={style.titleTextCon}>
                            <h6 className={style.titleh6}>OUR PRODUCTS</h6>
                            <h1 className={style.titleh1}><span className={style.spanText}>FMH</span> PRODUCTS</h1>
                        </div>
                    </div>
                    <div className={style.productCon}>
                        <div className={style.productCard}>
                            <div className={style.titleAccCon}>
                                <h2 className={style.titleh2}>ACCESSORIES</h2>
                            </div>
                            <div className={style.imgCon}>
                                <Image src={accessoriesImg} alt="image" width='230' />
                            </div>
                            <div className={style.starCon}>
                                <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
                            </div>
                            <div className={style.priceText}>
                                <h2 className={style.priceText}>150-2,000 PHP</h2>
                            </div>
                            <div className={style.checkAccLink}>
                                <a href="#"><i className='bx bxs-shopping-bags'></i>CHECK ACCESSORIES<i className='bx bx-right-arrow-alt' ></i></a>
                            </div>
                        </div>
                        <div className={style.productCard}>
                            <div className={style.titleAccCon}>
                                <h2 className={style.titleh2}>PET MEDICINES</h2>
                            </div>
                            <div className={style.imgCon}>
                                <Image src={petMedImg} alt="image" width='100' />
                            </div>
                            <div className={style.starCon}>
                                <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
                            </div>
                            <div className={style.priceText}>
                                <h2 className={style.priceText}>150-2,000 PHP</h2>
                            </div>
                            <div className={style.checkAccLink}>
                                <a href="#"><i className='bx bxs-shopping-bags'></i>CHECK ACCESSORIES<i className='bx bx-right-arrow-alt' ></i></a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
