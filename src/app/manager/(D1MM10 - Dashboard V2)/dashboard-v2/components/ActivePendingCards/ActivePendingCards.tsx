import styles from './ActivePendingCards.module.css';

import membersIcon from '../../icons/members.svg'
import newMembersIcon from '../../icons/new-members-icon.svg'

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardContent from '../Card/CardContent';
import CardDevider from '../Card/CardDevider';
import CardFooter from '../Card/CardFooter';
import CardFooterLink from '../Card/CardFooterLink';

type ActivePendingCardsProps = {
  activeMembers: {
    currentCount: number;
    percentageChange: number;
  }
}
export default function ActivePendingCards({ activeMembers }: ActivePendingCardsProps) {
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader icon={membersIcon} title='Active' />
        <CardContent number={activeMembers?.currentCount} label='Members' />
        <CardDevider />
        <CardFooter percentage={activeMembers?.percentageChange} comparison='vs last 7 days Avg.' />
      </Card>

      <Card>
        <CardHeader icon={newMembersIcon} iconColor='var(--primary-blue-black-1)' title='Pending' />
        <CardContent number={5} numberColor='var(--bodytext-off-white)' label='Members' />
        <CardDevider />
        <CardFooterLink text='Activate Now' link='#' />
      </Card>
    </div>
  )
};
