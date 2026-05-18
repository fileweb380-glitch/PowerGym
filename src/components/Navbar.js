import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────

const styles = {

  // NAVBAR
  navbar: (scrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: '70px',
    padding: '0 2rem',

    fontFamily: "'Barlow', sans-serif",

    background: scrolled
      ? 'rgba(0,0,0,0.85)'
      : 'rgba(0,0,0,0.55)',

    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',

    borderBottom: '1px solid rgba(255,255,255,0.06)',

    boxShadow: scrolled
      ? '0 4px 30px rgba(0,0,0,0.5)'
      : 'none',

    transition: 'all 0.3s ease',
  }),

  // LOGO
  navLogo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.5rem',
    letterSpacing: '0.08em',
    color: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
    flexShrink: 0,
  },

  logoOrange: {
    color: '#ff6a00',
  },

  // CENTER LINKS
  navLinksWrapper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',

    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',

    borderRadius: '50px',
    padding: '0 0.5rem',

    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    gap: '0.15rem',
    margin: 0,
    padding: 0,
  },

  navLinkBtn: {
    background: 'none',
    border: 'none',

    color: 'rgba(255,255,255,0.78)',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 600,

    letterSpacing: '0.04em',
    textTransform: 'uppercase',

    padding: '0.55rem 1.1rem',
    borderRadius: '50px',

    cursor: 'pointer',
    height:'20px'
  },

  // RIGHT BUTTONS
  navRight: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    flexShrink: 0,
  },

  navRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },

  btnGhost: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.25)',

    color: 'rgba(255,255,255,0.85)',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,

    letterSpacing: '0.04em',

    padding: '0.45rem 1.1rem',
    borderRadius: '6px',

    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },

  btnApply: {
    background: '#ff6a00',
    border: 'none',

    color: '#fff',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,

    letterSpacing: '0.06em',
    textTransform: 'uppercase',

    padding: '0.5rem 1.25rem',
    borderRadius: '6px',

    cursor: 'pointer',

    boxShadow: '0 0 16px rgba(255,106,0,0.35)',
  },

  btnDashboard: {
    background: 'rgba(255,106,0,0.12)',
    border: '1px solid rgba(255,106,0,0.4)',

    color: '#ff6a00',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,

    padding: '0.45rem 1.1rem',
    borderRadius: '6px',

    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },

  btnLogout: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.18)',

    color: 'rgba(255,255,255,0.6)',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,

    padding: '0.45rem 1rem',
    borderRadius: '6px',

    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },

  // HAMBURGER
  hamburger: (open) => ({
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    gap: '5px',

    width: '40px',
    height: '40px',

    background: open
      ? 'rgba(255,106,0,0.15)'
      : 'rgba(255,255,255,0.07)',

    border: open
      ? '1px solid rgba(255,106,0,0.4)'
      : '1px solid rgba(255,255,255,0.12)',

    borderRadius: '8px',
 cursor: 'pointer',

    transition: 'all 0.3s ease',
  }),

  hamBar1: (open) => ({
    width: '20px',
    height: '2px',

    background: open ? '#ff6a00' : '#fff',

    borderRadius: '2px',

    transform: open
      ? 'translateY(7px) rotate(45deg)'
      : 'none',

    transition: 'all 0.3s ease',
  }),

  hamBar2: (open) => ({
    width: open ? '0' : '20px',
    height: '2px',

    background: open ? '#ff6a00' : '#fff',

    opacity: open ? 0 : 1,

    borderRadius: '2px',

    transition: 'all 0.3s ease',
  }),

  hamBar3: (open) => ({
    width: '20px',
    height: '2px',

    background: open ? '#ff6a00' : '#fff',

    borderRadius: '2px',

    transform: open
      ? 'translateY(-7px) rotate(-45deg)'
      : 'none',

    transition: 'all 0.3s ease',
  }),

  // MOBILE MENU
  mobileMenu: (open) => ({
    display: 'none',

    position: 'fixed',
    top: '54px',
    left: 0,
    right: 0,

    zIndex: 999,

    flexDirection: 'column',
    gap: '0.25rem',

    padding: '1.5rem 1.5rem 2rem',

    background: 'rgba(8,8,8,0.96)',

    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',

    borderBottom: '1px solid rgba(255,106,0,0.2)',

    opacity: open ? 1 : 0,

    transform: open
      ? 'translateY(0)'
      : 'translateY(-10px)',

    pointerEvents: open ? 'auto' : 'none',

    transition: 'all 0.3s ease',
  }),

  mobileNavLinks: {
    listStyle: 'none',

    display: 'flex',
    flexDirection: 'column',

    gap: '0.15rem',

    paddingBottom: '1rem',
    marginBottom: '1rem',

    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: 0,
  },

  mobileNavBtn: {
    background: 'none',
    border: 'none',

    color: 'rgba(255,255,255,0.8)',

    fontFamily: "'Barlow', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 600,

    letterSpacing: '0.05em',
    textTransform: 'uppercase',

    padding: '0.75rem 1rem',
    borderRadius: '8px',

    cursor: 'pointer',

    width: '100%',
    textAlign: 'left',
  },

  // MOBILE AUTH
  mobileAuth: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
    marginTop: '1rem',
  },

  mobileBtnBase: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
  },

  mobileBtnLogin: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
  },

  mobileBtnApply: {
    background: '#ff6a00',
    color: '#fff',
    boxShadow: '0 0 20px rgba(255,106,0,0.35)',
  },

  mobileBtnDashboard: {
    background: 'rgba(255,106,0,0.12)',
    border: '1px solid rgba(255,106,0,0.4)',
    color: '#ff6a00',
  },

  mobileBtnLogout: {
    background: 'rgba(255,80,80,0.1)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff6b6b',
  },
}

