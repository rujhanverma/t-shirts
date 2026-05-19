import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Menu, X, ArrowRight, Star, Heart, Search,
  Truck, RotateCcw, Shield
} from 'lucide-react';

/* ── Inline brand icons (lucide-react v1 removed these) ── */
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/>
    <path d="M4 4h4l12 16h-4z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import './App.css';

/* ───────────── MOCK DATA ───────────── */
const PRODUCTS = [
  { id: 1, name: 'Classic White Essential', price: 1299, originalPrice: 1799, tag: 'Bestseller', colors: ['#ffffff', '#1a1a2e', '#7c6fff'], sizes: ['XS','S','M','L','XL'], rating: 4.9, reviews: 214, emoji: '🤍' },
  { id: 2, name: 'Midnight Oversized', price: 1499, originalPrice: 1999, tag: 'New', colors: ['#1a1a2e', '#5a5a7a', '#7c6fff'], sizes: ['S','M','L','XL','XXL'], rating: 4.8, reviews: 187, emoji: '🖤' },
  { id: 3, name: 'Lavender Dream Tee', price: 1399, originalPrice: null, tag: 'Trending', colors: ['#dddaf8', '#b8b5ee', '#ffffff'], sizes: ['XS','S','M','L'], rating: 4.7, reviews: 103, emoji: '💜' },
  { id: 4, name: 'Sunset Graphic Drop', price: 1599, originalPrice: 2099, tag: 'Limited', colors: ['#fef9e7', '#f5c842', '#ff8c69'], sizes: ['S','M','L','XL'], rating: 4.6, reviews: 95, emoji: '🧡' },
];

const REVIEWS = [
  { name: 'Aisha K.', avatar: '👩', rating: 5, text: 'Absolutely obsessed with the fabric quality. Softest tee I\'ve ever owned. Sized perfectly for an oversized fit!' },
  { name: 'Rohan M.', avatar: '👨', rating: 5, text: 'DEKIT is my go-to brand now. The Midnight Oversized is chef\'s kiss. Fast delivery too!' },
  { name: 'Priya S.', avatar: '🧑', rating: 4, text: 'Lavender Dream Tee is stunning in person. The colour is so soothing and the fit is clean.' },
];

