import Image from "next/image";
import styles from "./styles/SubUsageSection.module.css";

interface imageProps {
  url: string;
  height: number;
  width: number;
}

interface workProps {
  title: string;
  desc: string;
}

interface dataProps {
  title: string;
  desc: string;
  image: imageProps;
  working: workProps[];
}

function SubUsageSection({ data, type=1 }: { data: dataProps, type : number }) {
  const list = data.working.map((item, index) => (
    <li key={index} className={styles.work}>
      <p>
        <span>{item.title}{item.title !== "" && ":"} </span>
         {item.desc}
      </p>
    </li>
  ));

  return (
    <div className={styles.subUsageSection}>
      {
        type === 1 && <>
          <Image
        src={data.image.url}
        alt=""
        height={data.image.height}
        width={data.image.width}
      />
      <hr className={styles.verticalDivider} />
        </>
      }
      <div className={styles.metaData}>
        <div className={styles.titleBlock}>
          <h1>{data.title}</h1>
          <div className={styles.fancyDividerBlock}>
            <hr />
            <div className={styles.divdedOverlay} />
          </div>
          <p>{data.desc}</p>
        </div>

        <h3 className={styles.howItWorks}>📌How it works: </h3>
        <div className={styles.workingList}>
          <ul>{list}</ul>
        </div>
      </div>
      {
        type !== 1 && <>
        <hr className={styles.verticalDivider} />
          <Image
        src={data.image.url}
        alt=""
        height={data.image.height}
        width={data.image.width}
      />
        </>
      }
    </div>
  );
}

export default SubUsageSection;
