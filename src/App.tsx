import { useState, type FormEvent } from 'react';
import { HashRouter, Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const navigationItems = [
  { label: 'About', path: '/' },
  { label: 'Apps', path: '/apps' },
  { label: 'Restaurant Week', path: '/restaurantweek' },
  { label: 'Contact', path: '/contact' },
];

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        KD Designs
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            end={item.path === '/'}
            key={item.path}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <section className="contact-page" id="contact">
      <div className="contact-content">
        <div className="contact-copy">
          <h1>
            Let’s build
            <br />
            something that
            <br />
            <span>matters.</span>
          </h1>
          <p>
            I&apos;d love to hear from, partner with, and support non-profits and mission driven efforts,
            especially in healthcare, immigrants&apos; rights, and education.
          </p>
        </div>

        <div className="contact-card">
          {isSubmitted ? (
            <div className="contact-success" role="status">
              <h2>Message sent.</h2>
              <p>Thanks for reaching out. I’ll be in touch soon.</p>
              <button className="contact-reset" onClick={() => setIsSubmitted(false)} type="button">
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" required type="text" />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" required type="email" />

              <label htmlFor="organization">Organization</label>
              <input id="organization" name="organization" type="text" />

              <label htmlFor="mission">Tell me about your mission</label>
              <textarea id="mission" name="mission" required rows={4} />

              <button className="contact-submit" type="submit">
                Send message
              </button>

              <p className="contact-email">
                Prefer email? <a href="mailto:madebykddesigns@gmail.com">madebykddesigns@gmail.com</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="hero" id="top">
      <div className="portrait-frame">
        <img src="/Profile_Pic.jpg" alt="Katie smiling in front of the Chicago skyline" />
      </div>
      <h1>Hi, I’m Katie <span>:)</span></h1>
      <p className="role">Jelly-bean-powered indie app developer</p>
      <p className="intro">
        I build small, useful apps from my spare bedroom, solo with love (and too many jelly beans)
      </p>

      <div className="details-card">
        <div className="detail-item stacked-detail">
          <MapPin className="detail-icon location-icon" size={23} strokeWidth={1.8} />
          <strong>Chicago</strong>
        </div>
        <div className="detail-item stacked-detail">
          <div className="stat-number">3</div>
          <strong>Apps shipped</strong>
        </div>
        <Link className="detail-item email-detail" to="/contact">
          <Mail className="detail-icon email-icon" size={23} strokeWidth={1.8} />
          <strong>Say hi →</strong>
        </Link>
      </div>

      <Link className="primary-action" to="/apps">
        See my apps
      </Link>
    </section>
  );
}

function SimplePage({ title, description }: { title: string; description: string }) {
  return (
    <section className="simple-page">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

function App() {
  return (
    <HashRouter>
      <main className="site-shell">
        <SiteHeader />
        <Routes>
          <Route element={<AboutPage />} path="/" />
          <Route
            element={
              <SimplePage
                description="Small, useful apps made with care."
                title="Apps"
              />
            }
            path="/apps"
          />
          <Route
            element={
              <SimplePage
                description="A thoughtful guide to Chicago’s Restaurant Week."
                title="Restaurant Week"
              />
            }
            path="/restaurantweek"
          />
          <Route element={<ContactPage />} path="/contact" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
