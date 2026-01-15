import { useAppSelector } from "@/app/Redux/hooks";
import CoachCard from "./localComponents/coachCard/CoachCard";
import styles from "./TrainerSection.module.css";
import { selectTrainerData } from "@/app/Redux/slice/businessSlice/TrainerData";
import React from "react";
function TrainerSection() {
  const businessData = useAppSelector(selectTrainerData);

  const list = businessData?.map((item) => (
    <React.Fragment key={item.ID}>
      <CoachCard coachData={item} />
    </React.Fragment>
  ));
  return (
    <div className={styles.trainer} id="trainersSection">
      <div className={styles.trainerTitle}>
        <h1>Trainers</h1>
        <p>
          Meet your <span>Trainers</span>
        </p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.coachList}>{list}</div>
    </div>
  );
}

export default TrainerSection;
