import React, { useEffect, useState } from 'react';
import { statsService } from '../services/statsService';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Openings = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const res = await statsService.getTopOpenings();
        if (res.success) setOpenings(res.value || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpenings();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide flex items-center gap-3">
            <BookOpen className="text-primary" size={32} />
            Openings Theory
          </h1>
          <p className="text-muted mt-1">Top most played chess openings based on real data.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden rounded-[24px]"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : openings.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-white mb-2">No Openings Found</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/20">
                  <th className="py-4 px-6 text-sm font-bold text-primary uppercase tracking-wider">Rank</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary uppercase tracking-wider">Opening Name</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary uppercase tracking-wider text-right">Total Matches</th>
                </tr>
              </thead>
              <tbody>
                {openings.map((opening, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-bold w-24">#{idx + 1}</td>
                    <td className="py-4 px-6 text-white">{opening.name || 'Unknown'}</td>
                    <td className="py-4 px-6 text-right text-primary font-bold">{opening.count?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Openings;
