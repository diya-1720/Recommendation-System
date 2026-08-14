import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import MovieCard from '../components/MovieCard';
import VibeEvolution from '../components/VibeEvolution';
import {
  getUserUniverse,
  getVibeEvolution,
  MOVIES,
  MOCK_VIBE_USERS
} from '../services/api';
import UserProfileCard from '../components/UserProfileCard';

import {
  Bookmark,
  Clock,
  Orbit,
  Settings,
  Users,
  BarChart3,
  User,
  LogIn
} from 'lucide-react';

export default function MyUniverse({ onSelectMovie }) {

  const [universeData, setUniverseData] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  const [activeTab, setActiveTab] = useState('overview');

  // ==========================================
  // LOAD USER UNIVERSE
  // ==========================================

  useEffect(() => {

    async function load() {

      try {

        // --------------------------------------
        // CHECK LOGGED-IN USER
        // --------------------------------------

        const savedUser =
          localStorage.getItem('vyora_user');

        // --------------------------------------
        // NO USER = GUEST
        // --------------------------------------

        if (!savedUser) {

          setIsGuest(true);
          setUniverseData(null);

          return;
        }

        // --------------------------------------
        // PARSE USER
        // --------------------------------------

        let loggedInUser;

        try {

          loggedInUser =
            JSON.parse(savedUser);

        } catch (error) {

          console.error(
            'Invalid saved user:',
            error
          );

          localStorage.removeItem(
            'vyora_user'
          );

          setIsGuest(true);
          setUniverseData(null);

          return;
        }

        // --------------------------------------
        // GET EXISTING UNIVERSE DATA
        // --------------------------------------

        const data =
          await getUserUniverse();

        const evo =
          await getVibeEvolution();

        // --------------------------------------
        // REPLACE MOCK PROFILE
        // WITH REAL LOGGED-IN USER
        // --------------------------------------

        data.profile = {
          ...data.profile,

          name:
            loggedInUser.name ||
            'VYORA User',

          username:
            loggedInUser.email
              ? `@${loggedInUser.email.split('@')[0]}`
              : '@user',

          email:
            loggedInUser.email || '',

          bio:
            data.profile?.bio ||
            'Your cinematic universe on VYORA.'
        };

        // --------------------------------------
        // USER IS AUTHENTICATED
        // --------------------------------------

        setIsGuest(false);

        setUniverseData(data);

        setEvolutionData(evo);

      } catch (error) {

        console.error(
          'Failed to load My Universe:',
          error
        );

        setUniverseData(null);

      }

    }

    load();

  }, []);

  // ==========================================
  // GUEST SCREEN
  // ==========================================

  if (isGuest || !universeData) {

    return (

      <main
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px'
        }}
      >

        <SectionTitle
          badgeText="PERSONAL COSMOS"
          title="MY UNIVERSE"
          subtitle="Your unique film identity mapped through watched history, genre affinity vectors, and taste evolution."
        />

        <div
          style={{
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor:
              'var(--bg-card)',
            border:
              '1px solid var(--border-medium)',
            borderRadius: '4px',
            padding: '40px',
            marginTop: '40px'
          }}
        >

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                'rgba(201, 87, 44, 0.1)',
              color:
                'var(--accent-burnt-orange)',
              marginBottom: '20px'
            }}
          >

            <User size={30} />

          </div>

          <h2
            className="heading-editorial"
            style={{
              fontSize: '1.8rem',
              color:
                'var(--text-charcoal)',
              marginBottom: '12px'
            }}
          >
            Guest Mode
          </h2>

          <p
            style={{
              maxWidth: '500px',
              color:
                'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}
          >
            You're exploring VYORA as a guest.
            Sign in to see your personal movie
            universe, watch history, watchlist,
            ratings and vibe profile.
          </p>

          <button
            onClick={() => {

              // Remove guest flag if present
              localStorage.removeItem(
                'vyora_guest'
              );

              // Let the app's existing
              // authentication flow handle login
              window.dispatchEvent(
                new CustomEvent(
                  'open-auth-modal'
                )
              );

            }}
            className="btn-cinematic-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >

            <LogIn size={17} />

            <span>
              SIGN IN / CREATE PROFILE
            </span>

          </button>

        </div>

      </main>

    );
  }

  // ==========================================
  // DATA
  // ==========================================

  const {
    profile,
    stats,
    topGenres
  } = universeData;

  const recentlyWatchedMovies =
    MOVIES.filter(
      m =>
        universeData.recentlyWatched.includes(
          m.id
        )
    );

  const watchlistMovies =
    MOVIES.filter(
      m =>
        universeData.watchlist.includes(
          m.id
        )
    );

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* Page Header */}
      <SectionTitle
        badgeText="PERSONAL COSMOS"
        title="MY UNIVERSE"
        subtitle="Your unique film identity mapped through watched history, genre affinity vectors, and taste evolution."
      />

      {/* ======================================
          PROFILE CARD
      ======================================= */}

      <div
        style={{
          padding: '32px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: '4px',
          marginBottom: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-burnt-orange)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="heading-editorial" style={{ fontSize: '2.2rem', color: 'var(--text-charcoal)', margin: 0 }}>
                {profile.name}
              </h1>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-burnt-orange)', fontWeight: 'bold' }}>
                {profile.username}
              </span>

            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>
              "{profile.bio}"
            </p>

          </div>

        </div>

        {/* SETTINGS */}

        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}
        >

          <button
            onClick={() =>
              alert(
                'Settings dialog opened.'
              )
            }
            className="btn-cinematic-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem'
            }}
          >

            <Settings size={14} />

            <span>
              Settings
            </span>

          </button>

        </div>

      </div>

      {/* ======================================
          STATS
      ======================================= */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}
      >
        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '3px', padding: '24px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            FILMS WATCHED
          </span>
          <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--accent-burnt-orange)' }}>
            {stats.totalWatched}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Logged in your universe</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '3px', padding: '24px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            HOURS EXPLORED
          </span>
          <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--accent-deep-wine)' }}>
            {stats.hoursExplored}h
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total runtime spent</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '3px', padding: '24px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            AVERAGE RATING
          </span>
          <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--highlight-gold)' }}>
            ★ {stats.averageRating}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>High critical benchmark</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sand)', border: '1px solid var(--border-medium)', borderRadius: '3px', padding: '24px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            TOP VIBE VECTOR
          </span>
          <div style={{ fontSize: '1.3rem', fontFamily: 'var(--font-editorial)', fontWeight: 'bold', color: 'var(--text-charcoal)', marginTop: '4px' }}>
            {stats.favoriteGenre}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>34% Affinity match</span>
        </div>

      </div>

      {/* Profile Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        {[
          {
            id: 'overview',
            label: 'YOUR VIBE OVERVIEW',
            icon: BarChart3
          },
          {
            id: 'evolution',
            label: 'VIBE EVOLUTION',
            icon: Orbit
          },
          {
            id: 'watchlist',
            label:
              `WATCHLIST (${watchlistMovies.length})`,
            icon: Bookmark
          },
          {
            id: 'history',
            label:
              `HISTORY (${recentlyWatchedMovies.length})`,
            icon: Clock
          },
          {
            id: 'circle',
            label: 'VIBE CIRCLE',
            icon: Users
          }
        ].map(tab => {

          const Icon = tab.icon;

          const isActive =
            activeTab === tab.id;

          return (

            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--accent-burnt-orange)' : 'var(--bg-card)',
                color: isActive ? '#FFF' : 'var(--text-charcoal)',
                border: '1px solid var(--border-medium)',
                borderRadius: '3px',
                fontWeight: isActive ? 'bold' : '500',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>

          );

        })}

      </div>

      {/* ======================================
          OVERVIEW / EVOLUTION
      ======================================= */}

      {(activeTab === 'overview' ||
        activeTab === 'evolution') && (

        <>
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: '4px', padding: '32px', marginBottom: '40px' }}>
            <h3 className="font-editorial" style={{ fontSize: '1.5rem', color: 'var(--text-charcoal)', marginBottom: '20px' }}>
              YOUR VIBE AFFINITY BREAKDOWN
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {topGenres.map(g => (

                <div key={g.genre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '6px' }}>
                    <span>{g.genre} ({g.count} films)</span>
                    <span style={{ color: 'var(--accent-burnt-orange)', fontFamily: 'var(--font-editorial)', fontWeight: 'bold' }}>
                      {g.percentage}%
                    </span>

                  </div>
                  <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-sand)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width:
                          `${g.percentage}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-burnt-orange)',
                        borderRadius: '2px',
                        transition: 'width 1s var(--ease-cinematic)'
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <VibeEvolution
            evolutionData={evolutionData}
          />

        </>

      )}

      {/* ======================================
          WATCHLIST
      ======================================= */}

      {activeTab === 'watchlist' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.6rem', color: 'var(--text-charcoal)', marginBottom: '20px' }}>
            YOUR WATCHLIST
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {watchlistMovies.map(m => (
              <MovieCard key={m.id} movie={m} onSelect={onSelectMovie} />
            ))}

          </div>

        </section>

      )}

      {/* ======================================
          HISTORY
      ======================================= */}

      {activeTab === 'history' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.6rem', color: 'var(--text-charcoal)', marginBottom: '20px' }}>
            RECENT WATCH HISTORY
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {recentlyWatchedMovies.map(m => (
              <MovieCard key={m.id} movie={m} onSelect={onSelectMovie} />
            ))}

          </div>

        </section>

      )}

      {/* ======================================
          VIBE CIRCLE
      ======================================= */}

      {activeTab === 'circle' && (
        <section style={{ marginBottom: '40px' }}>
          <h3 className="font-editorial" style={{ fontSize: '1.6rem', color: 'var(--text-charcoal)', marginBottom: '20px' }}>
            YOUR VIBE CIRCLE MEMBERS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {MOCK_VIBE_USERS.filter(u => u.isCircleMember).map(u => (
              <UserProfileCard key={u.id} user={u} />
            ))}
          </div>

        </section>

      )}

    </main>

  );
}