import styles from './AccessibilityBox.module.css'

const ITEMS = [
  {
    name: "My Website",
    icon: "/dashboard/accessibility/websiteIcon.svg",
    path: "/manager/webpage",
    requiredProgress: 3,
  },
  {
    name: "My Transactions",
    icon: "/dashboard/accessibility/transactionIcon.svg",
    path: "/manager/transactions",
    requiredProgress: 1,
  },
  {
    name: "Membership",
    icon: "/dashboard/accessibility/membershipIcon.svg",
    path: "/manager/membership",
    requiredProgress: 2,
  },
  {
    name: "Members",
    icon: "/dashboard/accessibility/membersIcon.svg",
    path: "/manager/members",
    requiredProgress: 4,
  },
];
export default function AccessibilityBox({ progress }: { progress: number }) {

  return (
    <div className={styles.accessibilityBox}>
      {ITEMS.map((item, i) => {
        const isLocked = progress < item.requiredProgress;
        return (
          <div key={i} className={styles.accessible}>
            <div className={styles.icon}>
              <img
                src={isLocked ? "/dashboard/accessibility/lockIcon.svg" : item.icon}
                alt={item.name}
              />
            </div>
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  )
};
