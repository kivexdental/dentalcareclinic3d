import React, { useState } from 'react';
import DentalExperience from './DentalExperience';
import ContentSection from './ContentSection';
import BookingModal from './BookingModal';
import MobileNavModal from './MobileNavModal';
import PolicyModal from './PolicyModal';

export default function DentalWebsite() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [policyState, setPolicyState] = useState({ isOpen: false, tab: 'privacy' });

  const handleOpenPolicy = (tab = 'privacy') => {
    setPolicyState({ isOpen: true, tab });
  };

  const handleClosePolicy = () => {
    setPolicyState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="min-h-screen bg-[#07080b] text-white selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Skip to Main Content Accessibility Link for Screen Readers & Keyboard */}
      <a 
        href="#content-section" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-xl focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* Pinned Cinematic GSAP Experience: Frame 0 (Hero) -> Frame 50 (Services) -> Frame 100 (About) */}
      <DentalExperience 
        onBookClick={() => setIsBookingOpen(true)} 
        onMenuClick={() => setIsMobileNavOpen(true)}
      />

      {/* Unpinned Continuous Content Section: Testimonials, Doctors, Safe Care, Gallery, FAQ & Footer */}
      <ContentSection 
        onBookClick={() => setIsBookingOpen(true)} 
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Express Demo Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavModal
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onBookClick={() => setIsBookingOpen(true)}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* WCAG & Legal Policies Modal */}
      <PolicyModal
        isOpen={policyState.isOpen}
        initialTab={policyState.tab}
        onClose={handleClosePolicy}
      />
    </main>
  );
}
