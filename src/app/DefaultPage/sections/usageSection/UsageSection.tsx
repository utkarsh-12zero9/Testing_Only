import styles from './styles/UsageSection.module.css'
import usageData from './data/usageData'
import SubUsageSection from './localComponents/subUsageSection/SubUsageSection'
import GetDimensions from '@/lib/getDimensions'
import React from 'react';

function UsageSection() {

    const { width } = GetDimensions();

    const list = usageData.map((item, index) => (
        <React.Fragment key={index}>
            <SubUsageSection key={index} data = {item} type={width > 426 ? index % 2 + 1 : 1}/>
            {index!== usageData.length - 1 && <hr className={styles.divider}/>}
        </React.Fragment>
    ))

   return (
     <div className={styles.usageSection} id='usageSection'>
            <div className={styles.usageSectionTitle}>
                <h1>Usage</h1>
                <p>How does it <span>Work</span>?</p>
            </div> 

            <hr className={styles.divider}/>
            {
                list
            }
    </div>
   )
 }
 
 export default UsageSection