import InfoCard from './localComponents/infoCard/InfoCard'
import styles from './styles/TargetSection.module.css'
import customerInfoData from './localComponents/infoCard/data/customerInfoData'
import Arrow from '@/app/sections/serviceSection/localComponents/arrows/Arrow'
import GetDimensions from '@/lib/getDimensions'

function TargetSection() {

    const { width } = GetDimensions();

    const list = customerInfoData.map((item, index) => {
        return (
            <InfoCard type={index % 2 + 1} key={index} infoData={item}/>
        )
    })

  return (
     <div className={styles.customer} >
            <div className={styles.customerTitle}>
                <div className={styles.customerTitleText}>
                    <h1>Customers</h1>
                    <p>
                        What are we trying to <span>solve</span>?
                    </p>
                </div>
                <p>Our solution is designed to serve all types of fitness businesses, from independent trainers to nationwide gym chains.</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.customerList + " " + " hideScrollBar "} id='targetList'>
                {list}
            </div>
            {width < 426 && <Arrow scrollId="targetList" />}
        </div>
  )
}

export default TargetSection