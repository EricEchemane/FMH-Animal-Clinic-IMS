import Image from 'next/image';
import style from './style.module.css';
import logoSvg from './logo.svg';

type Props = {
    size: number;
};

export default function Logo({ size }: Props) {

    return (
        <div className={style.logo}>
            <Image
                style={{ width: `${size * 2}rem` }}
                width={100}
                src={logoSvg}
                alt='logo' />
            <div className={style.texts}>
                <h1 style={{ fontSize: `${size}rem` }}>FMH</h1>
                <h4 style={{ fontSize: `${size * .5}rem` }}>ANIMAL CLINIC</h4>
            </div>
        </div>
    );
}