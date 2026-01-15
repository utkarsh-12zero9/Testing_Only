import styles from './styles/ObjectiveSection.module.css'
import objectiveData from './data/objectiveData'
import ObjectiveCard from './localComponents/objectiveCard/ObjectiveCard'

function ObjectiveSection() {

    const list = objectiveData.map((item, index) => (
        <ObjectiveCard key={index} objectiveData={item}/>
    ))

  return (
    <div className={styles.objectiveSection} style={{
        background: "url('/landingPageImages/reviewSection/main.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }}>
        <div className={styles.overlay}>
            <div className={styles.objectiveSectionTitle}>
                <h1>Objectives</h1>
                <p>What are we trying to <span>Achieve</span>?</p>
            </div>

            <hr className={styles.divider}/>

            <div className={styles.objectiveList}>
                {list}
            </div>

        </div>
    </div>
  )
}

export default ObjectiveSection