function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()

  const { user, logout } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  function handleLogout() {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  function scrollTo(sectionId) {

    setMenuOpen(false)

    if (location.pathname !== '/') {

      navigate('/')

      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 300)

    } else {

      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Trainers', id: 'trainers' },
  ]
 return (
    <>
      <style>{
       ` @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {

          .nav-links-wrapper {
            display: none !important;
          }

          .nav-right {
            display: none !important;
          }

          .hamburger {
            display: flex !important;
          }

          .mobile-menu {
            display: flex !important;
          }
        }`
      }</style>

      <nav style={styles.navbar(scrolled)}>

        <div
          style={styles.navLogo}
          onClick={() => navigate('/')}
        >
          POWER
          <span style={styles.logoOrange}>
            GYM
          </span>
        </div>

        <div
          className="nav-links-wrapper"
          style={styles.navLinksWrapper}
        >
          <ul style={styles.navLinks}>
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  style={styles.navLinkBtn}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-right" style={styles.navRight}>

          {user ? (

            <div style={styles.navRightGroup}>

              <button
                style={styles.btnDashboard}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>

              <button
                style={styles.btnLogout}
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          ) : (

            <div style={styles.navRightGroup}>

              <button
                style={styles.btnGhost}
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              <button
                style={styles.btnApply}
                onClick={() => navigate('/register')}
              >
                Apply Now
              </button>

            </div>
          )}
        </div>

        <button
          className="hamburger"
          style={styles.hamburger(menuOpen)}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span style={styles.hamBar1(menuOpen)} />
          <span style={styles.hamBar2(menuOpen)} />
          <span style={styles.hamBar3(menuOpen)} />
        </button>

      </nav>

      <div
        className="mobile-menu"
        style={styles.mobileMenu(menuOpen)}
      >

        <ul style={styles.mobileNavLinks}>

          {navLinks.map(link => (
            <li key={link.id}>
              <button
                style={styles.mobileNavBtn}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}

        </ul>

        <div style={styles.mobileAuth}>

          {user ? (
            <>
              <button
                style={{
                  ...styles.mobileBtnBase,
                  ...styles.mobileBtnDashboard
                }}
                onClick={() => {
                  navigate('/dashboard')
                  setMenuOpen(false)
                }}
              >
                Dashboard
              </button>

              <button className='Logout'
                style={{
                  ...styles.mobileBtnBase,
                  ...styles.mobileBtnLogout
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  ...styles.mobileBtnBase,
                  ...styles.mobileBtnLogin
                }}
                onClick={() => {
                  navigate('/login')
                  setMenuOpen(false)
                }}
              >
                Login
              </button>
            <button
                style={{
                  ...styles.mobileBtnBase,
                  ...styles.mobileBtnApply
                }}
                onClick={() => {
                  navigate('/register')
                  setMenuOpen(false)
                }}
              >
                Apply Now
              </button>
            </>
          )}

        </div>

      </div>
    </>
  )
}

export default Navbar