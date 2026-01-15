'use client'
import React, { useState, useEffect } from 'react'
import styles from './Arrow.module.css'
import leftArrow from './icons/left-arrow.svg'
import rightArrow from './icons/right-arrow.svg'
import Image from 'next/image'
interface ArrowProps {
  scrollId: string
  scrollOffset?: number
}

function Arrow({ scrollId, scrollOffset = 300 }: ArrowProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)


  const checkScroll = () => {
    const element = document.getElementById(scrollId)
    if (element) {
      setCanScrollLeft(element.scrollLeft > 0)
      
      setCanScrollRight(
        element.scrollLeft < element.scrollWidth - element.clientWidth
      )
    }
  }

  useEffect(() => {
    const element = document.getElementById(scrollId)
    if (element) {
      checkScroll()
      element.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
    }

    return () => {
      element?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [scrollId])

  const handleScrollRight = () => {
    const element = document.getElementById(scrollId)
    if (element) {
      element.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      })
    }
  }

  const handleScrollLeft = () => {
    const element = document.getElementById(scrollId)
    if (element) {
      element.scrollBy({
        left: -scrollOffset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={styles.arrows}>
      <button 
        onClick={handleScrollLeft}
        className={!canScrollLeft ? styles.inactive : styles.btn}
        disabled={!canScrollLeft}
      >
        <Image src={leftArrow} alt="Scroll left" height={20} width={20} />
      </button>
      <button 
        onClick={handleScrollRight}
        className={!canScrollRight ? styles.inactive : styles.btn}
        disabled={!canScrollRight}
      >
        <Image src={rightArrow} alt="Scroll right" height={20} width={20}/>
      </button>
    </div>
  )
}

export default Arrow