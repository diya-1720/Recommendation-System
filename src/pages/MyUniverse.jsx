import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import MovieCard from '../components/MovieCard';
import VibeEvolution from '../components/VibeEvolution';
import { getUserUniverse, getVibeEvolution, MOVIES, MOCK_VIBE_USERS } from '../services/api';
import UserProfileCard from '../components/UserProfileCard';
import { Film, User, Star, Clock, Bookmark, Sparkles, Orbit, Settings, Users, BarChart3 } from 'lucide-react';

export default function MyUniverse({ onSelectMovie }) {
  const [universeData, setUniverseData] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'watchlist' | 'history' | 'circle' | 'evolution'

  useEffect(() => {
    async function load() {
      const data = await getUserUniverse();
      const evo = await getVibeEvolution();
      setUniverseData(data);
      setEvolutionData(evo);
    }
    load();
  }, []);

  if (!universeData) return null;

  const { profile, stats, topGenres } = universeData;
  const recentlyWatchedMovies = MOVIES.filter(m => universeData.recentlyWatched.includes(m.id));
  const watchlistMovies = MOVIES.filter(m => universeData.watchlist.includes(m.id));

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 16px 80px 16px' }}>
      {/* Page Header */}
      <SectionTitle
        badgeText="PERSONAL COSMOS"
        title="MY UNIVERSE"
        subtitle="Your unique film identity mapped through watched history, genre affinity vectors, and taste evolution."
      />

      {/* Profile Card Header */}
      <div
        style={{
          padding: '28px 24px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: '6px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent-burnt-orange)',
              boxShadow: 'var(--vyora-glow)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 className="heading-editorial" style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>
                {profile.name}
              </h1>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-burnt-orange)', fontWeight: 'bold' }}>
                {profile.username}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              "{profile.bio}"
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => alert("Settings dialog opened.")}
            className="btn-cinematic-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 40vw, 220px), 1fr))',
          gap: '16px',
          marginBottom: '36px'
        }}
      >
        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            FILMS WATCHED
          </span>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--accent-burnt-orange)' }}>
            {stats.totalWatched}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Logged in your universe</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            HOURS EXPLORED
          </span>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--accent-deep-wine)' }}>
            {stats.hoursExplored}h
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total runtime spent</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            AVERAGE RATING
          </span>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--highlight-gold)' }}>
            ★ {stats.averageRating}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High critical benchmark</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            TOP VIBE VECTOR
          </span>
          <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--text-charcoal)', marginTop: '4px' }}>
            {stats.favoriteGenre}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>34% Affinity match</span>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          borderBottom: '1px solid var(--border-medium)',
          paddingBottom: '12px',
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'overview', label: 'YOUR VIBE OVERVIEW', icon: BarChart3 },
          { id: 'evolution', label: 'VIBE EVOLUTION', icon: Orbit },
          { id: 'watchlist', label: `WATCHLIST (${watchlistMovies.length})`, icon: Bookmark },
          { id: 'history', label: `HISTORY (${recentlyWatchedMovies.length})`, icon: Clock },
          { id: 'circle', label: 'VIBE CIRCLE', icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--accent-burnt-orange)' : 'var(--bg-card)',
                color: isActive ? '#120A18' : 'var(--text-charcoal)',
                border: '1px solid var(--border-medium)',
                borderRadius: '4px',
                fontWeight: isActive ? '700' : '600',
                fontSize: '0.82rem',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview - Genre Affinity */}
      {(activeTab === 'overview' || activeTab === 'evolution') && (
        <>
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '28px', marginBottom: '36px' }}>
            <h3 className="font-editorial" style={{ fontSize: '1.4rem', color: 'var(--text-charcoal)', marginBottom: '18px' }}>
              YOUR VIBE AFFINITY BREAKDOWN
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {topGenres.map(g => (
                <div key={g.genre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '6px' }}>
                    <span>{g.genre} ({g.count} films)</span>
                    <span style={{ color: 'var(--accent-burnt-orange)', fontFamily: 'var(--font-editorial)', fontWeight: 'bold' }}>
                      {g.percentage}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-sand)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${g.percentage}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-burnt-orange)',
                        borderRadius: '3px',
                        transition: 'width 1s var(--ease-cinematic)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <VibeEvolution evolutionData={evolutionData} />
        </>
      )}

      {/* Tab: Watchlist */}
      {activeTab === 'watchlist' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.5rem', color: 'var(--text-charcoal)', marginBottom: '18px' }}>
            YOUR WATCHLIST
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 45vw, 230px), 1fr))', gap: '20px' }}>
            {watchlistMovies.map(m => (
              <MovieCard key={m.id} movie={m} onSelectMovie={onSelectMovie} />
            ))}
          </div>
        </section>
      )}

      {/* Tab: History */}
      {activeTab === 'history' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.5rem', color: 'var(--text-charcoal)', marginBottom: '18px' }}>
            RECENT WATCH HISTORY
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 45vw, 230px), 1fr))', gap: '20px' }}>
            {recentlyWatchedMovies.map(m => (
              <MovieCard key={m.id} movie={m} onSelectMovie={onSelectMovie} />
            ))}
          </div>
        </section>
      )}

      {/* Tab: Circle */}
      {activeTab === 'circle' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.5rem', color: 'var(--text-charcoal)', marginBottom: '18px' }}>
            YOUR VIBE CIRCLE MEMBERS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {MOCK_VIBE_USERS.filter(u => u.isCircleMember).map(u => (
              <UserProfileCard key={u.id} user={u} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
