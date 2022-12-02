import React from 'react';
import Logo from '../Logo';
import style from './style.module.css';

export default function Navbar() {
    return (
        <nav className={style.nav}>
            <Logo size={2} />
        </nav>
    );
}
