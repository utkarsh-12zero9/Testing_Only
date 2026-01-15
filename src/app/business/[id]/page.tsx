'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './styles/Page.module.css';
import Header from '../../sections/headerSection/Header';
import ServiceSection from '../../sections/serviceSection/ServiceSection';
import TourSection from '../../sections/tourSection/TourSection';
import PlanSection from '../../sections/planSection/PlanSection';
import TrainerSection from '../../sections/trainerSection/TrainerSection';
import ContactSection from '../../sections/contactSection/ContactSection';
import ReviewSection from '../../sections/reviewSection/ReviewSection';
import FooterBar from '@/globalComponents/footerBar/FooterBar';
import {
  fetchBusinessData,
  selectBusinessData,
  selectBusinessLoading,
  selectBusinessError,
} from '@/app/Redux/slice/businessSlice/BusinessData';
import { useAppDispatch, useAppSelector } from '@/app/Redux/hooks';
import { fetchTrainerProfiles } from '@/app/Redux/slice/businessSlice/TrainerData';
import { fetchMembershipPlans, fetchNinetyDayPlans, fetchThirtyDayPlans } from '@/app/Redux/slice/businessSlice/MembershipPlanData';
import Custom404 from '@/globalComponents/Custom404/Custom404';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import { fetchReviewsData } from '@/app/Redux/slice/businessSlice/ReviewData';
import { fetchKeyServices } from '@/app/Redux/slice/businessSlice/KeyServices';

const BusinessPage = () => {
  const { id } = useParams();
  // const [isLogined , setLogined] = useState(true)
  const dispatch = useAppDispatch();
  const businessData = useAppSelector(selectBusinessData);
  const loading = useAppSelector(selectBusinessLoading);
  const error = useAppSelector(selectBusinessError);

  useEffect(() => {
    if (typeof id === 'string') {
      //data
      dispatch(fetchBusinessData(id));

      //trainers
      dispatch(fetchTrainerProfiles(id));

      //plans
      dispatch(fetchMembershipPlans(id));
      dispatch(fetchThirtyDayPlans(id));
      dispatch(fetchNinetyDayPlans(id));

      //key services
      dispatch(fetchKeyServices(businessData?.businessType || "gym"));

      //reviews
      dispatch(fetchReviewsData(id));
    }
  }, [id, dispatch]);

  useEffect(()=>{
    if(typeof id === 'string'){
      localStorage.setItem('businessID', id)
    }
  },[id])


  if (loading) {
    return <LoadingPage/>
  
  }

  if (error) {
    return <Custom404/>
      
  }

  if (!businessData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header />
      <ServiceSection />
      <TourSection />
      <PlanSection />
      <TrainerSection />
      <ReviewSection />
      <ContactSection />
      <FooterBar />
    </div>
  );
};

export default BusinessPage;