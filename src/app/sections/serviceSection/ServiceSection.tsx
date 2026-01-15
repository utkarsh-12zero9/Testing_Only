import Arrow from './localComponents/arrows/Arrow'
import ServiceCard from './localComponents/serviceCard/ServiceCard'
import styles from './ServiceSection.module.css'
import { useAppSelector } from '@/app/Redux/hooks'
import React from 'react'
import { selectAllServices } from '@/app/Redux/slice/businessSlice/KeyServices'
import { usePathname } from 'next/navigation'
import defaultServices from './data/ServiceList'

function ServiceSection() {

  const keyServices = useAppSelector(selectAllServices);
  const path = usePathname();

  const serviceList = (path === '/' ? defaultServices : keyServices)?.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <ServiceCard item={item} />
      </React.Fragment>
    )
  })



  return (
    <div className={styles.service} id='servicesSection' style={{
      background: "url('/landingPageImages/serviceSection/main.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className={styles.serviceOverlay}>
        <div className={styles.serviceTitle}>
          <div className={styles.serviceTitleBlock}>
            <div className={styles.serviceTitleText}>
              <h1>{path === '/' ? 'Features' : 'Services'}</h1>
              <p>Explore our <span>{path === '/' ? 'Features' : 'Services'}</span></p>

            </div>
            <p>{path === '/' ? '"An automated gym management platform with flexible memberships, seamless renewals, smart analytics, and an SEO-powered webpage builder to boost sign-ups and retention."' : 'Provide a concise description of your offerings, highlighting key features and benefits.'}</p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div id='serviceSlider' className={styles.serviceList + " " + " hideScrollBar "}>
          {serviceList}
        </div>

        <div className={styles.sliderButtonMobile}>
          <Arrow scrollId="serviceSlider" />
        </div>
      </div>
    </div>
  )
}

export default ServiceSection