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

const realReviews = [
  {
    name: "Steven George",
    meta: "6 reviews · 1 photo · 7 months ago",
    review: "I worked with Anu for setting up my business license, and she was excellent. I needed a few things done expediently, and Anu and the team were super responsive throughout the whole process. I plan on using them for more visa and business services.",
    likes: "❤️ 1",
    owner_reply: "Thank you for your wonderful review! We’re glad to hear that Anu was able to assist you efficiently. We’ll be sure to share your feedback with the team."
  },
  {
    name: "Neha Panwar",
    meta: "2 reviews · 6 months ago",
    review: "I have been working with Anu, and she has been incredibly supportive and consistently proactive in her work and approach. I highly recommend AD Firm Business Services.",
    likes: "❤️ 2",
    owner_reply: "Thank you for your wonderful review! We’re glad to hear that Anu was able to assist you efficiently. We’ll be sure to share your feedback with the team."
  },
  {
    name: "Mukul Yadav",
    meta: "5 reviews · 3 photos · 9 months ago",
    review: "I had an excellent experience with AD Firms! A special thanks to Anu for her amazing support in making my visa process smooth and stress-free. She guided me at every step with great clarity and professionalism. Truly appreciate the help and highly recommend AD Firms for any documentation needs!",
    likes: "❤️ 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Midhun Baby",
    meta: "1 review · 9 months ago",
    review: "Professional team from UAE. Excellent service with affordable charges. I had a great experience with them, especially the great support from Ms. Anu. I strongly recommend this team for anyone looking for high-quality service in the UAE. Thank you, team!",
    likes: "❤️ 2",
    owner_reply: "Thank you for your wonderful review! We’re glad to hear that Anu was able to assist you efficiently. We’ll be sure to share your feedback with the team."
  },
  {
    name: "Nebil Kabeer",
    meta: "6 reviews · 2 years ago",
    review: "Very good experience. Excellent service — you guys did a great job.",
    likes: "❤️ 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Fatuma Hassan",
    meta: "2 reviews · 1 year ago",
    review: "AD Businessmen Services is fantastic to work with — professional, reliable, and always delivering top-notch results. Highly recommended for anyone looking for quality and efficiency!",
    likes: "❤️🙏 2",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Mohamed Nasith",
    meta: "1 review · 1 year ago",
    review: "We were very pleased with your service. I received my service much faster than expected. Very satisfying experience. Thank you very much, AD Businessmen Services ✨",
    likes: "❤️ 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Mizba Thabasum",
    meta: "1 review · 2 years ago",
    review: "Extremely good service... Loved it!",
    likes: "",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Baljit Kaur",
    meta: "1 review · 2 years ago",
    review: "Excellent and satisfying service at an affordable price. Fantastic service and supportive staff.",
    likes: "❤️ 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Sharoon Shanu",
    meta: "5 reviews · 2 years ago",
    review: "Excellent and satisfying services at affordable prices. Very professional team as well. Thank you for your support.",
    likes: "❤️ 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Kiran Raj",
    meta: "6 reviews · 2 years ago",
    review: "Thank you guys for the great service. Mr. Fahad was extremely helpful throughout the process. I coordinated with him for all the work. I will definitely refer all my friends to your business. Thank you again!",
    likes: "🙏 1",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  },
  {
    name: "Ashish",
    meta: "1 review · 2 years ago",
    review: "Fantastic service and supportive staff.",
    likes: "",
    owner_reply: "Thank you for your kind words! We’re glad you had a great experience with our team. Looking forward to assisting you again."
  }
];

export default function Home() {
  // Refs
  const formRef = useRef<HTMLDivElement>(null);
  const reviewsStripRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollTestimonials = (direction: "left" | "right") => {
    const el = testimonialsScrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // States
  const [fname, setFname] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [pkg, setPkg] = useState("");
  const [visas, setVisas] = useState("");
  const [activity, setActivity] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPkgIndex, setCurrentPkgIndex] = useState(1); // Default to Free Zone Plus (index 1) since it's most popular

  const packagesList = [
    {
      name: "Free Zone Starter",
      icon: "🚀",
      desc: "Perfect for freelancers, solo entrepreneurs, and first-time business owners looking for an affordable Dubai company setup solution.",
      benefits: [
        "UAE Free Zone Trade License",
        "100% Foreign Ownership",
        "Business Registration Support",
        "Flexi Desk Facility",
        "Corporate Tax Registration Assistance",
        "Dedicated Setup Consultant"
      ],
      priceOld: "AED 6,500",
      priceNew: "AED 4,888",
      featured: false,
    },
    {
      name: "Free Zone Plus",
      icon: "🌐",
      desc: "Designed for startups and growing businesses looking for fast and flexible company formation in Dubai with visa eligibility.",
      benefits: [
        "UAE Free Zone Trade License",
        "1 Investor / Residency Visa (2-Year Validity)",
        "Immigration & Establishment Card Processing",
        "Flexi Desk Facility",
        "Business Address Support",
        "Corporate Tax Registration Support",
        "Bank Account Assistance"
      ],
      priceOld: "AED 12,300",
      priceNew: "AED 10,800",
      featured: true,
    },
    {
      name: "Free Zone Premium",
      icon: "⭐",
      desc: "Ideal for entrepreneurs and companies requiring complete business setup support with advanced operational and banking assistance.",
      benefits: [
        "UAE Trade License",
        "Investor Visa Assistance",
        "Dedicated Business Address",
        "PRO & Government Liaison Support",
        "Corporate Bank Account Assistance",
        "Tax Registration Support",
        "Dedicated Account Manager"
      ],
      priceOld: "AED 18,900",
      priceNew: "AED 14,900",
      featured: false,
    },
    {
      name: "Mainland Business Setup Package",
      icon: "🏙️",
      desc: "Best suited for businesses planning to operate across Dubai and the UAE market without restrictions.",
      benefits: [
        "Commercial / Professional / Industrial License",
        "Company Registration & MOA Attestation Support",
        "Ejari / Tenancy Assistance",
        "1 Residency Visa Processing",
        "Immigration & Labour File Setup",
        "Corporate Tax Registration",
        "PRO & Government Approvals Support",
        "Dedicated Senior Business Setup Advisor"
      ],
      priceOld: "AED 24,500",
      priceNew: "AED 18,500",
      featured: false,
    },
    {
      name: "Offshore Company Package",
      icon: "🌍",
      desc: "Recommended for international business operations, global trading, and tax-efficient company structuring.",
      benefits: [
        "Offshore Company Incorporation",
        "Certificate of Incorporation",
        "MOA & AOA Preparation",
        "Registered Business Address",
        "Shareholder Documentation Support",
        "Dedicated Registered Agent",
        "International Business Structuring Assistance"
      ],
      priceOld: "AED 12,000",
      priceNew: "AED 8,500",
      featured: false,
    }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reviews dynamic horizontal ticker scroll with touch drag-to-pause
  const startInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const endInteraction = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000); // Resume auto scroll after 3 seconds of inactivity
  };

  useEffect(() => {
    const el = reviewsStripRef.current;
    if (!el) return;

    let animationFrameId: number;
    let speed = 0.8; // Butter-smooth sliding speed per frame ticker

    const autoScrollReviews = () => {
      if (!isUserInteracting) {
        el.scrollLeft += speed;

        // Seamless infinite loop trigger
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
          el.scrollLeft = el.scrollLeft - halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(autoScrollReviews);
    };

    animationFrameId = requestAnimationFrame(autoScrollReviews);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isUserInteracting]);

  // Lock body scroll when mobile modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Scroll handler
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Unified click handler to open mobile modal or scroll to desktop form
  const handleEnquireClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (window.innerWidth < 1024) {
      setIsModalOpen(true);
    } else {
      scrollToForm();
    }
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
      <div className={`topbar ${isScrolled ? "scrolled-hide" : ""}`}>
        🇦🇪 Launch your UAE business from <strong>AED 4,888</strong> — Expert advisors available now &nbsp;|&nbsp; 📞 Call us at <a href="tel:+91504486285" style={{ color: "var(--accent-lt)", fontWeight: "700" }}>+91 504 486 285</a>
      </div>

      {/* NAV */}
      <nav className={isScrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#" className="logo-container">
            <Image
              src="/black-logo.png"
              alt="Adfirms Logo"
              width={160}
              height={42}
              className="navbar-logo-img"
              priority
            />
          </a>

          {/* Desktop Navigation Menu */}
          <div className="nav-menu">
            <div className="nav-item">
              Free Zone <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Offshore <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Mainland <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Accounting <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Banks <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Services <span className="nav-item-caret">▼</span>
            </div>
            <div className="nav-item">
              Resources <span className="nav-item-caret">▼</span>
            </div>
          </div>

          {/* Desktop Navigation Right */}
          <div className="nav-right">
            <a href="tel:+91504486285" className="nav-phone-pill">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              +91 504 486 285
            </a>
            <div className="nav-flag-link">
              <span className="nav-flag">🇦🇪</span>
              <span>Careers</span>
            </div>
            <a href="#lead-form" onClick={handleEnquireClick} className="nav-login">
              Login
            </a>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="mobile-nav-controls">
            <button className="btn-mobile-quote" onClick={handleEnquireClick} suppressHydrationWarning>Get a Quote</button>
            <a href="tel:+91504486285" className="mobile-phone-icon">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
            <button className="mobile-hamburger" onClick={handleEnquireClick} suppressHydrationWarning>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          {/* Hero Left */}
          <div className="hero-left">
            <h1>#1 Business Setup Company in Dubai, UAE</h1>
            <p className="hero-sub">Launch Your Dubai Business in 24 Hours</p>

            {/* InZone custom price badge */}
            <div className="price-badge">
              <div className="price-badge-top">
                <span className="badge-starting">Starting from</span>
                <span className="badge-old-price">Dh 6,500</span>
              </div>
              <div className="price-badge-bottom">
                <span className="badge-currency">Dh</span>
                <span className="badge-new-price">4,888</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="hero-checklist">
              <div className="checklist-item">
                <span className="checklist-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Free zone & mainland setup
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Clear pricing & timelines
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Dedicated setup advisor
              </div>
              <div className="checklist-item">
                <span className="checklist-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Visa & digital banking support
              </div>
            </div>

            {/* Mobile View CTA Button */}
            <div className="hero-mobile-cta">
              <button className="submit-btn-pill" onClick={handleEnquireClick} suppressHydrationWarning>
                Enquire Now
              </button>
            </div>

            {/* Bottom Reviews strip */}
            <div 
              ref={reviewsStripRef}
              className="reviews-strip"
              onTouchStart={startInteraction}
              onTouchEnd={endInteraction}
              onMouseDown={startInteraction}
              onMouseUp={endInteraction}
            >
              {/* Set 1 */}
              <div className="review-item">
                <div className="review-logo google">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.72z" fill="#4285F4"/>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z" fill="#34A853"/>
                    <path d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.37-2.32V6.53H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.47l4.11-3.23z" fill="#FBBC05"/>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.53l4.11 3.23c.94-2.85 3.57-4.96 6.68-4.96z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="review-text">
                  <span className="review-title">3,000+ Reviews</span>
                  <span className="review-subtitle">
                    4.8/5 Rating
                    <span className="review-stars">★★★★★</span>
                  </span>
                </div>
              </div>

              <div className="review-item">
                <div className="review-logo orange-star">★</div>
                <div className="review-text">
                  <span className="review-title">600+ Reviews</span>
                  <span className="review-subtitle">
                    4.9/5 Rating
                    <span className="review-stars">★★★★★</span>
                  </span>
                </div>
              </div>

              <div className="review-item">
                <div className="review-logo green-star">★</div>
                <div className="review-text">
                  <span className="review-title">500+ Reviews</span>
                  <span className="review-subtitle">
                    4.7/5 Rating
                    <span className="review-stars green">★★★★★</span>
                  </span>
                </div>
              </div>

              {/* Set 2 (Duplicate for Seamless Infinite Marquee Loop) */}
              <div className="review-item duplicate-review">
                <div className="review-logo google">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.72z" fill="#4285F4"/>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z" fill="#34A853"/>
                    <path d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.37-2.32V6.53H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.47l4.11-3.23z" fill="#FBBC05"/>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.53l4.11 3.23c.94-2.85 3.57-4.96 6.68-4.96z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="review-text">
                  <span className="review-title">3,000+ Reviews</span>
                  <span className="review-subtitle">
                    4.8/5 Rating
                    <span className="review-stars">★★★★★</span>
                  </span>
                </div>
              </div>

              <div className="review-item duplicate-review">
                <div className="review-logo orange-star">★</div>
                <div className="review-text">
                  <span className="review-title">600+ Reviews</span>
                  <span className="review-subtitle">
                    4.9/5 Rating
                    <span className="review-stars">★★★★★</span>
                  </span>
                </div>
              </div>

              <div className="review-item duplicate-review">
                <div className="review-logo green-star">★</div>
                <div className="review-text">
                  <span className="review-title">500+ Reviews</span>
                  <span className="review-subtitle">
                    4.7/5 Rating
                    <span className="review-stars green">★★★★★</span>
                  </span>
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
                  <div className="fgrp">
                    <label htmlFor="fname">Full Name</label>
                    <input
                      type="text"
                      id="fname"
                      placeholder="Full name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="femail">Email Address</label>
                    <input
                      type="email"
                      id="femail"
                      placeholder="E-mail"
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
                      placeholder="+91 Your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp select-wrapper">
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
                    <label htmlFor="factivity">Your enquiry</label>
                    <textarea
                      id="factivity"
                      placeholder="Your enquiry"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="submit-btn" suppressHydrationWarning>
                    Get a Free Quote &rarr;
                  </button>
                  <div className="form-privacy">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    We will handle your personal data in compliance with our Privacy Policy.
                  </div>
                </form>
              ) : (
                <div className="form-success-state" style={{ display: "block" }}>
                  <div className="success-icon">✅</div>
                  <h3>We&apos;ve Got Your Details!</h3>
                  <p style={{ color: "#4a5568", fontSize: "14px", lineHeight: "1.6", margin: "8px 0 20px" }}>
                    Our setup advisor will call you within <strong>30 minutes</strong>. Look out for a WhatsApp message too.
                  </p>
                  <a href="https://wa.me/91504486285" className="wa-followup" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* PACKAGES */}
      <div className="packages-bg">
        <div className="section">
          <div className="sec-tag">Our Packages</div>
          <h2 className="sec-h2">Explore our Business Setup Dubai Packages</h2>
          <p className="sec-sub">Choose the right company formation package based on your business goals and operational requirements.</p>

          {/* Desktop view (hidden on mobile) */}
          <div className="desktop-packages-layout">
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
                <button className="pkg-cta" onClick={handleEnquireClick}>Enquire Now</button>
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
                <button className="pkg-cta" onClick={handleEnquireClick}>Enquire Now</button>
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
                <button className="pkg-cta" onClick={handleEnquireClick}>Enquire Now</button>
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
                <button className="pkg-cta" onClick={handleEnquireClick}>Enquire Now</button>
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
                <button className="pkg-cta" onClick={handleEnquireClick}>Enquire Now</button>
              </div>
            </div>
          </div>

          {/* Mobile view Carousel (hidden on desktop) */}
          <div className="mobile-packages-carousel">
            <div key={currentPkgIndex} className="pkg-card pkg-card-animate">
              {packagesList[currentPkgIndex].featured && <div className="pkg-popular">Most Popular</div>}
              
              {/* Left navigation arrow inside the card boundary */}
              <button 
                className="carousel-arrow-inside prev" 
                onClick={() => setCurrentPkgIndex((prev) => (prev === 0 ? packagesList.length - 1 : prev - 1))}
                aria-label="Previous Package"
                suppressHydrationWarning
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Right navigation arrow inside the card boundary */}
              <button 
                className="carousel-arrow-inside next" 
                onClick={() => setCurrentPkgIndex((prev) => (prev === packagesList.length - 1 ? 0 : prev + 1))}
                aria-label="Next Package"
                suppressHydrationWarning
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className="carousel-card-header">
                <div className="logo-main">
                  <span className="logo-chevron">&gt;&gt;</span>
                </div>
                <button className="btn-mobile-quote" onClick={handleEnquireClick} suppressHydrationWarning>Get a Quote</button>
              </div>
              
              <div className="pkg-name">
                {packagesList[currentPkgIndex].name}
              </div>
              
              <ul className="pkg-list">
                {packagesList[currentPkgIndex].benefits.map((benefit, bIdx) => (
                  <li key={bIdx}>
                    <span className="pkg-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="pkg-price-carousel">
                <span className="price-starting-label">Starting from</span>
                <span className="price-old-val">
                  {packagesList[currentPkgIndex].priceOld}
                </span>
                <span className="price-new-val">
                  {packagesList[currentPkgIndex].priceNew}
                </span>
              </div>
              
              <button 
                className="pkg-cta-mobile" 
                onClick={handleEnquireClick}
                suppressHydrationWarning
              >
                Enquire Now
              </button>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="carousel-dots">
              {packagesList.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${currentPkgIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentPkgIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CLIENT TESTIMONIALS */}
      <section className="section" style={{ paddingBottom: "80px" }}>
        <div className="sec-header-row">
          <div>
            <div className="sec-tag">Client Testimonials</div>
            <h2 className="sec-h2" style={{ marginBottom: "8px" }}>What Our Clients Say</h2>
            <p className="sec-sub" style={{ margin: "0", maxWidth: "600px" }}>
              Real reviews from real entrepreneurs who established their businesses in the UAE with Ad Firms.
            </p>
          </div>
          <div className="carousel-nav-btns">
            <button className="carousel-nav-btn prev" onClick={() => scrollTestimonials("left")} aria-label="Previous review" suppressHydrationWarning>
              ←
            </button>
            <button className="carousel-nav-btn next" onClick={() => scrollTestimonials("right")} aria-label="Next review" suppressHydrationWarning>
              →
            </button>
          </div>
        </div>

        <div className="testi-carousel-wrapper">
          <div className="testi-carousel" ref={testimonialsScrollRef}>
            {realReviews.map((item, idx) => (
              <a 
                key={idx} 
                href="https://www.google.com/search?client=ms-android-samsung-rvo1&sca_esv=4b1cc901675f4231&cs=1&hl=en-IN&sxsrf=ANbL-n6FfvuhNx1qF2JmgtPHuaLjG7YpBQ:1779993599977&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaT7B33ZQ1Qnbt7T2PN6GJj--OD3cfkGnvZKOUyc5tALt_ruf8LvHs-ans7-y_h4fHPvkwhHXXZSMXQ0vf7KQo_dju8O1vXs_B0W6hYfYOB2vnB0Zw%3D%3D&q=AD+Firms+Business+Services+Reviews&sa=X&ved=2ahUKEwifnerx0NyUAxXbYOsIHY4pAU8Q0bkNegQIIxAH&biw=1229&bih=584&dpr=1.56"
                target="_blank"
                rel="noopener noreferrer"
                className="testi-card"
              >
                <div className="testi-card-top">
                  <div className="testi-stars">★★★★★</div>
                  <div className="testi-name">{item.name}</div>
                  <div className="testi-meta">{item.meta}</div>
                  <p className="testi-quote">"{item.review}"</p>
                  
                  {item.owner_reply && (
                    <div className="testi-reply">
                      <strong>Response from the owner</strong>
                      <p>{item.owner_reply}</p>
                    </div>
                  )}
                </div>

                <div className="testi-google-badge">
                  <div className="google-icon-svg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.72z" fill="#4285F4"/>
                      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z" fill="#34A853"/>
                      <path d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.37-2.32V6.53H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.47l4.11-3.23z" fill="#FBBC05"/>
                      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.53l4.11 3.23c.94-2.85 3.57-4.96 6.68-4.96z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="google-badge-text">
                    <span className="line1">500+ Reviews</span>
                    <span className="line2">
                      4.7/5 Rating <span className="google-stars-small">★★★★★</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}

            {/* View All Verified Reviews Card */}
            <a 
              href="https://www.google.com/search?client=ms-android-samsung-rvo1&sca_esv=4b1cc901675f4231&cs=1&hl=en-IN&sxsrf=ANbL-n6FfvuhNx1qF2JmgtPHuaLjG7YpBQ:1779993599977&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaT7B33ZQ1Qnbt7T2PN6GJj--OD3cfkGnvZKOUyc5tALt_ruf8LvHs-ans7-y_h4fHPvkwhHXXZSMXQ0vf7KQo_dju8O1vXs_B0W6hYfYOB2vnB0Zw%3D%3D&q=AD+Firms+Business+Services+Reviews&sa=X&ved=2ahUKEwifnerx0NyUAxXbYOsIHY4pAU8Q0bkNegQIIxAH&biw=1229&bih=584&dpr=1.56" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="testi-card testi-card-viewall"
            >
              <div className="viewall-content">
                <div className="viewall-google-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.72z" fill="#4285F4"/>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z" fill="#34A853"/>
                    <path d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.37-2.32V6.53H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.47l4.11-3.23z" fill="#FBBC05"/>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.53l4.11 3.23c.94-2.85 3.57-4.96 6.68-4.96z" fill="#EA4335"/>
                  </svg>
                </div>
                <h3>View All Reviews</h3>
                <p>Read all 500+ verified customer reviews on Google Search</p>
                <div className="viewall-btn">
                  View All &rarr;
                </div>
              </div>
            </a>
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
              <button className="btn-primary" onClick={handleEnquireClick} suppressHydrationWarning>
                Enquire Now
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
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
                src="/assets/dubai_consultation.png"
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
              <button className="btn-outline-white" onClick={handleEnquireClick} suppressHydrationWarning>Get a Quote</button>
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
              <button className="btn-outline-white" onClick={handleEnquireClick} suppressHydrationWarning>Get a Quote</button>
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
              <button className="btn-outline-white" onClick={handleEnquireClick} suppressHydrationWarning>Get a Quote</button>
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
                <button className="faq-btn" onClick={() => toggleFaq(idx)} suppressHydrationWarning>
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
          <button className="btn-primary" onClick={handleEnquireClick} suppressHydrationWarning>
            Book Free Consultation
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <a href="https://wa.me/91504486285" className="btn-wa" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col-about">
            <a href="#" className="footer-logo">
              <Image
                src="/black-logo.png"
                alt="Ad Firms"
                width={220}
                height={58}
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9, width: "auto", height: "58px", display: "block" }}
              />
            </a>
            <p className="footer-desc">
              At Ad Firms, we assist global entrepreneurs and businesses with strategic company formation, licensing, residency, and banking solutions in Dubai and across the UAE.
            </p>
          </div>

          <div className="footer-col-links">
            <h4>Quick Links</h4>
            <ul className="footer-list-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#lead-form" onClick={handleEnquireClick}>Contact Us</a></li>
              <li><a href="#lead-form" onClick={handleEnquireClick}>Get a Free Quote</a></li>
            </ul>
          </div>

          <div className="footer-col-contact">
            <h4>Contact Info</h4>
            <div className="footer-contact-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="footer-contact-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.01-1.04.387-1.32l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <strong>Call Us</strong>
                <a href="tel:+91504486285">+91 504 486 285</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="footer-contact-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <strong>Email Us</strong>
                <a href="mailto:info@ad-firms.com">info@ad-firms.com</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="footer-contact-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div>
                <strong>Visit Us</strong>
                <span>Al Karama, Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-text">© 2026 Ad Firms – An Ideal Business Advisor. All rights reserved.</div>
        </div>
      </footer>

      {/* FLOATING WA BUTTON */}
      <a href="https://wa.me/91504486285" className="float-wa" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
      </a>

      {/* MOBILE POPUP MODAL */}
      {isModalOpen && (
        <div className="mobile-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close form" suppressHydrationWarning>
              ✕
            </button>
            
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
                  <div className="fgrp">
                    <label htmlFor="modal-fname">Full Name</label>
                    <input
                      type="text"
                      id="modal-fname"
                      placeholder="Full name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="modal-femail">Email Address</label>
                    <input
                      type="email"
                      id="modal-femail"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp">
                    <label htmlFor="modal-fphone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="modal-fphone"
                      placeholder="+91 Your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fgrp select-wrapper">
                    <label htmlFor="modal-fpkg">Enquiry For</label>
                    <select
                      id="modal-fpkg"
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
                    <label htmlFor="modal-factivity">Your enquiry</label>
                    <textarea
                      id="modal-factivity"
                      placeholder="Your enquiry"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="submit-btn" suppressHydrationWarning>
                    Get a Free Quote &rarr;
                  </button>
                  <div className="form-privacy">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    We will handle your personal data in compliance with our Privacy Policy.
                  </div>
                </form>
              ) : (
                <div className="form-success-state" style={{ display: "block" }}>
                  <div className="success-icon">✅</div>
                  <h3>We&apos;ve Got Your Details!</h3>
                  <p style={{ color: "#4a5568", fontSize: "14px", lineHeight: "1.6", margin: "8px 0 20px" }}>
                    Our setup advisor will call you within <strong>30 minutes</strong>. Look out for a WhatsApp message too.
                  </p>
                  <a href="https://wa.me/91504486285" className="wa-followup" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
