import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ChevronDown, 
  Clock, 
  X,
  Calendar,
  PlusCircle,
  Smile,
  CheckCircle,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3D Luminous Tooth Icon matching Image 2
function Tooth3DIcon({ className = "w-6 h-6 sm:w-7 sm:h-7" }) {
  return (
    <div aria-hidden="true" className={`relative ${className} flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] flex-shrink-0`}>
      <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="toothShine" cx="35%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f1f5f9" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path 
          d="M14 6C9 6 6 10 6 16C6 24 10 28 14 36C16 40 18 44 20 44C22 44 23 38 24 33C25 38 26 44 28 44C30 44 32 40 34 36C38 28 42 24 42 16C42 10 39 6 34 6C30 6 27 9 24 11C21 9 18 6 14 6Z" 
          fill="url(#toothShine)"
          filter="url(#softGlow)"
        />
        <path 
          d="M15 10C12 10 10 12 10 16C10 19 12 21 14 23" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          opacity="0.85" 
        />
        <circle cx="33" cy="14" r="2" fill="#ffffff" opacity="0.9" />
      </svg>
    </div>
  );
}

export default function DentalExperience({ onBookClick, onMenuClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const playheadRef = useRef({ frame: 0 });
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [currentFrameNum, setCurrentFrameNum] = useState(0);

  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:00 AM');
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [adDismissed, setAdDismissed] = useState(false);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '02:00 PM - 03:00 PM',
    '04:30 PM - 05:30 PM'
  ];

  // Helper to draw a specific frame on the high-DPI canvas with device-adaptive positioning
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Cap DPR at 2 to optimize mobile memory and battery performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    const isMobile = w < 1024;

    let drawW, drawH, drawX, drawY;

    if (isMobile) {
      // On mobile portrait, position denture prominently in the upper 48% of the viewport
      // so cards have dedicated readable space below without overlap
      const maxMobileW = w * 0.94;
      drawW = maxMobileW;
      drawH = drawW / imgRatio;
      drawX = (w - drawW) / 2;
      drawY = Math.max(55, h * 0.10);
    } else {
      // Desktop: Scale gracefully maintaining full widescreen presence
      if (canvasRatio > imgRatio) {
        drawH = h * 0.94;
        drawW = drawH * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      } else {
        drawW = w * 0.94;
        drawH = drawW / imgRatio;
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      }
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  };

  // Preload all 105 frames from /frames/frame_XXX.webp
  useEffect(() => {
    const totalFrames = 105;
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const padIndex = String(i).padStart(3, '0');
      img.src = `/frames/frame_${padIndex}.webp`;

      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          renderFrame(0);
        }
        if (loadedCount >= totalFrames) {
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    const handleResize = () => {
      renderFrame(Math.round(playheadRef.current.frame));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger timeline driving the canvas frames and responsive UI keyframes
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // =========================================================================
    // 1. DESKTOP SCREENS (> 1024px)
    // =========================================================================
    mm.add("(min-width: 1024px)", () => {
      const playhead = playheadRef.current;
      playhead.frame = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const currentFrame = Math.round(self.progress * 104);
            setCurrentFrameNum(currentFrame);
          }
        }
      });

      gsap.set(".hero-layer", { opacity: 1, pointerEvents: "auto" });
      gsap.set(".services-layer", { opacity: 0, x: 90, pointerEvents: "none" });
      gsap.set(".about-layer", { opacity: 0, x: 100, pointerEvents: "none" });

      // Frame Scrubber: 0 to 104
      tl.to(playhead, {
        frame: 104,
        snap: "frame",
        ease: "none",
        duration: 104,
        onUpdate: () => {
          const f = Math.min(104, Math.max(0, Math.round(playhead.frame)));
          renderFrame(f);
        }
      }, 0);

      // Hero -> Services
      tl.to(".hero-title", { y: -100, opacity: 0, duration: 25, ease: "power2.inOut" }, 2);
      tl.to(".hero-card-ad", { x: 90, opacity: 0, duration: 22, ease: "power2.inOut" }, 4);
      tl.to(".hero-card-booking", { x: 110, opacity: 0, duration: 25, ease: "power2.inOut" }, 6);
      tl.to(".header-stats", { opacity: 0.35, duration: 20, ease: "power1.out" }, 10);

      // Services enters and holds at Frame 50
      tl.to(".services-layer", { opacity: 1, x: 0, pointerEvents: "auto", duration: 15, ease: "power2.out" }, 35);

      // Services -> About
      tl.to(".services-layer", { opacity: 0, x: 80, pointerEvents: "none", duration: 18, ease: "power2.in" }, 62);

      // About enters and holds at Frame 100
      tl.to(".about-layer", { opacity: 1, x: 0, pointerEvents: "auto", duration: 18, ease: "power2.out" }, 82);
    });

    // =========================================================================
    // 2. MOBILE & TABLET SCREENS (<= 1023px) - RECOMPOSED ERGONOMIC FLOW
    // =========================================================================
    mm.add("(max-width: 1023px)", () => {
      const playhead = playheadRef.current;
      playhead.frame = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const currentFrame = Math.round(self.progress * 104);
            setCurrentFrameNum(currentFrame);
          }
        }
      });

      gsap.set(".hero-layer", { opacity: 1, pointerEvents: "auto" });
      gsap.set(".services-layer", { opacity: 0, y: 50, pointerEvents: "none" });
      gsap.set(".about-layer", { opacity: 0, y: 50, pointerEvents: "none" });

      // Frame Scrubber: 0 to 104
      tl.to(playhead, {
        frame: 104,
        snap: "frame",
        ease: "none",
        duration: 104,
        onUpdate: () => {
          const f = Math.min(104, Math.max(0, Math.round(playhead.frame)));
          renderFrame(f);
        }
      }, 0);

      // Mobile: Frame 0 -> Frame 50
      tl.to(".hero-layer", { opacity: 0, y: -40, pointerEvents: "none", duration: 25, ease: "power2.inOut" }, 5);
      tl.to(".services-layer", { opacity: 1, y: 0, pointerEvents: "auto", duration: 20, ease: "power2.out" }, 34);

      // Mobile: Frame 50 -> Frame 100
      tl.to(".services-layer", { opacity: 0, y: -30, pointerEvents: "none", duration: 18, ease: "power2.in" }, 64);
      tl.to(".about-layer", { opacity: 1, y: 0, pointerEvents: "auto", duration: 20, ease: "power2.out" }, 82);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-screen h-[100dvh] overflow-hidden bg-[#07080b] select-none touch-pan-y"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 carbon-dots opacity-40"></div>
        <div className="absolute inset-0 ambient-glow opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] ambient-glow-center pointer-events-none"></div>
      </div>

      {/* Atmospheric Top Header (Adaptive for mobile screens) */}
      <header className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-6 flex items-center justify-between pointer-events-auto">
        {/* Left: Trusted Patients Badge */}
        <div className="header-stats flex items-center gap-2 sm:gap-3">
          <div className="flex -space-x-1.5 sm:-space-x-2">
            <img 
              src="/assets/doc/dr_neha_sharma_studio.jpg" 
              alt="Patient" 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#090a0f] object-cover" 
            />
            <img 
              src="/assets/doc/dr_amit_verma_studio.jpg" 
              alt="Patient" 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#090a0f] object-cover" 
            />
            <img 
              src="/assets/doc/dr_pooja_mehta_studio.jpg" 
              alt="Patient" 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#090a0f] object-cover" 
            />
          </div>
          <div className="text-[10px] sm:text-xs leading-tight tracking-wide font-normal text-slate-300">
            <span className="block text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-wider">Trusted by</span>
            <span className="font-semibold text-white">10K+ Patients</span>
          </div>
        </div>

        {/* Center: DENTACARE Brand */}
        <div className="text-center">
          <span className="text-xs sm:text-sm tracking-[0.24em] sm:tracking-[0.28em] font-medium uppercase text-white/90">
            DENTACARE
          </span>
        </div>

        {/* Right: Working Hours & Menu button */}
        <div className="header-stats flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 tracking-wide">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mon - Sat 9:00 AM - 6:00 PM</span>
          </div>
          <button 
            onClick={onMenuClick}
            aria-label="Open mobile navigation menu"
            aria-haspopup="dialog"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            </span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          THE CANVAS STAGE: GSAP SCRUBBED REAL WEBP FRAMES (0 TO 104)
          ========================================================================= */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Subtle Frame Indicator Badge */}
      <div className="absolute top-16 sm:top-20 right-4 sm:right-12 z-30 pointer-events-none opacity-40">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
          FRAME {currentFrameNum} / 104
        </span>
      </div>

      {/* =========================================================================
          FRAME 0: HERO CONTENT LAYER (Responsive desktop + mobile layout)
          ========================================================================= */}
      <div className="hero-layer absolute inset-0 z-20 pointer-events-none flex flex-col justify-between px-4 sm:px-10 lg:px-20 pt-16 pb-6 sm:py-24">
        {/* Main Heading: Overlapping lower left on desktop, bottom anchored on mobile */}
        <div className="mt-auto mb-2 sm:mb-8 lg:mb-12 max-w-xl pointer-events-auto">
          <h1 className="hero-title font-light tracking-[-0.03em] text-white leading-[0.9] text-[34px] sm:text-[54px] md:text-[68px] lg:text-[88px] drop-shadow-md">
            Modern dental <br />
            <span className="font-light text-slate-100">solution</span>
          </h1>
        </div>

        {/* Right Floating Cards (Desktop: top-right column, Mobile: bottom-docked card) */}
        <div className="w-full lg:w-auto lg:absolute lg:right-12 xl:right-20 lg:top-28 xl:top-32 flex flex-col gap-3 sm:gap-4 items-center lg:items-end pointer-events-auto z-40 max-w-full sm:max-w-[340px] lg:max-w-[350px]">
          {/* Card 1: Dark Glass Advertisement Card (Hidden on ultra-small mobile if dismissed) */}
          {!adDismissed && (
            <div className="hero-card-ad hidden sm:block glass-panel rounded-2xl p-4 sm:p-5 w-full relative transition-all duration-300 hover:border-white/20">
              <div className="flex items-center justify-between mb-2 text-slate-400">
                <span className="text-[9px] tracking-widest font-mono uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  Ad
                </span>
                <button 
                  onClick={() => setAdDismissed(true)}
                  className="text-slate-400 hover:text-white transition-colors p-1 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg"
                  aria-label="Dismiss Ad"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h2 className="text-sm sm:text-base font-medium text-white mb-1 tracking-tight">
                Your Smile, Our Priority
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Experience the art of modern dentistry with personalized aesthetic precision.
              </p>
            </div>
          )}

          {/* Card 2: White Appointment Booking Card */}
          <div className="hero-card-booking glass-panel-white rounded-2xl p-4 sm:p-5 w-full text-slate-900 transition-transform duration-300 hover:scale-[1.01] shadow-xl">
            <div className="mb-3">
              <h2 className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900">
                Book An Appointment
              </h2>
              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-100">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                    Available Slots
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    Mon, 1 June
                  </span>
                </div>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* Time Slot Selector & Action */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <button 
                  type="button"
                  id="timeslot-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={isSlotOpen}
                  aria-label="Select appointment time slot"
                  onClick={() => setIsSlotOpen(!isSlotOpen)}
                  className="w-full bg-slate-100 hover:bg-slate-200/80 px-3 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-medium text-slate-800 flex items-center justify-between transition-colors min-h-[38px] focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  <span className="truncate">{selectedSlot}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500 ml-1 flex-shrink-0" />
                </button>

                {isSlotOpen && (
                  <div 
                    role="listbox"
                    aria-labelledby="timeslot-trigger"
                    className="absolute bottom-full mb-1.5 left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 py-1"
                  >
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        role="option"
                        aria-selected={selectedSlot === slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setIsSlotOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[11px] sm:text-xs transition-colors ${
                          selectedSlot === slot 
                            ? 'bg-slate-900 text-white font-medium' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Black Action Circle Button */}
              <button 
                onClick={onBookClick}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-white hover:bg-slate-800 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                aria-label="Confirm appointment"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FRAME 50: SERVICES LAYER (Adaptive responsive grid)
          ========================================================================= */}
      <div className="services-layer absolute inset-0 z-30 pointer-events-none flex items-end lg:items-center justify-center lg:justify-end px-3 sm:px-8 lg:px-16 pb-5 lg:pb-0">
        <div className="w-full lg:w-[60vw] max-w-4xl glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-9 pointer-events-auto max-h-[52vh] sm:max-h-[65vh] lg:max-h-none overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {/* Service 1 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Preventive Dental Care
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Routine check-ups and cleanings
              </p>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Cosmetic Dentistry
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Enhance your smile with cosmetic care
              </p>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Restorative Dentistry
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Restoring function and beauty
              </p>
            </div>

            {/* Service 4 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Restorative Care
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Repairing and restoring damaged teeth
              </p>
            </div>

            {/* Service 5 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Smile Design
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Advanced cosmetic teeth whitening
              </p>
            </div>

            {/* Service 6 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Tooth3DIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-snug mb-0.5">
                Specialized Care
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed hidden sm:block">
                Advanced care for unique dental needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FRAME 100: ABOUT LAYER (Mobile optimized layout & touch ergonomics)
          ========================================================================= */}
      <div className="about-layer absolute inset-0 z-30 pointer-events-none flex items-end lg:items-center justify-center lg:justify-end px-3 sm:px-8 lg:px-16 pb-5 lg:pb-0">
        <div className="w-full lg:w-[58vw] max-w-3xl glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 pointer-events-auto max-h-[55vh] sm:max-h-none overflow-y-auto">
          {/* Tag: ABOUT US */}
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.22em] font-medium text-slate-400 block mb-1 sm:mb-2">
            ABOUT US
          </span>

          {/* Heading */}
          <h2 className="text-lg sm:text-2xl lg:text-4xl font-light tracking-tight text-white mb-2 sm:mb-3 leading-snug">
            Care That Makes a Difference
          </h2>

          {/* Description */}
          <p className="text-[11px] sm:text-xs lg:text-sm text-slate-300 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
            At Denta, we combine expert skills, advanced technology and a compassionate approach to deliver personalized dental care. Your smile is our priority, and we&apos;re committed to crafting healthy, lasting smiles.
          </p>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 sm:pt-5 border-t border-white/10 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <PlusCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-xs sm:text-base font-semibold text-white block leading-tight">15+</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 block uppercase tracking-wider">Years Experience</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <Smile className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-xs sm:text-base font-semibold text-white block leading-tight">10K+</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 block uppercase tracking-wider">Happy Patients</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-xs sm:text-base font-semibold text-white block leading-tight">98%</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 block uppercase tracking-wider">Satisfaction</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-xs sm:text-base font-semibold text-white block leading-tight">50+</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 block uppercase tracking-wider">Treatments</span>
              </div>
            </div>
          </div>

          {/* CTA: Learn More */}
          <div>
            <button 
              onClick={() => {
                const el = document.getElementById('content-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] sm:text-xs text-white font-medium transition-all duration-300"
            >
              <span>Learn More About Us</span>
              <span className="w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center text-[10px]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex-col items-center gap-1 opacity-50">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">Scroll to scrub 3D dental model</span>
        <div className="w-3.5 h-6 rounded-full border border-white/20 flex justify-center p-0.5">
          <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
