import styles from './CoachCard.module.css';

interface CoachCardProps {
  coachData: {
    ID: string;
    age: number;
    businessID: string;
    desc: string;
    expertise: string[];
    name: string;
    plans: any[];
  }
}

function CoachCard({ coachData }: CoachCardProps) {


  return (
    <div 
      className={styles.card} 
      style={{
        background: "url('/landingPageImages/trainerSection/coach1.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div>
        <div className={styles.cardText}>
          <div>
            <h1 className={styles.name}>{coachData.name}</h1>
            <h3 className={styles.post}>{
              coachData.expertise.map((item) => item).join(' / ')
            }</h3>
          </div>
          <p className={styles.desc}>{coachData.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default CoachCard;