/* ───────────── COMPONENTS ───────────── */
function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWished, setIsWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      {/* Product Image Placeholder */}
      <div className="product-img-wrap">
        <div className="product-img">
          <span className="product-emoji">{product.emoji}</span>
        </div>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={`wish-btn ${isWished ? 'wished' : ''}`}
          onClick={() => setIsWished(!isWished)}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isWished ? '#7c6fff' : 'none'} color={isWished ? '#7c6fff' : '#5a5a7a'} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={i < Math.floor(product.rating) ? '#f5c842' : 'none'} color="#f5c842" />
          ))}
          <span className="rating-text">{product.rating} ({product.reviews})</span>
        </div>

        {/* Colors */}
        <div className="product-colors">
          {product.colors.map(c => (
            <button
              key={c}
              className={`color-dot ${selectedColor === c ? 'active' : ''}`}
              style={{ background: c, border: c === '#ffffff' ? '1.5px solid #d0cfe8' : 'none' }}
              onClick={() => setSelectedColor(c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="product-sizes">
          {product.sizes.map(s => (
            <button
              key={s}
              className={`size-chip ${selectedSize === s ? 'active' : ''}`}
              onClick={() => setSelectedSize(s)}
            >{s}</button>
          ))}
        </div>

        {/* Price */}
        <div className="product-price-row">
          <span className="price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {product.originalPrice && (
            <span className="discount-badge">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <button className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`} onClick={handleAddToCart}>
          {addedToCart ? '✓ Added!' : <><ShoppingBag size={16} /> Add to Cart</>}
        </button>
      </div>
    </motion.div>
  );
}

/* ───────────── MAIN APP ───────────── */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Oversized', 'Classic Fit', 'Graphic', 'Premium'];

  return (
    <div className="app-container">

      {/* ── Promo Banner ── */}
      <div className="promo-banner">
        🚚 Free shipping on orders above ₹999 &nbsp;|&nbsp; Use code <strong>DEKIT20</strong> for 20% off
      </div>

      {/* ── Header ── */}
      <header className={`header glass ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <h1 className="brand-name">DEKIT</h1>
          <span className="brand-tagline">Premium Tees</span>
        </div>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#collections">Collections</a>
          <a href="#features">Why Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn clay" aria-label="Search"><Search size={18} /></button>
          <button className="icon-btn clay" aria-label="Wishlist"><Heart size={18} /></button>
          <button className="icon-btn clay cart-btn" aria-label="Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="icon-btn clay menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero" id="hero">
          <div className="hero-content">
            <motion.span
              className="hero-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✦ New Drop — Summer '26
            </motion.span>
            <motion.h2
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Tees Built for <br />the Fourth Dimension
            </motion.h2>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Premium quality tees crafted for comfort, style, and that effortless GenZ aesthetic. 100% cotton. Zero compromise.
            </motion.p>
            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <a href="#collections" className="clay-button cta-btn">
                Shop Now <ArrowRight size={18} />
              </a>
              <a href="#features" className="outline-btn">
                Learn More
              </a>
            </motion.div>
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="stat"><span className="stat-num">10K+</span><span className="stat-label">Happy Customers</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Avg Rating</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Designs</span></div>
            </motion.div>
          </div>

          <motion.div
            className="hero-3d-container clay animate-float"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          >
            <img src="/white_shirt.png" alt="DEKIT Premium White Shirt" style={{ width: '80%', height: 'auto', objectFit: 'contain' }} />
          </motion.div>
        </section>

        {/* ── Trust Badges ── */}
        <section className="trust-strip glass-card">
          {[
            { icon: <Truck size={22} />, title: 'Free Delivery', sub: 'On orders ₹999+' },
            { icon: <RotateCcw size={22} />, title: 'Easy Returns', sub: '15-day no-fuss returns' },
            { icon: <Shield size={22} />, title: 'Authentic Quality', sub: '100% premium cotton' },
            { icon: '⚡', title: 'Fast Dispatch', sub: 'Ships within 24 hours' },
          ].map((b, i) => (
            <motion.div key={i} className="trust-item"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="trust-icon">{typeof b.icon === 'string' ? b.icon : b.icon}</div>
              <div>
                <p className="trust-title">{b.title}</p>
                <p className="trust-sub">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ── Collections ── */}
        <section className="section collections-section" id="collections">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <span className="section-label">Our Range</span>
            <h2 className="section-title">Shop the Collection</h2>
            <p className="section-sub">Crafted for the streets, made for the soul.</p>
          </motion.div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>

          <div className="products-grid">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="center-btn">
            <button className="clay-button">View All Products <ArrowRight size={16} /></button>
          </div>
        </section>

        {/* ── Why DEKIT (Features) ── */}
        <section className="section features-section" id="features">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <span className="section-label">Why DEKIT?</span>
            <h2 className="section-title">Built Different</h2>
          </motion.div>
          <div className="feature-grid">
            {[
              { icon: '🧵', title: 'Premium Fabrics', desc: '180 GSM 100% ring-spun cotton. Soft, durable, and breathable for all-day comfort.' },
              { icon: '🎨', title: 'Unique Designs', desc: 'Every drop is limited. Our in-house design team crafts pieces that turn heads.' },
              { icon: '🌱', title: 'Sustainable Practices', desc: 'Eco-friendly dyes and ethical manufacturing. Fashion that gives back to the planet.' },
              { icon: '📐', title: 'Perfect Fit', desc: 'From XS to 5XL — structured sizes for every body. Classic, slim, or oversized.' },
              { icon: '🌐', title: '3D Preview', desc: 'See your tee in our immersive tesseract viewer before you buy. What you see is what you get.' },
              { icon: '⭐', title: '4.9★ Rated', desc: 'Over 10,000 happy customers and counting. Read their stories below.' },
            ].map((f, i) => (
              <motion.div key={i} className="feature-item"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="clay feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Size Guide ── */}
        <section className="section size-guide-section glass-card" id="size-guide">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <span className="section-label">Get the Right Fit</span>
            <h2 className="section-title">Size Guide</h2>
          </motion.div>
          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th><th>Shoulder (in)</th></tr>
              </thead>
              <tbody>
                {[
                  ['XS', '34–36', '27', '16'],
                  ['S', '36–38', '28', '17'],
                  ['M', '38–40', '29', '18'],
                  ['L', '40–42', '30', '19'],
                  ['XL', '42–44', '31', '20'],
                  ['XXL', '44–46', '32', '21'],
                ].map(([s, c, l, sh]) => (
                  <tr key={s}><td><strong>{s}</strong></td><td>{c}</td><td>{l}</td><td>{sh}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="size-tip">💡 Tip: For an oversized look, go one size up. For a fitted look, stay true to size.</p>
        </section>

        {/* ── Reviews ── */}
        <section className="section reviews-section" id="reviews">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <span className="section-label">Real People, Real Style</span>
            <h2 className="section-title">What They're Saying</h2>
          </motion.div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <motion.div key={i} className="review-card glass-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="review-stars">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={14} fill="#f5c842" color="#f5c842" />)}
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="reviewer">
                  <span className="reviewer-avatar">{r.avatar}</span>
                  <span className="reviewer-name">{r.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="section newsletter-section glass-card" id="newsletter">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            <span className="section-label">Stay in the Loop</span>
            <h2 className="section-title">Drop Alerts & Exclusive Deals</h2>
            <p className="section-sub">Join 10,000+ subscribers. No spam, only vibes.</p>
            {subscribed ? (
              <p className="subscribed-msg">🎉 You're in! Check your inbox for a welcome discount.</p>
            ) : (
              <form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="clay-button">Subscribe</button>
              </form>
            )}
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="brand-name">DEKIT</h2>
            <p className="footer-about">Premium tees for the modern generation. Designed in India. Loved worldwide.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><IconInstagram /></a>
              <a href="#" aria-label="Twitter"><IconTwitter /></a>
              <a href="#" aria-label="Facebook"><IconFacebook /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#">New Arrivals</a>
            <a href="#">Bestsellers</a>
            <a href="#">Oversized</a>
            <a href="#">Graphic Tees</a>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <a href="#">FAQ</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Returns & Exchange</a>
            <a href="#">Track Order</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Sustainability</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DEKIT. All rights reserved.</p>
          <p>Made with 💜 in India</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
