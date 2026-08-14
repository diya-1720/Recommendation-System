import React, { useState, useEffect } from 'react';
import MoodSelector from '../components/MoodSelector';
import VibeMixer from '../components/VibeMixer';
import MovieGrid from '../components/MovieGrid';
import VibeDrop from '../components/VibeDrop';
import SharedVibes from '../components/SharedVibes';
import SectionTitle from '../components/SectionTitle';
import {
  getMovies,
  getMoods,
  getSharedVibes,
} from '../services/api';
import {
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

export default function Home({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [sharedVibeData, setSharedVibeData] = useState(null);
  const [showMixer, setShowMixer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');

        const allMovies = await getMovies();
        const allMoods = await getMoods();
        const shared = await getSharedVibes('aarav-sci-fi');

        setMovies(allMovies);
        setMoods(allMoods);
        setSharedVibeData(shared);
      } catch (err) {
        console.error('Failed to load home data:', err);
        setError(
          'Unable to load movie recommendations. Please make sure the backend is running.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Select a mood and get matching movies
  const handleSelectMood = async (mood) => {
    try {
      setError('');

      if (selectedMood?.id === mood.id) {
        setSelectedMood(null);
        setLoading(true);

        const allMovies = await getMovies({
          sortBy: 'rating',
        });

        setMovies(allMovies);
        setLoading(false);
        return;
      }

      setSelectedMood(mood);
      setLoading(true);

      const filteredMovies = await getMovies({
        mood: mood.id,
        sortBy: 'match',
      });

      setMovies(filteredMovies);
      setLoading(false);

      // Smooth scroll to recommendations
      const el = document.getElementById('recommendations');
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } catch (err) {
      console.error('Failed to load mood recommendations:', err);
      setError('Could not load recommendations for this mood.');
      setLoading(false);
    }
  };

  // Reset mood
  const handleResetMood = async () => {
    try {
      setSelectedMood(null);
      setLoading(true);
      setError('');

      const allMovies = await getMovies({
        sortBy: 'rating',
      });

      setMovies(allMovies);
    } catch (err) {
      console.error('Failed to reset recommendations:', err);
      setError('Could not reload the movie library.');
    } finally {
      setLoading(false);
    }
  };

  // Vibe Mixer
  const handleMixVibe = async (mixDimensions) => {
    try {
      setLoading(true);
      setError('');

      const sorted = await getMovies({
        sortBy: 'match',
      });

      setMovies(sorted);
      setLoading(false);

      const el = document.getElementById('recommendations');
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } catch (err) {
      console.error('Failed to mix vibe:', err);
      setError('Could not generate your vibe recommendations.');
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '30px 16px 80px 16px',
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            backgroundColor: 'var(--bg-sand)',
            borderRadius: '2px',
            marginBottom: '12px',
          }}
        >
          <Sparkles
            size={16}
            color="var(--accent-burnt-orange)"
          />

          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-burnt-orange)',
              fontWeight: 'bold',
            }}
          >
            🎬 REEL VIBE MOVIE DISCOVERY
          </span>
        </div>

        <h1
          className="heading-editorial"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            color: 'var(--text-charcoal)',
            marginBottom: '8px',
          }}
        >
          WHAT'S YOUR VIBE TODAY?
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 24px auto',
          }}
        >
          Select an emotional state or fine-tune sensory
          dimensions to generate personalized film
          recommendations.
        </p>

        {/* Toggle Vibe Mixer */}
        <button
          type="button"
          onClick={() =>
            setShowMixer(!showMixer)
          }
          className="btn-cinematic-secondary"
          style={{
            fontSize: '0.85rem',
            padding: '10px 20px',
          }}
        >
          <SlidersHorizontal size={15} />

          <span>
            {showMixer
              ? 'HIDE VIBE MIXER'
              : 'OPEN VIBE MIXER SLIDERS'}
          </span>
        </button>
      </div>

      {/* Vibe Mixer */}
      {showMixer && (
        <div className="animate-fade-in">
          <VibeMixer
            onMixVibe={handleMixVibe}
          />
        </div>
      )}

      {/* Mood Selector */}
      <MoodSelector
        moods={moods}
        selectedMood={selectedMood}
        onSelectMood={handleSelectMood}
        onResetMood={handleResetMood}
      />

      {/* Error Message */}
      {error && (
        <div
          style={{
            margin: '24px 0',
            padding: '16px 20px',
            border: '1px solid var(--accent-burnt-orange)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-charcoal)',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {/* Recommendations */}
      <section
        id="recommendations"
        style={{
          marginBottom: '60px',
        }}
      >
        <SectionTitle
          badgeText="YOUR VIBE MATCHES"
          title="RECOMMENDED FOR YOUR MOOD"
          subtitle="Editorial film cards complete with vector match percentages, atmosphere tags, and VYORA'S TAKE."
        />

        {loading ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}
          >
            Finding movies for your vibe...
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            selectedMood={selectedMood}
            onSelectMovie={onSelectMovie}
          />
        )}
      </section>

      {/* Vibe Drop */}
      <VibeDrop
        movies={movies}
        onSelectMovie={onSelectMovie}
      />

      {/* Vibe Exchange Preview */}
      <section
        style={{
          marginTop: '60px',
        }}
      >
        <SectionTitle
          badgeText="VIBE EXCHANGE"
          title="RECOMMENDED FROM YOUR CIRCLE"
          subtitle="Discover films recommended through collaborative taste matching with people in your Vibe Circle."
        />

        <SharedVibes
          sharedData={sharedVibeData}
          movies={movies}
          onSelectMovie={onSelectMovie}
        />
      </section>
    </main>
  );
}