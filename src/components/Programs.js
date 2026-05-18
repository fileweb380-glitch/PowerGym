const programs = [
  { icon: 'fas fa-fire',         title: 'Fat Loss',          desc: 'High-intensity cardio and strength training designed to burn fat and reveal your best physique.',     level: 'All Levels' },
  { icon: 'fas fa-arrow-up',     title: 'Muscle Gain',       desc: 'Progressive overload with expert nutrition guidance to build lean, powerful muscle mass.',            level: 'Intermediate+' },
  { icon: 'fas fa-heartbeat',    title: 'Cardio & Endurance',desc: 'Improve cardiovascular health, stamina, and overall athletic performance.',                          level: 'All Levels' },
  { icon: 'fas fa-user-tie',     title: 'Personal Training', desc: 'One-on-one sessions fully customized to your goals, schedule, and fitness level.',                   level: 'All Levels' },
  { icon: 'fas fa-users',        title: 'Group Classes',     desc: 'Energetic sessions including HIIT, yoga, kickboxing and more. Train together, grow together.',        level: 'All Levels' },
  { icon: 'fas fa-apple-alt',    title: 'Nutrition Plan',    desc: 'Custom meal plans by expert nutritionists to perfectly complement your training program.',            level: 'Add-on' },
]

function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="container">
        <h2 className="section-title">Our <span className="orange">Programs</span></h2>
        <p className="section-sub">Choose the program that matches your goal</p>
        <div className="programs-grid">
          {programs.map((p, i) => (
            <div className="program-card" key={i}>
              <i className={p.icon}></i>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="tag">{p.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs;