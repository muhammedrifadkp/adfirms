"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// StatCounter component to animate statistics count-up when visible in the viewport
function StatCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = 16;
          const steps = duration / stepTime;
          const stepVal = target / steps;
          const timer = setInterval(() => {
            start += stepVal;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [target, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="astat-num">
      {target > 50 ? Math.round(count) : count.toFixed(0)}
      {suffix}
    </div>
  );
}

export default function Home() {
  // Refs
  const formRef = useRef<HTMLDivElement>(null);

  // States
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState("");
  const [visas, setVisas] = useState("");
  const [activity, setActivity] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll handler
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fname || !email || !phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }
    // Future CRM/webhook integration:
    // fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({fname, lname, email, phone, pkg, visas, activity, timeline}) });
    setSubmitted(true);
  };

  // FAQ Toggle handler
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        🇦🇪 Launch your UAE business from <strong>AED 4,888</strong> — Expert advisors available now &nbsp;|&nbsp; 📞 Call us anytime
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <Image
              src="/black-logo.png"
              alt="Ad Firms"
              width={220}
              height={58}
              style={{ width: "auto", height: "58px", display: "block" }}
            />
            <span className="nav-logo-text" style={{ display: "none" }}>Ad Firms</span>
          </a>
          <div className="nav-right">
            <a href="tel:+971000000000" className="nav-phone">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +971 00 000 0000
            </a>
            <a href="https://wa.me/971000000000" className="btn-wa-sm" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              WhatsApp
            </a>
            <button className="btn-nav-cta" onClick={scrollToForm}>Get Quote</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          {/* Hero Left */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="live-dot"></span>
              24-Hour Company Formation Dubai
            </div>
            <h1>Launch Your <em>Dubai Business</em> in 24 Hours</h1>
            <p className="hero-sub">Complete company formation in Dubai Free Zone, Mainland or Offshore. 100% ownership, corporate bank account, and UAE residency visa support.</p>
            
            <div className="price-tag">
              <span className="price-from">Starting from</span>
              <span className="price-num">AED 4,888</span>
              <span className="price-unit">/ year</span>
            </div>

            <div className="hero-pills">
              <div className="hero-pill"><span className="hero-pill-icon">🏢</span> Free Zone & Mainland Setup</div>
              <div className="hero-pill"><span className="hero-pill-icon">💡</span> Transparent Pricing</div>
              <div className="hero-pill"><span className="hero-pill-icon">👤</span> Dedicated Consultant</div>
              <div className="hero-pill"><span className="hero-pill-icon">🛂</span> UAE Visa & Banking</div>
              <div className="hero-pill"><span className="hero-pill-icon">📄</span> End-to-End Documentation</div>
            </div>

            <div className="hero-ctas">
              <button className="btn-primary" onClick={scrollToForm}>
                Get Free Consultation
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <a href="https://wa.me/971000000000" className="btn-wa" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            <div className="trust-strip">
              <div className="trust-item-hero">
                <div>
                  <div className="tnum">6+</div>
                  <div className="tlab">Years Experience</div>
                </div>
              </div>
              <div className="trust-item-hero">
                <div>
                  <div className="tnum">500+</div>
                  <div className="tlab">Clients Served</div>
                </div>
              </div>
              <div className="trust-item-hero">
                <div>
                  <div className="tnum">100%</div>
                  <div className="tlab">Success Rate</div>
                </div>
              </div>
              <div className="trust-item-hero">
                <div>
                  <div className="tnum">24/7</div>
                  <div className="tlab">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="form-wrap" id="lead-form" ref={formRef}>
            <div className="form-card">
              <div className="form-head">
                <h2>Get a Call Back Shortly!</h2>
                <p>Fill in your details — our advisor responds within 30 mins</p>
              </div>
              <div className="form-urgency">
                ⏱ &nbsp;Limited consultation slots available today
              </div>

              {!submitted ? (
                <form className="form-body" onSubmit={handleFormSubmit}>
                  <div className="frow">
                    <div className="fgrp">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        placeholder="John"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="fgrp">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        placeholder="Smith"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="fgrp">
                    <label htmlFor="femail">Email Address</label>
                    <input
                      type="email"
                      id="femail"
                      placeholder="john@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="fphone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="fphone"
                      placeholder="+971 50 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="fpkg">Enquiry For</label>
                    <select
                      id="fpkg"
                      value={pkg}
                      onChange={(e) => setPkg(e.target.value)}
                    >
                      <option value="">Select a package...</option>
                      <option value="Free Zone Starter">Free Zone Starter</option>
                      <option value="Free Zone Plus">Free Zone Plus</option>
                      <option value="Free Zone Premium">Free Zone Premium</option>
                      <option value="Mainland Business Setup">Mainland Business Setup</option>
                      <option value="Offshore Company Package">Offshore Company Package</option>
                      <option value="Not sure – Need advice">Not sure – Need advice</option>
                    </select>
                  </div>
                  <div className="fgrp">
                    <label htmlFor="fvisas">Number of Visas Required</label>
                    <select
                      id="fvisas"
                      value={visas}
                      onChange={(e) => setVisas(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="0 Visa">0 Visa</option>
                      <option value="1 Visa">1 Visa</option>
                      <option value="2 Visas">2 Visas</option>
                      <option value="3 Visas">3 Visas</option>
                      <option value="4+ Visas">4+ Visas</option>
                    </select>
                  </div>
                  <div className="fgrp">
                    <label htmlFor="factivity">Business Activity</label>
                    <input
                      type="text"
                      id="factivity"
                      placeholder="e.g. Trading, Consulting, Technology"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="ftimeline">When are you looking to setup?</label>
                    <select
                      id="ftimeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    >
                      <option value="">Select timeline...</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within a month">Within a month</option>
                      <option value="After 1 month">After 1 month</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-btn">
                    Get Free Quote
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                  <div className="form-privacy">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    100% secure. Your data is never shared.
                  </div>
                </form>
              ) : (
                <div className="form-success-state" style={{ display: "block" }}>
                  <div className="success-icon">✅</div>
                  <h3>We&apos;ve Got Your Details!</h3>
                  <p>Our setup advisor will call you within <strong>30 minutes</strong>. Look out for a WhatsApp message too.</p>
                  <a href="https://wa.me/971000000000" className="wa-followup" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="tb-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Free Zone & Mainland Setup
          </div>
          <div className="tb-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Transparent Pricing & Fast Processing
          </div>
          <div className="tb-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Dedicated Business Setup Consultant
          </div>
          <div className="tb-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            UAE Visa & Banking Assistance
          </div>
          <div className="tb-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            End-to-End Documentation Support
          </div>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="packages-bg">
        <div className="section">
          <div className="sec-tag">Our Packages</div>
          <h2 className="sec-h2">Explore our Business Setup Dubai Packages</h2>
          <p className="sec-sub">Choose the right company formation package based on your business goals and operational requirements.</p>

          <div className="packages-grid">
            {/* Free Zone Starter */}
            <div className="pkg-card">
              <div className="pkg-icon">🚀</div>
              <div className="pkg-name">Free Zone Starter</div>
              <p className="pkg-desc">Perfect for freelancers, solo entrepreneurs, and first-time business owners looking for an affordable Dubai company setup solution.</p>
              <ul className="pkg-list">
                <li><span className="pkg-check">✓</span> UAE Free Zone Trade License</li>
                <li><span className="pkg-check">✓</span> 100% Foreign Ownership</li>
                <li><span className="pkg-check">✓</span> Business Registration Support</li>
                <li><span className="pkg-check">✓</span> Flexi Desk Facility</li>
                <li><span className="pkg-check">✓</span> Corporate Tax Registration Assistance</li>
                <li><span className="pkg-check">✓</span> Dedicated Setup Consultant</li>
              </ul>
              <div className="pkg-price">Starting From <strong>AED 4,888</strong></div>
              <button className="pkg-cta" onClick={scrollToForm}>Enquire Now</button>
            </div>

            {/* Free Zone Plus */}
            <div className="pkg-card featured">
              <div className="pkg-popular">Most Popular</div>
              <div className="pkg-icon">🌐</div>
              <div className="pkg-name">Free Zone Plus</div>
              <p className="pkg-desc">Designed for startups and growing businesses looking for fast and flexible company formation in Dubai with visa eligibility.</p>
              <ul className="pkg-list">
                <li><span className="pkg-check">✓</span> UAE Free Zone Trade License</li>
                <li><span className="pkg-check">✓</span> 1 Investor / Residency Visa (2-Year Validity)</li>
                <li><span className="pkg-check">✓</span> Immigration & Establishment Card Processing</li>
                <li><span className="pkg-check">✓</span> Flexi Desk Facility</li>
                <li><span className="pkg-check">✓</span> Business Address Support</li>
                <li><span className="pkg-check">✓</span> Corporate Tax Registration Support</li>
                <li><span className="pkg-check">✓</span> Bank Account Assistance</li>
              </ul>
              <div className="pkg-price">Starting From <strong>AED 11,500</strong></div>
              <button className="pkg-cta" onClick={scrollToForm}>Enquire Now</button>
            </div>

            {/* Free Zone Premium */}
            <div className="pkg-card">
              <div className="pkg-icon">⭐</div>
              <div className="pkg-name">Free Zone Premium</div>
              <p className="pkg-desc">Ideal for entrepreneurs and companies requiring complete business setup support with advanced operational and banking assistance.</p>
              <ul className="pkg-list">
                <li><span className="pkg-check">✓</span> UAE Trade License</li>
                <li><span className="pkg-check">✓</span> Investor Visa Assistance</li>
                <li><span className="pkg-check">✓</span> Dedicated Business Address</li>
                <li><span className="pkg-check">✓</span> PRO & Government Liaison Support</li>
                <li><span className="pkg-check">✓</span> Corporate Bank Account Assistance</li>
                <li><span className="pkg-check">✓</span> Tax Registration Support</li>
                <li><span className="pkg-check">✓</span> Dedicated Account Manager</li>
              </ul>
              <div className="pkg-price">Starting From <strong>AED 14,900</strong></div>
              <button className="pkg-cta" onClick={scrollToForm}>Enquire Now</button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="pkg-row2">
            {/* Mainland */}
            <div className="pkg-card">
              <div className="pkg-icon">🏙️</div>
              <div className="pkg-name">Mainland Business Setup Package</div>
              <p className="pkg-desc">Best suited for businesses planning to operate across Dubai and the UAE market without restrictions.</p>
              <ul className="pkg-list">
                <li><span className="pkg-check">✓</span> Commercial / Professional / Industrial License</li>
                <li><span className="pkg-check">✓</span> Company Registration & MOA Attestation Support</li>
                <li><span className="pkg-check">✓</span> Ejari / Tenancy Assistance</li>
                <li><span className="pkg-check">✓</span> 1 Residency Visa Processing</li>
                <li><span className="pkg-check">✓</span> Immigration & Labour File Setup</li>
                <li><span className="pkg-check">✓</span> Corporate Tax Registration</li>
                <li><span className="pkg-check">✓</span> PRO & Government Approvals Support</li>
                <li><span className="pkg-check">✓</span> Dedicated Senior Business Setup Advisor</li>
              </ul>
              <div className="pkg-price">Starting From <strong>AED 18,500</strong></div>
              <button className="pkg-cta" onClick={scrollToForm}>Enquire Now</button>
            </div>

            {/* Offshore */}
            <div className="pkg-card">
              <div className="pkg-icon">🌍</div>
              <div className="pkg-name">Offshore Company Package</div>
              <p className="pkg-desc">Recommended for international business operations, global trading, and tax-efficient company structuring.</p>
              <ul className="pkg-list">
                <li><span className="pkg-check">✓</span> Offshore Company Incorporation</li>
                <li><span className="pkg-check">✓</span> Certificate of Incorporation</li>
                <li><span className="pkg-check">✓</span> MOA & AOA Preparation</li>
                <li><span className="pkg-check">✓</span> Registered Business Address</li>
                <li><span className="pkg-check">✓</span> Shareholder Documentation Support</li>
                <li><span className="pkg-check">✓</span> Dedicated Registered Agent</li>
                <li><span className="pkg-check">✓</span> International Business Structuring Assistance</li>
              </ul>
              <div className="pkg-price">Starting From <strong>AED 8,500</strong></div>
              <button className="pkg-cta" onClick={scrollToForm}>Enquire Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* CLIENT TESTIMONIALS */}
      <section className="section">
        <div className="sec-tag">Client Testimonials</div>
        <h2 className="sec-h2">What Our Clients Say</h2>
        <p className="sec-sub">Trusted by entrepreneurs, investors, and startups across the globe for UAE business setup.</p>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">&quot;Setting up my consulting firm with Ad Firms was incredibly fast and smooth. Their advisor explained all Free Zone options clearly, helped open my corporate bank account, and got my license in under 24 hours. Highly recommended!&quot;</p>
            <div className="testi-author">
              <div className="testi-av">A</div>
              <div>
                <div className="testi-name">Amit Sharma</div>
                <div className="testi-location">Tech Consulting, India</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">&quot;Outstanding service from start to finish! The transparent pricing made planning easy, and the dedicated manager handled all visas and establishment card registrations without any delays. Dubai company setup was seamless.&quot;</p>
            <div className="testi-author">
              <div className="testi-av">B</div>
              <div>
                <div className="testi-name">Sarah Jenkins</div>
                <div className="testi-location">E-commerce, UK</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">&quot;I was unsure whether to go with Mainland or Free Zone, but Ad Firms guided me based on my market needs. Excellent support for corporate tax registration and tenancy contract processing. Extremely professional team.&quot;</p>
            <div className="testi-author">
              <div className="testi-av">C</div>
              <div>
                <div className="testi-name">Rahul Nair</div>
                <div className="testi-location">Trading House, UAE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNER / ABOUT */}
      <div style={{ background: "var(--grey-50)", borderTop: "1px solid var(--grey-100)", borderBottom: "1px solid var(--grey-100)" }}>
        <div className="section">
          <div className="about-grid">
            <div>
              <div className="sec-tag">Your Trusted Business Partner</div>
              <h2 className="sec-h2">At Ad Firms, We Make Your Dubai Setup Seamless</h2>
              <p style={{ fontSize: "15.5px", color: "var(--grey-500)", lineHeight: "1.8", marginBottom: "20px" }}>
                At Ad Firms, we help entrepreneurs, startups, and global investors establish their businesses in the UAE with strategic company formation solutions customized to their business goals. Our team works closely to structure your company from start to finish, whether you are planning a Free Zone setup, Mainland company registration, or Offshore incorporation.
              </p>
              <p style={{ fontSize: "15.5px", color: "var(--grey-500)", lineHeight: "1.8", marginBottom: "28px" }}>
                We ensure your Dubai company setup journey is smooth, compliant, and growth-focused — from selecting the right license to handling approvals, visas, and banking support.
              </p>
              <button className="btn-primary" onClick={scrollToForm}>
                Enquire Now
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <div className="about-stats">
                <div className="astat">
                  <StatCounter target={6} suffix="+" />
                  <div className="astat-label">Years Experience</div>
                </div>
                <div className="astat">
                  <StatCounter target={100} suffix="%" />
                  <div className="astat-label">Success Rate</div>
                </div>
                <div className="astat">
                  <StatCounter target={500} suffix="+" />
                  <div className="astat-label">Clients Served</div>
                </div>
                <div className="astat">
                  <StatCounter target={24} suffix="/7" />
                  <div className="astat-label">Support Available</div>
                </div>
              </div>
            </div>

            <div className="about-img" style={{ minHeight: "300px" }}>
              <Image
                src="/assets/dubai_office_setup.png"
                alt="Ad Firms Dubai Business Setup Advisor"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* TYPES OF SETUP */}
      <div className="types-bg">
        <div className="section">
          <div className="sec-tag" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>What We Offer</div>
          <h2 className="sec-h2" style={{ color: "var(--white)" }}>Types of Business Setup We Provide</h2>
          <p className="sec-sub" style={{ color: "rgba(255,255,255,0.55)" }}>Choose the right structure for your business goals — we handle the entire setup process.</p>

          <div className="types-grid">
            {/* Free Zone */}
            <div className="type-card">
              <div className="type-icon">🏢</div>
              <div className="type-name">Free Zone Business Setup</div>
              <p className="type-desc">Start your Dubai company setup with 100% foreign ownership, affordable licensing packages, tax advantages, and simplified setup procedures. Ideal for startups, freelancers, consultants, and international businesses.</p>
              <ul className="type-benefits">
                <li>100% ownership</li>
                <li>Low-cost setup packages</li>
                <li>Fast company registration</li>
                <li>Visa eligibility</li>
                <li>Flexible office solutions</li>
              </ul>
              <button className="btn-outline-white" onClick={scrollToForm}>Get a Quote</button>
            </div>

            {/* Mainland */}
            <div className="type-card">
              <div className="type-icon">🌆</div>
              <div className="type-name">Mainland Company Setup</div>
              <p className="type-desc">Operate freely across Dubai and the UAE with a Mainland business license. Perfect for companies targeting local UAE markets, government contracts, retail operations, and service businesses.</p>
              <ul className="type-benefits">
                <li>Trade anywhere in the UAE</li>
                <li>Unlimited business opportunities</li>
                <li>Multiple business activities</li>
                <li>Corporate bank account support</li>
                <li>Investor & employee visas</li>
              </ul>
              <button className="btn-outline-white" onClick={scrollToForm}>Get a Quote</button>
            </div>

            {/* Offshore */}
            <div className="type-card">
              <div className="type-icon">🌍</div>
              <div className="type-name">Offshore Company Setup</div>
              <p className="type-desc">Protect international assets and expand your business globally with a UAE offshore company structure designed for tax optimization and international business operations.</p>
              <ul className="type-benefits">
                <li>International business structuring</li>
                <li>Asset protection</li>
                <li>No physical office required</li>
                <li>Cost-effective incorporation</li>
                <li>High confidentiality</li>
              </ul>
              <button className="btn-outline-white" onClick={scrollToForm}>Get a Quote</button>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <section className="section">
        <div className="sec-tag">Why Dubai</div>
        <h2 className="sec-h2">Benefits of Setting Up a Business in Dubai</h2>
        <p className="sec-sub">Dubai offers unmatched advantages for global entrepreneurs and investors.</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🏛️</div>
            <div className="benefit-title">100% Foreign Ownership</div>
            <div className="benefit-text">Own your business outright in free zones with no local sponsor requirements.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌐</div>
            <div className="benefit-title">Strategic Global Location</div>
            <div className="benefit-text">Dubai connects Asia, Europe, and Africa — the ideal hub for global business.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <div className="benefit-title">Low Corporate Tax</div>
            <div className="benefit-text">Benefit from UAE&apos;s favorable tax environment with 0% personal income tax.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <div className="benefit-title">International Market Access</div>
            <div className="benefit-text">Reach global markets easily with UAE&apos;s extensive network of trade agreements.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛂</div>
            <div className="benefit-title">Easy Investor Visa</div>
            <div className="benefit-text">UAE residency visas available through eligible company formation packages.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏦</div>
            <div className="benefit-title">World-Class Banking</div>
            <div className="benefit-text">Access UAE&apos;s robust banking infrastructure with dedicated account opening support.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <div className="benefit-title">Fast Company Formation</div>
            <div className="benefit-text">Most setups completed within 24 hours — the fastest in the region.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🇮🇳</div>
            <div className="benefit-title">Strong Indian Community</div>
            <div className="benefit-text">Thrive within UAE&apos;s large, well-established Indian business community.</div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <div className="process-bg section-full">
        <div className="section-inner" style={{ padding: "72px 32px" }}>
          <div className="sec-tag">How It Works</div>
          <h2 className="sec-h2">Our Process for Business Setup in Dubai, UAE</h2>
          <p className="sec-sub">A clear, guided journey from first call to company launch.</p>
          <div className="process-steps" style={{ marginTop: "40px" }}>
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-title">Free Consultation</div>
              <div className="step-text">Our consultants understand your business goals and recommend the best setup structure for your requirements.</div>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-title">Company Structure Selection</div>
              <div className="step-text">Choose between Mainland, Free Zone, or Offshore company formation based on your operations and expansion plans.</div>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-title">Trade Name Reservation</div>
              <div className="step-text">We assist with business name approvals according to UAE regulatory requirements.</div>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>
              <div className="step-title">Documentation & Submission</div>
              <div className="step-text">Our team prepares and submits all legal documents and licensing applications on your behalf.</div>
            </div>
            <div className="step-card">
              <div className="step-number">05</div>
              <div className="step-title">Trade License Issuance</div>
              <div className="step-text">Receive your UAE trade license and officially launch your company.</div>
            </div>
            <div className="step-card">
              <div className="step-number">06</div>
              <div className="step-title">Visa & Banking Support</div>
              <div className="step-text">Get assistance with UAE residency visas and corporate bank account opening.</div>
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENTS */}
      <section className="section">
        <div className="sec-tag">Requirements</div>
        <h2 className="sec-h2">Documents Needed for Company Registration</h2>
        <p className="sec-sub">Simple documentation requirements — our team guides you through every step.</p>
        <div className="docs-grid">
          <div className="doc-box">
            <div className="doc-box-title"><span className="doc-box-icon">👤</span> For Individual Shareholders</div>
            <ul className="doc-list">
              <li>Passport Copy</li>
              <li>Passport Size Photo</li>
              <li>UAE Visa Copy (If Applicable)</li>
              <li>Emirates ID Copy (If Applicable)</li>
            </ul>
          </div>
          <div className="doc-box">
            <div className="doc-box-title"><span className="doc-box-icon">🏢</span> For Corporate Shareholders</div>
            <ul className="doc-list">
              <li>Certificate of Incorporation</li>
              <li>Memorandum of Association</li>
              <li>Board Resolution</li>
              <li>Shareholder Documents</li>
              <li>Corporate Registration Certificates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="faq-bg section-full">
        <div className="section-inner" style={{ padding: "72px 32px" }}>
          <div className="sec-tag">FAQs</div>
          <h2 className="sec-h2">Business Setup Dubai, UAE — Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              {
                q: "What is the cost of business setup in Dubai, UAE?",
                a: "The cost of setting up a business in Dubai depends on the type of business. We offer affordable startup packages customized for Indian entrepreneurs — starting from AED 4,888 for Free Zone setups. Contact us for a tailored quote based on your specific business activity and requirements.",
              },
              {
                q: "Which is better – Free Zone or Mainland company setup Dubai?",
                a: "Free Zones are perfect for startups, consultants, and international businesses seeking cost-effective solutions and 100% ownership. Mainland companies are suitable for businesses planning to operate directly within the UAE market, serving local clients, or bidding for government contracts.",
              },
              {
                q: "How long does company formation in Dubai take?",
                a: "Most business setups in Dubai can be completed within 24 hours to a few working days, depending on the chosen license and documentation readiness. Free Zone setups are generally faster than Mainland registrations.",
              },
              {
                q: "Do you provide banking assistance from Ad Firms?",
                a: "Yes. We assist with UAE corporate bank account opening and guide you through banking documentation requirements. Our advisors have strong relationships with UAE banks and know exactly what's needed for a smooth account opening process.",
              },
              {
                q: "Can I get UAE residency through a business setup?",
                a: "Yes. Business owners and investors can apply for UAE residency visas through eligible company formation packages. Our Free Zone Plus, Free Zone Premium, and Mainland packages all include residency visa processing support.",
              },
            ].map((item, idx) => (
              <div key={idx} className={`faq-item ${openFaqIndex === idx ? "open" : ""}`}>
                <button className="faq-btn" onClick={() => toggleFaq(idx)}>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-chevron">+</span>
                </button>
                <div className="faq-ans" style={{ maxHeight: openFaqIndex === idx ? "240px" : "0px", paddingBottom: openFaqIndex === idx ? "18px" : "0px" }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="cta-section">
        <h2>Ready to Start Your Business in Dubai?</h2>
        <p>Speak with our UAE business setup specialists today and get personalized guidance for your company formation journey.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={scrollToForm}>
            Book Free Consultation
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <a href="https://wa.me/971000000000" className="btn-wa" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="footer-logo">
            <Image
              src="/black-logo.png"
              alt="Ad Firms"
              width={230}
              height={64}
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9, width: "auto", height: "64px" }}
            />
            <span className="nav-logo-text" style={{ display: "none" }}>Ad Firms</span>
          </a>
          <div className="footer-text">© 2025 Ad Firms – An Ideal Business Advisor. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WA BUTTON */}
      <a href="https://wa.me/971000000000" className="float-wa" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
      </a>
    </>
  );
}
