'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo1 from './icons/logo1.png';
import logo2 from './icons/logo2.png';
import logo3 from './icons/logo3.png';
import logo4 from './icons/logo4.png';
import logo5 from './icons/logo5.png';

function Logo() {
  const logos = [logo1, logo2, logo3, logo4, logo5];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Image src={logos[index]} alt="Logo" height={40} width={40} priority />;
}

export default Logo;
