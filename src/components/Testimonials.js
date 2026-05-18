import { useState } from 'react'

const reviews = [
  { initial: 'M', name: 'Meron T.',  role: 'Fat Loss Member',       text: '"PowerGym changed my life. I lost 22kg in 5 months. The trainers are always supportive and knowledgeable."' },
  { initial: 'Y', name: 'Yonas K.',  role: 'Muscle Gain Member',    text: '"Daniel\'s coaching is world-class. I gained 9kg of lean muscle in 3 months. Unmatched program quality."' },
  { initial: 'H', name: 'Hana A.',   role: 'Group Classes Member',  text: '"Best gym in the city! Top quality equipment, friendly staff and incredibly fun group classes."' },
  { initial: 'B', name: 'Biruk M.',  role: 'Personal Training',     text: '"I was a complete beginner and felt welcomed from day one. I am stronger now than I have ever been in my life!"' },
]

function Testimonials() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c === 0 ? reviews.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === reviews.length - 1 ? 0 : c + 1))

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our <span className="orange">Members Say</span></h2>
        <p className="section-sub">Real results from real people</p>
        <div className="slider-outer">
          <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {reviews.map((r, i) => (
              <div className="slide" key={i}>
                <div className="testimonial-card glass">
                  <div className="stars">★★★★★</div>
                  <p>{r.text}</p>
                  <div className="client-info">
                    <div className="client-avatar">{r.initial}</div>
                    <div><strong>{r.name}</strong><small>{r.role}</small></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button onClick={prev}><i className="fas fa-chevron-left"></i></button>
            <div className="dots">
              {reviews.map((_, i) => (
                <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
              ))}
            </div>
            <button onClick={next}><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials;