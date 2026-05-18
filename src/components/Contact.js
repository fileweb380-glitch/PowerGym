import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 4000)
  }
  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Contact <span className="orange">Us</span></h2>
        <p className="section-sub">Have questions? We would love to hear from you.</p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-map-marker-alt"></i><div><h4>Location</h4><p>Bole Road, Addis Ababa, Ethiopia</p></div></div>
            <div className="contact-item"><i className="fas fa-phone"></i><div><h4>Phone</h4><p>+251 91 234 5678</p></div></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><div><h4>Email</h4><p>info@powergym.et</p></div></div>
            <div className="contact-item"><i className="fas fa-clock"></i><div><h4>Hours</h4><p>Mon–Sat: 6AM–10PM | Sunday: 8AM–6PM</p></div></div>
          </div>
          <form className="contact-form glass" onSubmit={handleSubmit}>
            {sent && <div className="success-msg">✓ Message sent! We will reply soon.</div>}
            <input type="text"  placeholder="Your Name"    required />
            <input type="email" placeholder="Your Email"   required />
            <input type="text"  placeholder="Subject"      required />
            <textarea rows="5"  placeholder="Your Message" required></textarea>
            <button type="submit" className="btn-main" style={{ width:'100%', justifyContent:'center' }}>
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Contact;