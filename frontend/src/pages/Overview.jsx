import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statsService } from '../services/statsService';
import { setStats } from '../store/dataSlice';
import { Swords, Users, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';

const StatCard = ({ title, value, icon: Icon, loading, colorFrom, colorTo, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
    className="glass-panel p-6 flex flex-col relative overflow-hidden rounded-[24px]"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorFrom} ${colorTo} text-white shadow-lg z-10`}>
        <Icon size={28} />
      </div>
    </div>
    
    <div className="relative z-10">
      <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-1">{title}</p>
      {loading ? (
        <div className="h-10 w-24 bg-white/10 rounded animate-pulse"></div>
      ) : (
        <h3 className="text-4xl font-bold text-white tracking-tight">{value}</h3>
      )}
    </div>

    {/* Background subtle glow */}
    <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${colorFrom} ${colorTo}`}></div>
  </motion.div>
);

const Overview = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const [matches, players, rating, winRates, topOpenings] = await Promise.all([
          statsService.getTotalMatches(),
          statsService.getTotalPlayers(),
          statsService.getAverageRating(),
          statsService.getWinRates(),
          statsService.getTopOpenings()
        ]);

        dispatch(setStats({
          totalMatches: matches.value,
          totalPlayers: players.value,
          averageRating: rating.value,
          winRates,
          topOpenings: topOpenings.value
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    if (!stats) {
      fetchDashboardStats();
    } else {
      setLoading(false);
    }
  }, [dispatch, stats]);

  // Win Distribution Chart Config
  const winDistOptions = {
    chart: { type: 'radialBar', fontFamily: 'Roboto, sans-serif', animations: { enabled: true, easing: 'easeinout', speed: 800 } },
    plotOptions: {
      radialBar: {
        hollow: { size: '45%' },
        track: { background: 'rgba(255,255,255,0.05)', strokeWidth: '100%', margin: 10 },
        dataLabels: {
          name: { fontSize: '14px', color: '#94A3B8', fontWeight: 500 },
          value: { fontSize: '24px', color: '#F8FAFC', fontWeight: 700, formatter: (val) => `${val}%` },
          total: { show: true, label: 'White Wins', color: '#F8FAFC', formatter: () => `${stats?.winRates?.white || 0}%` }
        }
      }
    },
    labels: ['White Wins', 'Black Wins', 'Draws'],
    colors: ['#D4AF37', '#6B7280', '#4B5563'], // Gold for white, grays for black/draw
    stroke: { lineCap: 'round' },
    legend: { show: true, position: 'bottom', labels: { colors: '#94A3B8' }, markers: { radius: 12 } },
    tooltip: { enabled: true, theme: 'dark' }
  };

  const winDistSeries = loading ? [0, 0, 0] : [
    stats?.winRates?.white || 0,
    stats?.winRates?.black || 0,
    stats?.winRates?.draw || 0
  ];

  // Top Openings Chart Config
  const topOpeningsData = stats?.topOpenings || [];
  const openingNames = topOpeningsData.map(o => o.name);
  const openingCounts = topOpeningsData.map(o => o.count);

  const topOpeningsOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Roboto, sans-serif', animations: { enabled: true, easing: 'easeinout', speed: 800 } },
    plotOptions: {
      bar: { horizontal: true, borderRadius: 6, distributed: true, barHeight: '50%' }
    },
    colors: ['#D4AF37', '#B8860B', '#9CA3AF', '#6B7280', '#4B5563'],
    dataLabels: { enabled: true, textAnchor: 'start', style: { colors: ['#fff'] }, formatter: (val, opt) => opt.w.globals.labels[opt.dataPointIndex], offsetX: 0, dropShadow: { enabled: true } },
    xaxis: { categories: openingNames, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { theme: 'dark', y: { title: { formatter: () => 'Played:' } } },
    legend: { show: false }
  };

  const topOpeningsSeries = [{ name: 'Times Played', data: openingCounts }];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
      >
        <div className="absolute -top-10 -left-10 text-9xl opacity-5 pointer-events-none select-none">♜</div>
        <div className="relative z-10 flex flex-col gap-1">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black">
            Dashboard Overview
          </h1>
          <p className="text-lg sm:text-xl font-medium text-black mt-1">
            Real-time chess analytics at a glance.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Matches" 
          value={stats?.totalMatches?.toLocaleString() || 0} 
          icon={Swords} 
          loading={loading}
          colorFrom="from-zinc-700" colorTo="to-zinc-900"
          delay={0.1}
        />
        <StatCard 
          title="Unique Players" 
          value={stats?.totalPlayers?.toLocaleString() || 0} 
          icon={Users} 
          loading={loading}
          colorFrom="from-stone-700" colorTo="to-stone-900"
          delay={0.2}
        />
        <StatCard 
          title="Average Rating" 
          value={stats?.averageRating?.toLocaleString() || 0} 
          icon={TrendingUp} 
          loading={loading}
          colorFrom="from-neutral-700" colorTo="to-neutral-900"
          delay={0.3}
        />
        <StatCard 
          title="White Win Rate" 
          value={`${stats?.winRates?.white || 0}%`} 
          icon={Trophy} 
          loading={loading}
          colorFrom="from-amber-500" colorTo="to-amber-700"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="glass-panel p-6 min-h-[400px] flex flex-col"
        >
          <h2 className="text-xl font-bold text-white mb-6">Win Rate Distribution</h2>
          <div className="flex-1 flex items-center justify-center">
            {loading ? (
              <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <div className="w-full">
                <Chart options={winDistOptions} series={winDistSeries} type="radialBar" height={350} />
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
          className="glass-panel p-6 min-h-[400px] flex flex-col"
        >
          <h2 className="text-xl font-bold text-white mb-6">Top Openings</h2>
          <div className="flex-1 flex items-center justify-center">
            {loading ? (
              <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <div className="w-full">
                <Chart options={topOpeningsOptions} series={topOpeningsSeries} type="bar" height={320} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
