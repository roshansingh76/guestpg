import { useState } from 'react';
import './App.css';

const WHATSAPP_NUMBER = '919999999999';
const WHATSAPP_MSG = encodeURIComponent('Hi! I want to book a PG stay.');

const rooms = [
  { id: 1, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', label: 'Deluxe Room', tag: 'Most Popular' },
  { id: 2, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', label: 'Standard Room', tag: '' },
  { id: 3, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', label: 'Premium Suite', tag: 'Premium' },
  { id: 4, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', label: 'Twin Sharing', tag: '' },
  { id: 5, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', label: 'Common Lounge', tag: '' },
  { id: 6, img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', label: 'Modern Kitchen', tag: '' },
];

const features = [
  { icon: '\u{1F9F9}', title: 'Spotless Rooms', desc: 'Deep-cleaned before every check-in. Fresh linen, sanitized bathrooms, zero compromise.', color: '#fff5f5' },
  { icon: '\u{1F4B0}', title: 'Honest Pricing', desc: 'What you see is what you pay. No surprise charges, ever.', color: '#f0fff4' },
  { icon: '\u{1F4CD}', title: 'Prime Location', desc: 'Minutes from metro, markets, and major offices. Everything within reach.', color: '#fffbf0' },
  { icon: '\u{1F550}', title: '24/7 Support', desc: 'Our team is always on call. Day or night, we have you covered.', color: '#f0f4ff' },
  { icon: '\u{1F4F6}', title: 'Fast Wi-Fi', desc: '100 Mbps broadband in every room. Stream, work, browse without limits.', color: '#fdf0ff' },
  { icon: '\u{1F512}', title: 'Safe & Secure', desc: 'CCTV, biometric entry, and on-site security for complete peace of mind.', color: '#fff0f5' },
];

const amenities = [
  { icon: '\u{1F6CF}\uFE0F', label: 'Furnished Rooms' },
  { icon: '\u2744\uFE0F', label: 'Air Conditioning' },
  { icon: '\u{1F4F6}', label: 'High-Speed Wi-Fi' },
  { icon: '\u{1F6BF}', label: 'Hot Water' },
  { icon: '\u{1F9BA}', label: 'Laundry Service' },
  { icon: '\u{1F37D}\uFE0F', label: 'Meals Available' },
  { icon: '\u{1F17F}\uFE0F', label: 'Parking Space' },
  { icon: '\u{1F4FA}', label: 'TV in Room' },
  { icon: '\u{1F50C}', label: 'Power Backup' },
  { icon: '\u{1F9F9}', label: 'Housekeeping' },
  { icon: '\u{1F512}', label: 'Locker Facility' },
  { icon: '\u{1F6AA}', label: 'Attached Bathroom' },
];

const rules = [
  { icon: '\u{1F559}', rule: 'Gate closes at 10:00 PM', color: '#fff5f5' },
  { icon: '\u{1F6AD}', rule: 'No smoking on premises', color: '#f0fff4' },
  { icon: '\u{1F37A}', rule: 'No alcohol allowed', color: '#fffbf0' },
  { icon: '\u{1F507}', rule: 'Quiet hours after 11 PM', color: '#f0f4ff' },
  { icon: '\u{1F91D}', rule: 'Visitors till 8:00 PM only', color: '#fdf0ff' },
  { icon: '\u{1F43E}', rule: 'No pets allowed', color: '#fff0f5' },
];

const testimonials = [
  { name: 'Rahul S.', city: 'Mumbai', rating: 5, text: 'Stayed for 2 days during my work trip. Room was spotless, Wi-Fi was fast and the staff was super helpful. Highly recommend!', stay: '2-day stay' },
  { name: 'Priya M.', city: 'Delhi', rating: 5, text: "Best short-stay PG I've found. Affordable, clean, and very safe for solo female travellers. Will definitely come back.", stay: '1-day stay' },
  { name: 'Arjun K.', city: 'Hyderabad', rating: 4, text: 'Great location, easy to book via WhatsApp. The room had everything I needed for a 1-night stay. Value for money.', stay: '1-day stay' },
];

const WaIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-logo">S</div>
        <span className="brand-name">StayEasy<span className="brand-pg"> PG</span></span>
      </div>
      <div className={`nav-links ${open ? 'nav-open' : ''}`}>
        <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
        <a href="#features" onClick={() => setOpen(false)}>Features</a>
        <a href="#amenities" onClick={() => setOpen(false)}>Amenities</a>
        <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} className="nav-cta" target="_blank" rel="noreferrer">
          <WaIcon size={15} /> Book Now
        </a>
      </div>
      <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge-wrap">
          <span className="hero-badge">&#11088; 4.8 Rating</span>
          <span className="hero-badge">&#9989; Instant Confirmation</span>
          <span className="hero-badge">&#127968; 500+ Happy Guests</span>
        </div>
        <h1>Your Home Away<br /><span className="hero-highlight">From Home</span></h1>
        <p>Short-term PG stays for 1-2 days. Clean rooms, prime location,<br />affordable prices — book in minutes via WhatsApp.</p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary btn-lg">Book Your Stay</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} className="btn-whatsapp btn-lg" target="_blank" rel="noreferrer">
            <WaIcon /> Chat on WhatsApp
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>500+</strong><span>Happy Guests</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>4.8&#9733;</strong><span>Avg Rating</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>&#8377;500</strong><span>Starting/Day</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>24/7</strong><span>Support</span></div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="scroll-dot" />
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Rooms</span>
          <h2>Spaces Designed for Comfort</h2>
          <p>Every room is thoughtfully furnished for a relaxing short stay.</p>
        </div>
        <div className="gallery-grid">
          {rooms.map((room, i) => (
            <div className={`gallery-card ${i === 0 ? 'gallery-featured' : ''}`} key={room.id}>
              <img src={room.img} alt={room.label} loading="lazy" />
              <div className="gallery-overlay">
                {room.tag && <span className="gallery-tag">{room.tag}</span>}
                <div className="gallery-label">{room.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section section-dark" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag section-tag-dark">Why Choose Us</span>
          <h2 style={{ color: '#fff' }}>Built Around Your Comfort</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>We sweat the small stuff so your stay feels effortless.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i} style={{ '--card-bg': f.color }}>
              <div className="feature-icon-wrap">
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section className="section" id="amenities">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Amenities</span>
          <h2>Everything Included, Nothing Extra</h2>
          <p>All amenities are bundled in your stay — no add-on charges.</p>
        </div>
        <div className="amenities-grid">
          {amenities.map((a, i) => (
            <div className="amenity-card" key={i}>
              <span className="amenity-icon">{a.icon}</span>
              <span className="amenity-label">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseRules() {
  return (
    <section className="section section-gray" id="rules">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">House Rules</span>
          <h2>A Few Simple Guidelines</h2>
          <p>Keeping these in mind ensures a great stay for everyone.</p>
        </div>
        <div className="rules-grid">
          {rules.map((r, i) => (
            <div className="rule-card" key={i} style={{ '--rule-bg': r.color }}>
              <div className="rule-icon-wrap">{r.icon}</div>
              <span className="rule-text">{r.rule}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Guest Reviews</span>
          <h2>Loved by Our Guests</h2>
          <p>Don't take our word for it — here's what real guests say.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="t-quote">"</div>
              <p className="t-text">{t.text}</p>
              <div className="t-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <div className="t-author">
                <div className="t-avatar">{t.name[0]}</div>
                <div className="t-info">
                  <strong>{t.name}</strong>
                  <span>{t.city} &middot; {t.stay}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <div className="cta-text">
          <h2>Ready to Book Your Stay?</h2>
          <p>Instant confirmation. No advance payment. Just show up and relax.</p>
        </div>
        <div className="cta-actions">
          <a href="#contact" className="btn-primary btn-lg">Book Now</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} className="btn-whatsapp btn-lg" target="_blank" rel="noreferrer">
            <WaIcon /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.uname.value;
    const phone = form.phone.value;
    const checkin = form.checkin.value;
    const message = form.message.value;
    const text = encodeURIComponent(`Hi! I'm ${name} (${phone}). Check-in: ${checkin}. ${message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    form.reset();
  }

  return (
    <section className="section section-gray" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Book Now</span>
          <h2>Reserve Your Stay Today</h2>
          <p>Fill in your details and we'll confirm your booking instantly.</p>
        </div>
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Quick Booking Form</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="uname">Full Name</label>
                <input id="uname" name="uname" type="text" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="checkin">Check-in Date</label>
              <input id="checkin" name="checkin" type="date" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Special Requests</label>
              <textarea id="message" name="message" rows="3" placeholder="e.g. 1 night, 2 persons, AC room preferred" />
            </div>
            <button type="submit" className="btn-primary btn-full">
              <WaIcon /> Confirm via WhatsApp
            </button>
            <p className="form-note">You'll be redirected to WhatsApp to confirm your booking.</p>
          </form>
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <div className="info-icon">&#128222;</div>
              <div><strong>Phone / WhatsApp</strong><p>+91 99999 99999</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">&#128231;</div>
              <div><strong>Email</strong><p>stay@stayeasypg.com</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">&#128205;</div>
              <div><strong>Address</strong><p>123, MG Road, Bangalore,<br />Karnataka - 560001</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">&#128336;</div>
              <div><strong>Check-in / Check-out</strong><p>Check-in: 12:00 PM<br />Check-out: 11:00 AM</p></div>
            </div>
            <div className="contact-map">
              <iframe
                title="StayEasy PG Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" height="200"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-brand" style={{ marginBottom: '14px' }}>
              <div className="brand-logo">S</div>
              <span className="brand-name" style={{ color: '#fff' }}>StayEasy<span className="brand-pg"> PG</span></span>
            </div>
            <p>Your trusted partner for comfortable short-term PG stays. Book for 1 or 2 days with instant confirmation.</p>
            <div className="footer-social">
              <a href="#!" aria-label="Instagram" className="social-btn">&#128248;</a>
              <a href="#!" aria-label="Facebook" className="social-btn">&#128077;</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="WhatsApp" className="social-btn" target="_blank" rel="noreferrer">&#128172;</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#gallery">Room Gallery</a>
            <a href="#features">Why Us</a>
            <a href="#amenities">Amenities</a>
            <a href="#rules">House Rules</a>
            <a href="#reviews">Guest Reviews</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>&#128222; +91 99999 99999</p>
            <p>&#128231; stay@stayeasypg.com</p>
            <p>&#128205; 123, MG Road, Bangalore</p>
            <p>&#128336; Check-in: 12 PM</p>
          </div>
          <div className="footer-col">
            <h4>Book Instantly</h4>
            <p style={{ marginBottom: '16px', fontSize: '13px' }}>Skip the form — chat directly on WhatsApp for instant booking.</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} className="footer-wa-btn" target="_blank" rel="noreferrer">
              <WaIcon /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&#169; 2026 StayEasy PG. All rights reserved. Made with &#10084;&#65039; for travellers.</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      className="whatsapp-fab"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WaIcon size={26} />
      <span>Book via WhatsApp</span>
    </a>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Gallery />
      <Features />
      <Amenities />
      <HouseRules />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

export default App;
