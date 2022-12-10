import React, { useRef } from 'react';
import Image from 'next/image';
import logo from './assets/logo.svg';
import style from './style.module.css';




export default function Navbar() {
  const navLinkRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<boolean>(false);

  const toggleNavbar = () => {
    if (!navLinkRef.current) return;

    if (showRef.current === false) {
      navLinkRef.current.style.translate = '0% 0';
      showRef.current = true;
    }
    else {
      navLinkRef.current.style.translate = '100% 0';
      showRef.current = false;
    }
  };

  return (

    <nav className={style.nav}>
      <div className={style.logoDiv}>
        <Image src={logo} alt="logo" width="180" />
      </div>

      <div
        ref={navLinkRef}
        className={style.navLinks}>
        <ul>
          <i onClick={toggleNavbar} className={`bx bx-x ${style.closeIcon}`}></i>
          <li> <a onClick={toggleNavbar} href="#" className={style.navLinkText}>Home</a> </li>
          <li> <a onClick={toggleNavbar} href="#services">Services</a> </li>
          <li> <a onClick={toggleNavbar} href="#products">Products</a> </li>
          <li> <a onClick={toggleNavbar} href="#">Book Schedule</a> </li>
          <li> <a onClick={toggleNavbar} href="#testimonials">Customer Review</a> </li>
        </ul>
      </div>

      <i onClick={toggleNavbar} className={`bx bx-menu ${style.hamburger}`}></i>
    </nav>
  );
}
