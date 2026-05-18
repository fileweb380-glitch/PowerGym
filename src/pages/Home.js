import Navbar       from '../components/Navbar'
import Hero         from '../components/Hero'
import About        from '../components/About'
import Programs     from '../components/Programs'
import Trainers     from '../components/Trainers'
import Testimonials from '../components/Testimonials'
import Contact      from '../components/Contact'
import Pricing from '../components/Pricing'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Pricing/>
      <Programs />
      <Trainers />
      <Testimonials />
      <Contact />
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo">POWER<span className="orange">GYM</span></div>
              <p>Transform your body. Strengthen your mind. Achieve greatness.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#programs">Programs</a>
              <a href="#trainers">Trainers</a>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-tiktok"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 PowerGym. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home;