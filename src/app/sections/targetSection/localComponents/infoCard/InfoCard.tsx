import styles from './styles/InfoCard.module.css'

interface InfoCardProps {
    type: number,
    infoData : {
        title : string,
        desc : string,
        percentage : number
    }
}

function InfoCard({type=1 , infoData} :  InfoCardProps) {
  return (
    <div className={styles.infoCard} style={{
        backgroundColor : type === 1 ?  "var(--bodyfill-grey)" : "var(--bodyfill-primary-green)",
    }}>
        <h1 style={{
            color : type === 1 ? "var(--bodytext-primary-green)" : "var(--bodytext-dark-green)"
        }}>{infoData.percentage}%</h1>
        <h3 style={{
            color : type === 1 ? "var(--bodytext-primary-green)" : "var(--bodytext-dark-green)"
        }}>{infoData.title}</h3>
        <p style={{
            color : type === 1 ? "var(--bodytext-off-white)" : "var(--bodytext-dark-green)"
        }}>{infoData.desc}</p>
    </div>
  )
}

export default InfoCard