import React, { useEffect } from 'react';
import { X, Calendar, Phone, Mail, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function MobileNavModal({ isOpen, onClose, onBookClick, onOpenPolicy }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (anchorId) => {
    onClose();
    setTimeout(() => {
      if (anchorId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  const navLinks = [
    { label: 'Home (3D Experience)', id: 'top' },
    { label: 'Our Dental Services', id: 'content-section' },
    { label: 'Patient Reviews (4.9★)', id: 'testimonials-section' },
    { label: 'Meet Our Doctors', id: 'doctors-section' },
    { label: 'Why Choose Us (Safe Care)', id: 'why-choose-us' },
    { label: 'Clinical Spaces & Tech', id: 'gallery-section' },
    { label: 'Smile Transformation (Before/After)', id: 'before-after-section' },
    { label: 'Frequently Asked Questions', id: 'faq-section' },
    { label: 'Contact & Clinic Hours', id: 'contact-section' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="relative w-full max-w-sm h-full bg-[#090a0f] border-l border-white/10 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-wider text-white">
                DENTACARE
              </span>
              <span className="text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                Menu
              </span>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Booking CTA */}
          <div className="mb-5">
            <button
              onClick={() => {
                onClose();
                onBookClick();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Consultation</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Contact & Hours Info */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
          <div className="text-[11px] text-slate-400 space-y-1.5 font-light">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <a href="tel:+11234567890" className="hover:text-white transition-colors">+1 (123) 456-7890</a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>123 Smile Ave, Dental City, CA 90210</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500">
            <button 
              onClick={() => {
                onClose();
                onOpenPolicy('privacy');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                onClose();
                onOpenPolicy('disclaimer');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
