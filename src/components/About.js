 function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="/Add_Adjustable_Lighting.jpeg" alt="PowerGym" />
          </div>
          <div className="about-text">
            <h2>Our <span className="orange">Story</span></h2>
            <p>PowerGym was founded in 2010 with one mission: help every person unlock their true physical potential. What started as a small training space has grown into one of the most respected fitness centers in the region.</p>
            <p>We believe fitness is not just about the body — it is about discipline, mindset, and consistency. Our certified trainers, world-class equipment, and motivating community make PowerGym the ultimate destination.</p>
            <p>Whether you are a complete beginner or a seasoned athlete, we have the programs, the trainers, and the environment to take you to the next level.</p>
          </div>
        </div>
        <div className="pillars">
          <div className="pillar-card glass">
            <i className="fas fa-medal"></i>
            <h3>Quality</h3>
            <p>Top-of-the-line equipment and world-class facilities ensuring the best training experience possible.</p>
          </div>
          <div className="pillar-card glass">
            <i className="fas fa-dumbbell"></i>
            <h3>Experience</h3>
            <p>Over 15 years of fitness excellence with hundreds of transformation success stories from real members.</p>
          </div>
          <div className="pillar-card glass">
            <i className="fas fa-shield-alt"></i>
            <h3>Safety</h3>
            <p>Your safety is our top priority. All equipment is maintained daily and every trainer is fully certified.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;