import React, { useState, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowRight,
  ShieldCheck, 
  Cpu, 
  UserCheck, 
  HeartHandshake, 
  Plus, 
  Minus,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function ContentSection({ onBookClick, onOpenPolicy = () => {} }) {
  // Testimonials state
  const testimonials = [
    {
      name: "Priya Sharma",
      time: "2 days ago",
      text: "The best dental care I've received in a professional and friendly environment. The braces process was so comfortable!",
      initials: "PS",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Amit Patel",
      time: "1 week ago",
      text: "Excellent service and state of the art facilities. The staff is amazing, kind, and explained every single step.",
      initials: "AP",
      color: "from-emerald-500 to-teal-500"
    },
    {
      name: "Neha Verma",
      time: "3 weeks ago",
      text: "Painless treatment and incredible results. Highly recommend Denta Care for smile design and cosmetic whitening!",
      initials: "NV",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Karan Joshi",
      time: "1 month ago",
      text: "Great team, modern tech, and a comfortable experience. My smile has never looked and felt better!",
      initials: "KJ",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "Riya Shah",
      time: "1 month ago",
      text: "Truly outstanding care from consultation to completion. Thank you, Denta Care, for the confidence boost.",
      initials: "RS",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Doctors data strictly matching Reference Image 4
  const doctors = [
    {
      name: "Dr. Neha Sharma",
      role: "Orthodontist",
      image: "/assets/doc/dr_neha_sharma_studio.jpg"
    },
    {
      name: "Dr. Amit Verma",
      role: "Implant Specialist",
      image: "/assets/doc/dr_amit_verma_studio.jpg"
    },
    {
      name: "Dr. Pooja Mehta",
      role: "Periodontist",
      image: "/assets/doc/dr_pooja_mehta_studio.jpg"
    },
    {
      name: "Dr. Rajat Malhotra",
      role: "Cosmetic Dentist",
      image: "/assets/doc/dr_rajat_malhotra_studio.jpg"
    }
  ];

  // Gallery images matching Reference Image 4
  const gallery = [
    { src: "/assets/Explore/e1.jpg", title: "Modern Operatory Suite" },
    { src: "/assets/Explore/e2.jpg", title: "Aesthetic Treatment Bay" },
    { src: "/assets/doc/dr_neha_sharma_studio.jpg", title: "Patient Consultation" },
    { src: "/assets/Explore/e3.jpg", title: "Advanced Clinical Dentistry" },
    { src: "/assets/Explore/e4.jpg", title: "Executive Recovery Lounge" },
    { src: "/assets/service section/01_dental_checkup_tools.png", title: "Sterilized Precision Tools" }
  ];

  // Before / After Slider position
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef(null);

  const handleTouchMove = (e) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const clampedX = Math.max(0, Math.min(rect.width, touchX - rect.left));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPos(percent);
  };

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How often should I visit the dentist?",
      a: "We recommend visiting every 6 months for routine cleaning, digital plaque evaluation, and comprehensive oral cancer screenings."
    },
    {
      q: "Are dental implants painful?",
      a: "No. Our guided computerized implant procedures are performed under targeted local anesthesia, ensuring virtually painless placement with rapid 24-48 hour recovery."
    },
    {
      q: "Do you accept insurance plans?",
      a: "Yes, we accept all major PPO insurance providers and offer transparent in-house financing with 0% interest flexible payment schedules."
    },
    {
      q: "How long does teeth whitening take?",
      a: "Our clinical in-office laser whitening treatment requires just one 45 to 60-minute session, lightening teeth by 6 to 8 shades instantly without sensitivity."
    },
    {
      q: "What if I have a dental emergency?",
      a: "We maintain 24/7 dedicated on-call clinical triage. Emergency cases including trauma, acute pain, or broken restorations receive same-day priority appointments."
    }
  ];

  return (
    <section id="content-section" className="relative bg-[#07080b] text-white overflow-hidden pt-12 sm:pt-20 pb-10 sm:pb-14">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[85vw] h-[350px] bg-cyan-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute top-[1400px] left-1/4 w-[500px] h-[400px] bg-indigo-500/4 blur-[120px] rounded-full"></div>
        <div className="absolute top-[2600px] right-1/4 w-[600px] h-[450px] bg-blue-500/4 blur-[130px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-20 sm:space-y-28 lg:space-y-36">

        {/* =========================================================================
            1. TESTIMONIALS & GOOGLE REVIEWS SECTION (Mobile touch carousel)
            ========================================================================= */}
        <div id="testimonials-section" className="space-y-6 sm:space-y-8 scroll-mt-24">
          {/* Top header row with Google Rating and Slider controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-mono block mb-1">
                PATIENT EXPERIENCES
              </span>
              <h2 className="text-lg sm:text-2xl font-light tracking-tight text-white">
                Loved by Our Patients
              </h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
              {/* Google Review Badge */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs">
                <span className="font-semibold text-white flex items-center gap-0.5">
                  <span className="text-blue-400">G</span>
                  <span className="text-red-400">o</span>
                  <span className="text-yellow-400">o</span>
                  <span className="text-blue-400">g</span>
                  <span className="text-green-400">l</span>
                  <span className="text-red-400">e</span>
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="text-slate-300 font-medium text-[11px] sm:text-xs">4.9 (1.8k+ Reviews)</span>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button 
                  onClick={prevTestimonial}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className={`glass-panel rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${
                  idx === activeTestimonialIdx ? 'ring-1 ring-cyan-400/50 bg-white/[0.08]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center text-xs font-semibold text-white`}>
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-white leading-tight">{t.name}</h3>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block">{t.time}</span>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed line-clamp-3 sm:line-clamp-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="flex text-amber-400 mt-3 pt-2.5 border-t border-white/5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-1">
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg px-2 py-1"
            >
              <span>View All Reviews on Google</span>
              <span className="text-[10px]">▾</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            2. MEET OUR DENTAL EXPERTS (Adaptive mobile grid)
            ========================================================================= */}
        <div id="doctors-section" className="space-y-6 sm:space-y-8 scroll-mt-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-mono block mb-1">
                CLINICAL LEADERSHIP
              </span>
              <h2 className="text-lg sm:text-2xl font-light tracking-tight text-white">
                Meet Our Dental Experts
              </h2>
            </div>
            <button 
              onClick={onBookClick}
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg px-2 py-1"
            >
              <span>View All Doctors</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Doctor Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {doctors.map((doc, idx) => (
              <div 
                key={idx}
                className="group glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1 flex flex-col"
              >
                {/* Doctor Studio Portrait */}
                <div className="relative aspect-[3.5/4] sm:aspect-[4/4.5] overflow-hidden bg-slate-900">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Doctor Bio Details */}
                <div className="p-3 sm:p-4 flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate group-hover:text-cyan-300 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-light truncate">
                      {doc.role}
                    </p>
                  </div>
                  <button 
                    onClick={onBookClick}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-slate-400 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                    aria-label={`Consult ${doc.name} for priority appointment`}
                  >
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            3. WHY CHOOSE US: SAFE CARE, EVERY TIME
            ========================================================================= */}
        <div id="why-choose-us" className="space-y-8 sm:space-y-12 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-semibold block mb-1 sm:mb-2">
              WHY CHOOSE US
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
              Safe Care, Every Time
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {/* Feature 1 */}
            <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 sm:mb-5">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-white mb-1.5">
                Advanced Technology
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                We use the latest digital scanning and 3D precision tools for gentle, predictable care.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 sm:mb-5">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-white mb-1.5">
                Hygiene Excellence
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                Hospital-grade sterilization following rigorous international patient safety benchmarks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 sm:mb-5">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-white mb-1.5">
                Expert Professionals
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                Board-certified specialists with over 15+ years of dedicated clinical mastery.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3 sm:mb-5">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-white mb-1.5">
                Patient-Focused Care
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                Compassionate bedside manner with bespoke treatments tailored to your lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. EXPLORE DENTACARE & BEFORE/AFTER INTERACTIVE SLIDER (Mobile touch enabled)
            ========================================================================= */}
        <div id="gallery-section" className="space-y-8 sm:space-y-10 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono block mb-1.5">
              OUR CLINICAL SPACES
            </span>
            <h2 className="text-xl sm:text-3xl font-light tracking-tight text-white">
              Explore DENTACARE
            </h2>
          </div>

          {/* 6-Photo Clinical Space Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
            {gallery.map((item, idx) => (
              <div 
                key={idx}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/10"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                  <span className="text-[10px] font-medium text-white leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Before & After Smile Transformation Studio */}
          <div id="before-after-section" className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/10 max-w-4xl mx-auto mt-6 sm:mt-10 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-cyan-400 font-mono font-medium block">
                  CLINICAL PROOF
                </span>
                <h3 className="text-base sm:text-xl font-light text-white">
                  Interactive Smile Restoration
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-light">
                Drag slider to inspect restoration
              </span>
            </div>

            {/* Slider Canvas Container with mobile touch gestures */}
            <div 
              ref={sliderContainerRef}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden select-none bg-slate-950 border border-white/10 shadow-2xl"
            >
              {/* After Image */}
              <img 
                src="/assets/befor and after/clean.png" 
                alt="After Dental Restoration" 
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-emerald-500/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-medium text-white tracking-wider">
                AFTER RESTORATION
              </div>

              {/* Before Image with clipPath */}
              <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  src="/assets/befor and after/dirty.png" 
                  alt="Before Dental Restoration" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-medium text-white tracking-wider border border-white/10">
                  INITIAL CONDITION
                </div>
              </div>

              {/* Slider Line & Thumb Handle */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs">
                  ↔
                </div>
              </div>

              {/* Native range slider */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos} 
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Teeth restoration slider comparison before and after"
                aria-valuenow={sliderPos}
                aria-valuemin="0"
                aria-valuemax="100"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none" 
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. FREQUENTLY ASKED QUESTIONS (Adaptive tap targets)
            ========================================================================= */}
        <div id="faq-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-6 border-t border-white/10 scroll-mt-24">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-mono block mb-1">
                CLARITY &amp; GUIDANCE
              </span>
              <h2 className="text-xl sm:text-3xl font-light tracking-tight text-white leading-tight">
                Frequently Asked <br className="hidden sm:block" />Questions
              </h2>
            </div>

            <button 
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass-panel hover:bg-white/10 text-xs text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <span>Ask Our Specialists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl overflow-hidden transition-colors border border-white/5 hover:border-white/15"
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-white min-h-[48px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  >
                    <span className="pr-2">{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-slate-400">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div 
                      id={`faq-answer-${idx}`}
                      role="region"
                      className="px-4 sm:px-6 pb-4 pt-1 text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed border-t border-white/5"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            6. HIGH-END LUXURY FOOTER (Mobile stacked)
            ========================================================================= */}
        <footer id="contact-section" className="pt-10 sm:pt-16 border-t border-white/10 space-y-10 sm:space-y-14 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <span className="text-sm sm:text-base font-semibold" aria-hidden="true">🦷</span>
                </div>
                <div>
                  <span className="text-sm sm:text-base font-semibold tracking-wider text-white block">
                    DENTACARE <span className="font-light text-cyan-400">Clinic</span>
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm font-light leading-relaxed">
                Your smile, our priority. Expert care for a healthier, happier you with state-of-the-art restorative, cosmetic, and 3D precision implant treatments.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2.5 pt-1">
                <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" aria-label="Follow DENTACARE on Facebook" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Follow DENTACARE on Instagram" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="Follow DENTACARE on Twitter" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="Connect with DENTACARE on LinkedIn" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors focus-visible:underline">Home (3D Studio)</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors focus-visible:underline">Services Overview</a></li>
                <li><a href="#doctors-section" className="hover:text-white transition-colors focus-visible:underline">Our Doctors</a></li>
                <li><a href="#testimonials-section" className="hover:text-white transition-colors focus-visible:underline">Patient Reviews</a></li>
                <li><a href="#before-after-section" className="hover:text-white transition-colors focus-visible:underline">Before &amp; After Studio</a></li>
                <li><a href="#faq-section" className="hover:text-white transition-colors focus-visible:underline">FAQs</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Specialized Treatments
              </h4>
              <ul className="space-y-2 text-xs text-slate-400 font-light">
                <li><a href="#content-section" className="hover:text-white transition-colors">Preventive Dental Care</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors">Cosmetic Veneers</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors">Dental Implants</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors">Laser Teeth Whitening</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors">Clear Aligners</a></li>
                <li><a href="#content-section" className="hover:text-white transition-colors">Emergency Triage</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Hours */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Clinic Location &amp; Hours
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>123 Smile Avenue, Dental City, CA 90210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <a href="tel:+11234567890" className="hover:text-white transition-colors">+1 (123) 456-7890</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <a href="mailto:info@dentacare.com" className="hover:text-white transition-colors">info@dentacare.com</a>
                </li>
                <li className="pt-2 border-t border-white/5">
                  <span className="font-medium text-slate-300 block mb-0.5">Working Hours</span>
                  <p className="text-[11px] text-slate-400">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-[11px] text-slate-500">Sunday: Emergency On-Call Only</p>
                  <p className="text-[11px] text-cyan-400 font-medium mt-0.5">Emergency Triage: 24/7 Available</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-slate-400 text-center sm:text-left">
            <p>© 2026 DENTACARE. All rights reserved. Public Clinic Showcase.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <button 
                type="button"
                onClick={() => onOpenPolicy('privacy')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Privacy Policy
              </button>
              <button 
                type="button"
                onClick={() => onOpenPolicy('terms')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Terms &amp; Conditions
              </button>
              <button 
                type="button"
                onClick={() => onOpenPolicy('disclaimer')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Medical Disclaimer
              </button>
              <button 
                type="button"
                onClick={() => onOpenPolicy('cookies')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Cookie Policy
              </button>
              <button 
                type="button"
                onClick={() => onOpenPolicy('appointment')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Appointment Policy
              </button>
              <button 
                type="button"
                onClick={() => onOpenPolicy('accessibility')}
                className="hover:text-cyan-300 transition-colors focus-visible:underline"
              >
                Accessibility
              </button>
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
