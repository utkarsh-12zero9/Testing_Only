import styles from './styles/CustomerSection.module.css'
import customerData from './data/CustomerData'
import React from 'react'
import CustomerCard from './localComponents/customerCard/CustomerCard'
import Arrow from '@/app/sections/serviceSection/localComponents/arrows/Arrow'
import GetDimensions from '@/lib/getDimensions'

function CustomerSection() {

    const { width } = GetDimensions();

    const list = customerData.map((item, index) => {
        return (
            <div key={index} className={styles.cardHolder}>
            <CustomerCard customerData={item} type={index + 1}/>
            </div>
        )
    })

    return (
        <div className={styles.customer} id="trainersSection">
            <div className={styles.customerTitle}>
                <div className={styles.customerTitleText}>
                    <h1>Customers</h1>
                    <p>
                        Who we are <span>Built for?</span>
                    </p>
                </div>
                <p>Our solution is designed to serve all types of fitness businesses, from independent trainers to nationwide gym chains.</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.customerList + " " + " hideScrollBar "} id="customerList">
                {list}
            </div> 
            { width < 426 && <Arrow scrollId='customerList'/> }
        </div>
    )
}

export default CustomerSection