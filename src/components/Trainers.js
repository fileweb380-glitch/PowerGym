const trainers = [
  {
    image: "/african-male-fitness-trainer-in-gym-fitness-and-wellness-african-american-coach-healthy-lifestyle-photo.jpg",
    name: 'Kalid Mustefa',
    role: 'Head Strength Coach',
    bio: 'Elite powerlifting coach who competed nationally. Brings real competition experience and proven methods to every session.',
    years: '6+',
    clients: '27+',
    cert: 'NSCA',
    skills: ['Powerlifting', 'Strength', 'Deadlift', 'Squat'],
  },
  {
    image: "/hsbsbhpblijq6suauqrb.webp",
    name: 'Liemar Angel',
    role: 'Cardio & HIIT Specialist',
    bio: 'Passionate about transformation. Specializes in high-intensity interval training and fat-loss programs that deliver visible results fast.',
    years: '7+',
    clients: '20+',
    cert: 'ACE',
    skills: ['HIIT', 'Cardio', 'Fat Loss', 'Zumba'],
  },
  {
    image: "/hany-rambod_53f35ee7-94db-4d3b-a999-e1a87d93fa10.webp",
    name: 'Daniel Fernandez',
    role: 'Bodybuilding Coach',
    bio: 'Competitive bodybuilder with 8 years on stage and coaching. Expert in muscle hypertrophy, posing, and competition prep.',
    years: '8+',
    clients: '32+',
    cert: 'ISSA',
    skills: ['Bodybuilding', 'Hypertrophy', 'Posing', 'Nutrition'],
  },

   {
    image: "/OIP (2).webp",
    name: 'Golena Star',
    role: 'Yoga Instructor',
    bio: 'Helps members improve flexibility and mental wellness.',
    years: '4+',
    clients: '40+',
    cert: 'RYT',
    skills: ['Yoga', 'Flexibility'],
  },

  // NEW CARD 5
  {
    image: "/OIP (1).webp",
    name: 'Mianur Jacob',
    role: 'CrossFit Coach',
    bio: 'Specialist in endurance and functional training.',
    years: '8+',
    clients: '20+',
    cert: 'CrossFit L2',
    skills: ['CrossFit', 'Endurance'],
  },

  // NEW CARD 6
  {
    image: "/gym-workout-personal-trainer-with-clipboard-consulting-training-sports-gym-portrait-muscular-active-smiling-fitness-coach-writing-health-wellness-exercise-with-flare_590464-78703.avif",
    name: 'John Berbat',
    role: 'Efficiency',
    bio: 'Creates mind Efficiency and body Efficiency .',
    years: '4+',
    clients: '30+',
    cert: 'NASM',
    skills: ['Efficiency', 'to stay Focused'],
  },
]

function Trainers() {
  return (
    <section className="trainers" id="trainers">
      <div className="container">
        <h2 className="section-title">
          Meet Our <span className="orange">Trainers</span>
        </h2>

        <p className="section-sub">
          Expert coaches dedicated to your transformation
        </p>

        <div className="trainers-grid">
          {trainers.map((t, i) => (
            <div className="trainer-card" key={i}>

              {/* Trainer Photo */}
              <div className="trainer-image">
                <img src={t.image} alt={t.name} />
              </div>

              <div className="trainer-info">
                <h3>{t.name}</h3>

                <span className="trainer-role">{t.role}</span>

                <p>{t.bio}</p>

                <div className="trainer-stats">
                  <div><span>{t.years}</span>Years Exp.</div>
                  <div><span>{t.clients}</span>Clients</div>
                  <div><span>{t.cert}</span>Certified</div>
                </div>

                <div className="trainer-skills">
                  {t.skills.map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trainers;