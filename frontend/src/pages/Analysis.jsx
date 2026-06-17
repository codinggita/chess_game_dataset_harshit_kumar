import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { showToast } from '../store/uiSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Swords, Clock, TrendingUp, Flame, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Chart from 'react-apexcharts';

const Analysis = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Note: The backend doesn't have a getMatchById endpoint, so we fetch matches and find it.
        // In a real app, you'd add a GET /api/matches/:id endpoint.
        const res = await matchService.getMatches(1, 100);
        if (res.success) {
          const foundMatch = res.data.find(m => (m.id || m._id) === matchId);
          if (foundMatch) {
            setMatch(foundMatch);
          } else {
            setError('Match not found');
          }
        } else {
          setError('Failed to fetch match details');
        }
      } catch (err) {
        setError('Error loading analysis');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  const handleDownloadPGN = () => {
    if (!match) return;
    const pgnData = `[Event "Casual Game"]
[Site "Grandmaster Analytics"]
[Date "${match.created_at ? new Date(Number(match.created_at)).toLocaleDateString() : '????.??.??'}"]
[White "${match.white_id}"]
[Black "${match.black_id}"]
[Result "${match.winner === 'white' ? '1-0' : match.winner === 'black' ? '0-1' : '1/2-1/2'}"]
[WhiteElo "${match.white_rating}"]
[BlackElo "${match.black_rating}"]
[TimeControl "${match.increment_code}"]
[Termination "${match.victory_status}"]
[ECO "${match.opening_eco}"]

${match.moves}
`;
    const blob = new Blob([pgnData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `match_${match.id?.substring(0,8)}.pgn`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    dispatch(showToast({ message: 'PGN Downloaded Successfully', severity: 'success' }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Analysis Unavailable</h2>
        <p className="text-muted mb-8">{error || 'Could not find match data.'}</p>
        <button onClick={() => navigate('/dashboard/matches')} className="btn-primary">
          Back to Matches
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Match Analysis</h1>
            <p className="text-muted text-sm mt-1">ID: {match.id || match._id}</p>
          </div>
        </div>
        <button onClick={handleDownloadPGN} className="btn-primary flex items-center gap-2 px-6 py-2">
          <Download size={18} /> Export PGN
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Player vs Player and Stats */}
        <div className="space-y-6">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="glass-panel p-6 rounded-[24px]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-muted">Result</span>
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
                {match.winner} WON
              </span>
            </div>

            <div className="space-y-6">
              {/* White Player */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-surface flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{match.white_id}</h3>
                  <p className="text-sm text-muted">Elo: {match.white_rating}</p>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <span className="bg-background px-3 py-1 rounded-full text-xs font-black text-muted tracking-widest border border-border">VS</span>
              </div>

              {/* Black Player */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full border-2 border-primary bg-surface flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-primary font-bold text-lg">B</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{match.black_id}</h3>
                  <p className="text-sm text-muted">Elo: {match.black_rating}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-[24px]">
            <h3 className="text-lg font-bold text-white mb-4">Match Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-muted"><Swords size={16}/> Opening</div>
                <div className="text-right">
                  <p className="font-semibold text-white max-w-[150px] truncate" title={match.opening_name}>{match.opening_name}</p>
                  <p className="text-xs text-muted">ECO: {match.opening_eco}</p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-muted"><Clock size={16}/> Duration</div>
                <div className="text-right">
                  <p className="font-semibold text-white">{match.turns} turns</p>
                  <p className="text-xs text-muted capitalize">{match.victory_status}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted"><TrendingUp size={16}/> Time Control</div>
                <div className="text-right">
                  <p className="font-semibold text-white">{match.increment_code || 'Unlimited'}</p>
                  <p className="text-xs text-muted">{match.rated === 'TRUE' ? 'Rated' : 'Unrated'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analysis;
