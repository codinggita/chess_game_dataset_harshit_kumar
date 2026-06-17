import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { playerService } from '../services/playerService';
import { showToast } from '../store/uiSlice';
import { Search, Shield, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const Players = () => {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlayers = async (query = '') => {
    try {
      setLoading(true);
      const res = await playerService.getPlayers(1, 50, query);
      if (res.success && res.data) {
        // The backend returns Matches, so we extract unique player names
        const uniqueNames = new Set();
        res.data.forEach(match => {
          if (match.white_id) uniqueNames.add(match.white_id);
          if (match.black_id) uniqueNames.add(match.black_id);
        });
        
        // Convert to array of objects for table rendering
        const extractedPlayers = Array.from(uniqueNames).map((name, index) => ({
          id: index,
          username: name
        }));
        
        setPlayersList(extractedPlayers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      fetchPlayers(searchQuery.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Grandmaster Directory</h1>
          <p className="text-muted mt-1">Explore unique players from recent matches ({playersList.length} shown)</p>
        </div>
        
        <div className="w-full sm:w-auto">
          <div className="glass-panel !p-0 !rounded-xl overflow-hidden shadow-none hover:!shadow-none !border-white/10 w-full sm:w-72 flex items-center bg-white/5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted" />
            </div>
            <input 
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="w-full bg-transparent border-none text-white text-sm py-2.5 pl-10 pr-4 focus:ring-0 focus:outline-none placeholder:text-muted/70"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : playersList.length === 0 ? (
        <div className="glass-panel py-20 text-center">
          <p className="text-xl font-bold text-white mb-2">No Players Found</p>
          <p className="text-muted">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden rounded-[24px] p-0"
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="py-5 px-6 text-xs font-black text-primary uppercase tracking-widest w-24">ID</th>
                  <th className="py-5 px-6 text-xs font-black text-primary uppercase tracking-widest">Grandmaster Name</th>
                  <th className="py-5 px-6 text-xs font-black text-primary uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {playersList.map((player, idx) => (
                  <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6 text-white/50 font-mono text-sm w-24">
                      #{String(idx + 1).padStart(3, '0')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-bold group-hover:text-primary transition-colors">{player.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 text-[10px] font-bold uppercase tracking-widest">
                        <Shield size={12} /> Active
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Players;
