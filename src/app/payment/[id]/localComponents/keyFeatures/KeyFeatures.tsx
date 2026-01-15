import React from 'react'
import styles from './KeyFeatures.module.css'

function KeyFeatures({feature} : {feature : string}) {
  return (
    <div className={styles.keyFeaturesCard}>
        <div className={styles.keyFeatureIcon}>
            <img src="/paymentIcons/keyFeature.svg" alt="" />
        </div>
        <p className={styles.keyFeatureText}>{feature}</p>
    </div>
  )
}

export default KeyFeatures