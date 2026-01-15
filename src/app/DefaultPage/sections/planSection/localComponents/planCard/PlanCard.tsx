import EnquireButton from "@/globalComponents/buttons/enquireButton/EnquireButton";
import styles from "./styles/PlanCard.module.css";

interface planDataProps {
  title: string;
  desc: string;
  price: number;
  starting: string;
}

interface planCardProps {
  planData: planDataProps;
  type: number;
}

function PlanCard({ planData, type = 1 }: planCardProps) {
  
  const handleClick = (id : string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
  }
}

  const imageStyles = {
    backgroundImage:
      type === 1
        ? `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/landingPageImages/planSection/planCardImage1.png')`
        : `linear-gradient(var(--bodyfill-dark-green-90), var(--bodyfill-dark-green-90)), url('/landingPageImages/planSection/planCardImage2.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div
      className={styles.planCard}
      style={{
        backgroundColor: type === 1 ? "white" : "var(--bodyfill-dark-green)",
      }}
    >
      <div style={imageStyles} className={styles.overlay}>
        <div className={styles.header} style={{
            color : type === 1 ? "" : "var(--bodytext-off-white)"
          }}>
          <h1>{planData.title}</h1>
          <div className={styles.planPriceBlock}>
            <h1>₹ {planData.price}</h1>
            <p>
              Starting at <br /> {planData.starting}
            </p>
          </div>
        </div>
        <div className={styles.dividerBlock}>
          <hr style={{
            borderColor : type === 1 ? "" : "var(--primary-green)"
          }}/>
          <div className={styles.dividerOverlay} style={{
            backgroundColor : type === 1 ? "" : "var(--primary-green)"
          }}/>
        </div>
        <p className={styles.description} style={{
            color : type === 1 ? "" : "var(--bodytext-off-white)"
          }}>{planData.desc}</p>
        <EnquireButton type ={type} action={handleClick}/>
      </div>
    </div>
  );
}

export default PlanCard;
