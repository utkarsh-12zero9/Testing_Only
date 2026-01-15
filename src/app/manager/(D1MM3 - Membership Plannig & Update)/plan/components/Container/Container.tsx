'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import QuickInfo from '../QuickInfo/QuickInfo';
import { selectBusinessID } from '../../../../Redux/slice/business-slice';
import { getMemberStatistics } from '../../services/membershipService';

// Dummy data for development when no statistics exist at backend
const DUMMY_STATS = {
  activeMembers: {
    count: 365,
    unit: 'Active'
  },
  newMembers: {
    count: 15,
    unit: 'Pending'
  },
  trend: {
    direction: 'down' as const,
    percentage: 2.1,
    period: 'vs last 7 days Avg.'
  }
};

export default function Container() {
  const [stats, setStats] = useState(DUMMY_STATS);
  const [loading, setLoading] = useState(true);
  const businessID = useSelector(selectBusinessID);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);

      // Get businessID from Redux or fallback to localStorage
      let activeBusinessID = businessID;

      if (!activeBusinessID) {
        activeBusinessID = localStorage.getItem('businessID') || undefined;
      }

      if (!activeBusinessID) {
        const businessData = localStorage.getItem('businessData');
        if (businessData) {
          try {
            const parsedData = JSON.parse(businessData);
            activeBusinessID = parsedData.ID || parsedData.businessID || parsedData._id;
          } catch (e) {
            console.error('Error parsing businessData:', e);
          }
        }
      }

      if (!activeBusinessID) {
        console.log('No business ID found, using dummy statistics');
        setStats(DUMMY_STATS);
        setLoading(false);
        return;
      }

      const result = await getMemberStatistics(activeBusinessID);
      console.log('Member Statistics API Response:', result);

      if (result.success && result.data) {
        // Use backend data if available
        setStats({
          activeMembers: {
            count: result.data.activeMembers?.count ?? DUMMY_STATS.activeMembers.count,
            unit: result.data.activeMembers?.unit ?? DUMMY_STATS.activeMembers.unit
          },
          newMembers: {
            count: result.data.newMembers?.count ?? DUMMY_STATS.newMembers.count,
            unit: result.data.newMembers?.unit ?? DUMMY_STATS.newMembers.unit
          },
          trend: {
            direction: result.data.trend?.direction ?? DUMMY_STATS.trend.direction,
            percentage: result.data.trend?.percentage ?? DUMMY_STATS.trend.percentage,
            period: result.data.trend?.period ?? DUMMY_STATS.trend.period
          }
        });
      } else {
        console.log('No statistics data from backend, using dummy data');
        setStats(DUMMY_STATS);
      }
    } catch (err) {
      console.error('Error fetching member statistics:', err);
      // Use dummy data on error
      setStats(DUMMY_STATS);
    } finally {
      setLoading(false);
    }
  }, [businessID]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const handleActivateClick = () => {
    console.log("Activate clicked");
  };

  // Show dummy data during loading to prevent layout shift
  if (loading) {
    return (
      <>
        <div className="flex flex-row w-full h-[124px] max-h-[650px] gap-2">
          <QuickInfo
            icon="/plan/memberIcon.svg"
            title="Members"
            value={stats.activeMembers.count}
            unit={stats.activeMembers.unit}
            subtitle={stats.trend.period}
            iconBgColor="var(--primary-green-black-4)"
            valueColor="var(--primary-green)"
            trendDirection={stats.trend.direction}
            trendPercentage={stats.trend.percentage}
            trendColor="red"
          />
          <QuickInfo
            icon="/plan/newMembers.svg"
            title="New Members"
            value={stats.newMembers.count}
            unit={stats.newMembers.unit}
            subtitle="Activate Now >"
            iconBgColor="var(--primary-blue)"
            valueColor="var(--pure-white)"
            subtitleColor="var(--primary-green-black-0)"
            subtitleClickable={true}
            onSubtitleClick={handleActivateClick}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row w-full h-[124px] max-h-[650px] gap-2">
        <QuickInfo
          icon="/plan/memberIcon.svg"
          title="Members"
          value={stats.activeMembers.count}
          unit={stats.activeMembers.unit}
          subtitle={stats.trend.period}
          iconBgColor="var(--primary-green-black-4)"
          valueColor="var(--primary-green)"
          trendDirection={stats.trend.direction}
          trendPercentage={stats.trend.percentage}
          trendColor="red"
        />
        <QuickInfo
          icon="/plan/newMembers.svg"
          title="New Members"
          value={stats.newMembers.count}
          unit={stats.newMembers.unit}
          subtitle="Activate Now >"
          iconBgColor="var(--primary-blue)"
          valueColor="var(--pure-white)"
          subtitleColor="var(--primary-green-black-0)"
          subtitleClickable={true}
          onSubtitleClick={handleActivateClick}
        />
      </div>
    </>
  );
}
