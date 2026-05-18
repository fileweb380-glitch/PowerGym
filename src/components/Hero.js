function Hero() {
  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop >
        <source src="/video_2026-05-13_11-11-14.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-sub">Welcome to PowerGym</p>
        <h1 className="hero-title">PUSH YOUR <span className="orange">LIMITS</span></h1>
        <p className="hero-desc">
          Transform your body. Strengthen your mind.<br />
          Achieve what you never thought was possible.
        </p>
        <a href="/register" className="btn-main">
          <i className="fas fa-bolt"></i> Start Today
        </a>
      </div>
    </section>
  )
}

export default Hero;
