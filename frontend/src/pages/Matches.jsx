import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchService } from '../services/matchService';
import { setMatches } from '../store/dataSlice';
import { showToast } from '../store/uiSlice';
import { Trash2, Search, Flame, BarChart2, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match, onDelete, onAnalyze, isUpset }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
      className="glass-panel relative overflow-hidden flex flex-col group transition-all duration-300 rounded-[24px] border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#121212] p-0"
    >
      {/* Top Banner */}
      <div className={`px-5 py-2.5 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest border-b border-white/5 ${
        match.winner === 'white' ? 'bg-gradient-to-r from-success/20 to-transparent text-success' : 
        match.winner === 'black' ? 'bg-gradient-to-r from-success/20 to-transparent text-success' : 
        'bg-gradient-to-r from-muted/20 to-transparent text-muted'
      }`}>
        <span className="flex items-center gap-2">
          {match.winner === 'white' ? <CheckCircle2 size={14}/> : match.winner === 'black' ? <CheckCircle2 size={14}/> : <MinusCircle size={14}/>}
          {match.winner === 'white' ? 'White Won' : match.winner === 'black' ? 'Black Won' : 'Draw'}
        </span>
        {isUpset && (
          <span className="flex items-center gap-1 text-warning bg-warning/10 px-2.5 py-0.5 rounded-full border border-warning/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Flame size={12} /> Upset
          </span>
        )}
      </div>

      {/* Players Section */}
      <div className="p-6 flex justify-between items-center">
        {/* White Player */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-14 h-14 rounded-[18px] bg-white text-black flex items-center justify-center font-black text-xl shadow-[0_5px_15px_rgba(255,255,255,0.15)] mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-300"></div>
            <span className="relative z-10">W</span>
          </div>
          <p className="font-bold text-white text-sm text-center truncate max-w-[100px] w-full" title={match.white_id}>{match.white_id}</p>
          <p className="text-[10px] text-muted font-mono bg-black/40 px-2 py-0.5 rounded mt-1.5 border border-white/5">{match.white_rating}</p>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center justify-center px-2">
          <div className="text-[9px] text-muted font-bold tracking-widest uppercase mb-2">{match.victory_status}</div>
          <div className="bg-black/60 border border-white/10 px-4 py-1.5 rounded-full text-xs font-black text-primary tracking-widest shadow-inner">VS</div>
          <div className="text-[9px] text-muted font-bold tracking-widest uppercase mt-2">{match.turns} turns</div>
        </div>

        {/* Black Player */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-14 h-14 rounded-[18px] bg-black border border-white/20 text-white flex items-center justify-center font-black text-xl shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
            <span className="relative z-10">B</span>
          </div>
          <p className="font-bold text-white text-sm text-center truncate max-w-[100px] w-full" title={match.black_id}>{match.black_id}</p>
          <p className="text-[10px] text-muted font-mono bg-black/40 px-2 py-0.5 rounded mt-1.5 border border-white/5">{match.black_rating}</p>
        </div>
      </div>

      {/* Opening & Actions */}
      <div className="mt-auto border-t border-white/5 bg-black/40 p-5 flex justify-between items-center relative overflow-hidden min-h-[76px]">
        <div className="flex flex-col z-10 transition-opacity duration-300 group-hover:opacity-0 w-full">
          <span className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1">Opening</span>
          <span className="text-sm font-semibold text-white truncate w-full" title={match.opening_name}>{match.opening_name || 'Unknown'}</span>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 px-5 transform translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={() => onAnalyze(match.id || match._id)}
            className="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          >
            <BarChart2 size={16} /> Analyze
          </button>
          <button 
            onClick={() => onDelete(match.id || match._id)}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-danger/10 border border-danger/20 text-danger hover:bg-danger hover:text-white transition-colors flex-shrink-0"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Matches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matches } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('matches');
  const [activeMode, setActiveMode] = useState('default');

  const fetchMatchesData = async () => {
    try {
      setLoading(true);
      let res;
      if (activeMode === 'search' && searchQuery.trim() !== '') {
        if (searchType === 'players') {
          res = await matchService.searchPlayers(searchQuery);
        } else if (searchType === 'openings') {
          res = await matchService.searchOpenings(searchQuery);
        } else if (searchType === 'eco') {
          res = await matchService.searchEco(searchQuery);
        } else {
          res = await matchService.searchMatches(searchQuery);
        }
      } else if (activeMode.startsWith('filter/')) {
        res = await matchService.filterMatches(activeMode.split('/')[1]);
      } else if (activeMode.startsWith('sort/')) {
        res = await matchService.sortMatches(activeMode.split('/')[1]);
      } else {
        res = await matchService.getMatches(page, 12); // Fetched 12 to fit nicely in grid
      }
      
      if (res.success) {
        dispatch(setMatches(res.data));
        if (res.pagination) {
          setTotalPages(res.pagination.pages);
          setTotalRecords(res.pagination.total);
        } else {
          setTotalPages(1);
          setTotalRecords(res.count || res.data.length);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchesData();
  }, [page, activeMode]);

  const handlePageChange = (event, value) => {
    if (activeMode === 'default') {
      setPage(value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setActiveMode(searchQuery.trim() === '' ? 'default' : 'search');
      setPage(1);
    }
  };

  const handleModeChange = (e) => {
    setActiveMode(e.target.value);
    setSearchQuery('');
    setPage(1);
  };

  const handleAnalyze = (id) => {
    navigate(`/dashboard/analysis/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchService.deleteMatch(id);
        dispatch(showToast({ message: 'Match deleted successfully', severity: 'success' }));
        fetchMatchesData();
      } catch (error) {
        // Error toast handled by api interceptor
      }
    }
  };

  const isUpset = (match) => {
    const whiteDiff = Number(match.black_rating) - Number(match.white_rating);
    const blackDiff = Number(match.white_rating) - Number(match.black_rating);
    
    if (match.winner === 'white' && whiteDiff > 150) return true;
    if (match.winner === 'black' && blackDiff > 150) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Matches Database</h1>
          <p className="text-muted mt-1">Explore {totalRecords.toLocaleString()} games played.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex items-center bg-surface border border-white/5 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="bg-transparent text-muted text-[11px] border-0 focus:ring-0 px-4 py-3 outline-none appearance-none cursor-pointer font-bold uppercase tracking-wider hover:text-white transition-colors border-r border-white/5"
            >
              <option value="matches" className="bg-surface text-white">All Fields</option>
              <option value="players" className="bg-surface text-white">Players</option>
              <option value="openings" className="bg-surface text-white">Openings</option>
              <option value="eco" className="bg-surface text-white">ECO Code</option>
            </select>
            <div className="flex items-center px-4 bg-transparent w-full sm:w-64">
              <Search size={16} className="text-muted shrink-0 mr-3" />
              <input 
                type="text"
                placeholder={`Search ${searchType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-transparent border-none text-white text-sm py-3 focus:ring-0 focus:outline-none placeholder:text-muted/50"
              />
            </div>
          </div>
          
          {/* Filters/Sort */}
          <div className="relative bg-surface border border-white/5 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] hover:bg-white/5 group">
            <select
              value={activeMode}
              onChange={handleModeChange}
              className="w-full sm:min-w-[200px] bg-transparent text-white text-sm border-0 focus:ring-0 px-5 py-3 pr-10 outline-none appearance-none cursor-pointer font-medium"
            >
              <option value="default" className="bg-surface">All Matches</option>
              <optgroup label="-- Filters --" className="bg-surface text-primary font-bold">
                <option value="filter/rated" className="text-white font-normal">Rated Only</option>
                <option value="filter/unrated" className="text-white font-normal">Unrated Only</option>
                <option value="filter/white-wins" className="text-white font-normal">White Wins</option>
                <option value="filter/black-wins" className="text-white font-normal">Black Wins</option>
                <option value="filter/checkmates" className="text-white font-normal">Checkmates</option>
              </optgroup>
              <optgroup label="-- Sort By --" className="bg-surface text-primary font-bold">
                <option value="sort/longest" className="text-white font-normal">Longest Matches</option>
                <option value="sort/shortest" className="text-white font-normal">Shortest Matches</option>
                <option value="sort/highest-rated" className="text-white font-normal">Highest Rated</option>
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted group-hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="glass-panel py-20 text-center">
          <p className="text-xl font-bold text-white mb-2">No Matches Found</p>
          <p className="text-muted">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {matches.map((match) => (
              <MatchCard 
                key={match.id || match._id} 
                match={match} 
                onDelete={handleDelete} 
                onAnalyze={handleAnalyze}
                isUpset={isUpset(match)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="glass-panel py-2 px-4 rounded-full inline-flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(null, page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              &lt;
            </button>
            <span className="text-white font-bold px-4">Page {page} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(null, page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
