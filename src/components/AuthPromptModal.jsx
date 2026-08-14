import React, { useState } from 'react';
import {
  X,
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowLeft
} from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

export default function AuthPromptModal({
  isOpen,
  onClose,
  title = "Want VYORA to remember your vibe?",
  message = "Sign in to personalize your experience, save watchlist items, and connect with your Vibe Circle."
}) {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [mode, setMode] = useState('register');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) {
    return null;
  }

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  // ==========================================
  // OPEN REGISTER
  // ==========================================

  const openRegister = () => {
    resetForm();
    setMode('register');
    setShowAuthForm(true);
  };

  // ==========================================
  // OPEN LOGIN
  // ==========================================

  const openLogin = () => {
    resetForm();
    setMode('login');
    setShowAuthForm(true);
  };

  // ==========================================
  // CONTINUE AS GUEST
  // ==========================================

  const continueAsGuest = () => {

    // IMPORTANT:
    // Remove previously logged-in user
    localStorage.removeItem('vyora_user');

    // Optional guest flag
    localStorage.setItem('vyora_guest', 'true');

    // Close modal
    onClose();

    // Refresh the page so all components
    // immediately understand guest mode
    window.location.reload();
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      setError('Please fill all fields.');
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Registration failed.'
        );
      }

      // New account means user is NOT guest anymore
      localStorage.removeItem('vyora_guest');

      // Save user
      localStorage.setItem(
        'vyora_user',
        JSON.stringify({
          user_id: data.user_id,
          name: data.name,
          email: data.email
        })
      );

      setSuccess(
        'Account created successfully! 🎉'
      );

      setTimeout(() => {

        onClose();

        resetForm();

        setShowAuthForm(false);

        window.location.reload();

      }, 1000);

    } catch (err) {

      console.error(
        'Registration error:',
        err
      );

      setError(
        err.message ||
        'Something went wrong while creating your account.'
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        'Please enter your email and password.'
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Login failed.'
        );
      }

      // User is no longer guest
      localStorage.removeItem('vyora_guest');

      // Save logged-in user
      localStorage.setItem(
        'vyora_user',
        JSON.stringify({
          user_id: data.user_id,
          name: data.name,
          email: data.email
        })
      );

      setSuccess(
        `Welcome back, ${data.name}! 🎬`
      );

      setTimeout(() => {

        onClose();

        resetForm();

        setShowAuthForm(false);

        window.location.reload();

      }, 1000);

    } catch (err) {

      console.error(
        'Login error:',
        err
      );

      setError(
        err.message ||
        'Something went wrong while signing in.'
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        backgroundColor: 'rgba(24, 13, 26, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-card)',
          border:
            '2px solid var(--accent-burnt-orange)',
          borderRadius: '4px',
          padding: '32px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        className="animate-fade-in"
      >

        {/* =====================================
            CLOSE BUTTON
        ====================================== */}

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>


        {/* =====================================
            AUTH CHOICE SCREEN
        ====================================== */}

        {!showAuthForm ? (

          <div style={{ textAlign: 'center' }}>

            {/* ICON */}

            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor:
                  'rgba(201, 87, 44, 0.1)',
                color:
                  'var(--accent-burnt-orange)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <Sparkles size={24} />
            </div>


            {/* TITLE */}

            <h3
              className="heading-editorial"
              style={{
                fontSize: '1.6rem',
                color: 'var(--text-charcoal)',
                marginBottom: '12px'
              }}
            >
              {title}
            </h3>


            {/* MESSAGE */}

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '24px'
              }}
            >
              {message}
            </p>


            {/* BUTTONS */}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >

              {/* SIGN IN */}

              <button
                onClick={openLogin}
                className="btn-cinematic-primary"
                style={{
                  width: '100%'
                }}
              >
                <User size={18} />

                <span>
                  SIGN IN
                </span>

              </button>


              {/* CREATE PROFILE */}

              <button
                onClick={openRegister}
                className="btn-cinematic-secondary"
                style={{
                  width: '100%'
                }}
              >
                <User size={18} />

                <span>
                  CREATE PROFILE
                </span>

              </button>


              {/* GUEST */}

              <button
                onClick={continueAsGuest}
                className="btn-cinematic-secondary"
                style={{
                  width: '100%',
                  border: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <span>
                  CONTINUE EXPLORING AS GUEST
                </span>
              </button>

            </div>

          </div>

        ) : (

          /* =====================================
             LOGIN / REGISTER FORM
          ====================================== */

          <div>

            {/* BACK */}

            <button
              onClick={() => {

                setShowAuthForm(false);

                resetForm();

              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              <ArrowLeft size={16} />

              Back
            </button>


            {/* HEADER */}

            <div
              style={{
                textAlign: 'center'
              }}
            >

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor:
                    'rgba(201, 87, 44, 0.1)',
                  color:
                    'var(--accent-burnt-orange)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin:
                    '0 auto 16px auto'
                }}
              >
                <User size={24} />
              </div>


              <h3
                className="heading-editorial"
                style={{
                  fontSize: '1.6rem',
                  color:
                    'var(--text-charcoal)',
                  marginBottom: '8px'
                }}
              >
                {mode === 'register'
                  ? 'CREATE YOUR VYORA PROFILE'
                  : 'WELCOME BACK'}
              </h3>


              <p
                style={{
                  color:
                    'var(--text-muted)',
                  fontSize: '0.9rem',
                  marginBottom: '24px'
                }}
              >
                {mode === 'register'
                  ? 'Save your vibe and build your movie universe.'
                  : 'Sign in to continue your cinematic journey.'}
              </p>

            </div>


            {/* =================================
                FORM
            ================================== */}

            <form
              onSubmit={
                mode === 'register'
                  ? handleRegister
                  : handleLogin
              }
            >

              {/* NAME */}

              {mode === 'register' && (

                <div
                  style={{
                    marginBottom: '14px'
                  }}
                >

                  <label
                    style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '0.8rem',
                      color:
                        'var(--text-muted)'
                    }}
                  >
                    NAME
                  </label>


                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border:
                        '1px solid var(--border-medium)',
                      padding: '10px 12px',
                      borderRadius: '3px'
                    }}
                  >

                    <User size={16} />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        background:
                          'transparent',
                        color:
                          'var(--text-charcoal)'
                      }}
                    />

                  </div>

                </div>

              )}


              {/* EMAIL */}

              <div
                style={{
                  marginBottom: '14px'
                }}
              >

                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.8rem',
                    color:
                      'var(--text-muted)'
                  }}
                >
                  EMAIL
                </label>


                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border:
                      '1px solid var(--border-medium)',
                    padding: '10px 12px',
                    borderRadius: '3px'
                  }}
                >

                  <Mail size={16} />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      background:
                        'transparent',
                      color:
                        'var(--text-charcoal)'
                    }}
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div
                style={{
                  marginBottom: '16px'
                }}
              >

                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.8rem',
                    color:
                      'var(--text-muted)'
                  }}
                >
                  PASSWORD
                </label>


                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border:
                      '1px solid var(--border-medium)',
                    padding: '10px 12px',
                    borderRadius: '3px'
                  }}
                >

                  <Lock size={16} />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      background:
                        'transparent',
                      color:
                        'var(--text-charcoal)'
                    }}
                  />

                </div>

              </div>


              {/* ERROR */}

              {error && (

                <div
                  style={{
                    padding: '10px',
                    marginBottom: '14px',
                    borderRadius: '3px',
                    backgroundColor:
                      'rgba(200, 50, 50, 0.1)',
                    color: '#d66',
                    fontSize: '0.85rem'
                  }}
                >
                  {error}
                </div>

              )}


              {/* SUCCESS */}

              {success && (

                <div
                  style={{
                    padding: '10px',
                    marginBottom: '14px',
                    borderRadius: '3px',
                    backgroundColor:
                      'rgba(70, 180, 100, 0.1)',
                    color: '#6c6',
                    fontSize: '0.85rem'
                  }}
                >
                  {success}
                </div>

              )}


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="btn-cinematic-primary"
                style={{
                  width: '100%',
                  opacity: loading
                    ? 0.7
                    : 1
                }}
              >

                {loading

                  ? 'PLEASE WAIT...'

                  : mode === 'register'

                    ? 'CREATE PROFILE'

                    : 'SIGN IN'

                }

              </button>

            </form>


            {/* =================================
                SWITCH LOGIN / REGISTER
            ================================== */}

            <div
              style={{
                textAlign: 'center',
                marginTop: '18px',
                fontSize: '0.85rem',
                color:
                  'var(--text-muted)'
              }}
            >

              {mode === 'register'
                ? 'Already have an account? '
                : "Don't have an account? "}


              <button
                onClick={() => {

                  setError('');
                  setSuccess('');

                  setMode(
                    mode === 'register'
                      ? 'login'
                      : 'register'
                  );

                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color:
                    'var(--accent-burnt-orange)',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >

                {mode === 'register'
                  ? 'SIGN IN'
                  : 'CREATE PROFILE'}

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}