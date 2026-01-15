import React from 'react'
import styles from './styles/CustomerCard.module.css'
import Image from 'next/image'

interface CustomerCardProps {
  customerData: {
    title: string,
    desc: string,
    icon: string
  }
  type?: number
}

function CustomerCard({ customerData, type }: CustomerCardProps) {

  let backgroundColor = "var(--bodyfill-off-white)";
  let titleColor = "var(--off-black)";
  let descColor = "var(--off-black)";

  switch (type) {
    case 1:
      backgroundColor = "var(--bodyfill-grey)";
      titleColor = "var(--bodyfill-primary-green)";
      descColor = "var(--bodyfill-off-white)";
      break;
    case 2:
      backgroundColor = "var(--bodyfill-primary-green)";
      titleColor = "var(--bodyfill-dark-green)";
      descColor = "var(--bodyfill-grey)";
      break;
    case 3:
      backgroundColor = "var(--bodyfill-off-white)";
      titleColor = "var(--bodyfill-dark-green)";
      descColor = "var(--bodyfill-grey)";
      break;
  }

  return (
    <div className={styles.customerCard} style={{ backgroundColor }}>
      <Image src={customerData.icon} alt="icon" height={50} width={50} />
      <h1 style={{ color: titleColor }}>{customerData.title}</h1>
      <p style={{ color: descColor }}>{customerData.desc}</p>
    </div>
  )
}

export default CustomerCard