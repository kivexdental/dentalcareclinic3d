import React, { useEffect } from 'react';
import { X, Shield, FileText, AlertCircle, Cookie, CalendarClock, Eye } from 'lucide-react';

export default function PolicyModal({ isOpen, initialTab = 'privacy', onClose }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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

  const policies = {
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            At <strong className="text-white font-medium">DENTACARE</strong>, we value and respect your privacy. This Privacy Policy details how we handle information submitted through our public dental clinic website.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Information We Collect</h4>
          <p>
            Our public showcase provides a demonstration appointment request interface. We collect basic contact details (such as full name, telephone number, email address, preferred dental service, and preferred appointment slot) strictly for demonstrating scheduling inquiries.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">2. How We Use Information</h4>
          <p>
            Any submitted contact details are utilized solely to respond to patient inquiries, confirm demonstration requests, or facilitate dental clinic consultation bookings. We do not sell, rent, or trade your personal information to third parties.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">3. Data Security & Storage</h4>
          <p>
            We implement modern encryption and security safeguards to protect website traffic. Sensitive personal healthcare records are managed through our private, HIPAA-compliant on-premise clinical practice management software, never on public web servers.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">4. Your Rights & Inquiries</h4>
          <p>
            You may request information regarding your data or ask to remove your contact records from our inquiries database at any time by contacting our compliance coordinator at <span className="text-cyan-400">privacy@dentacare.com</span>.
          </p>
        </div>
      )
    },
    terms: {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: FileText,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            Welcome to the DENTACARE public web portal. By accessing or using this website, you agree to comply with and be bound by the following Terms and Conditions of use.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Use of Website Content</h4>
          <p>
            All information, educational dental graphics, 3D interactive representations, and clinic photography are proprietary property of DENTACARE and protected by international intellectual property laws.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">2. Demonstration Booking Interface</h4>
          <p>
            The online appointment booking tool provided on this website serves as an informational preview and request form. Actual clinical consultations are finalized upon direct communication with our front desk staff.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">3. Limitation of Liability</h4>
          <p>
            DENTACARE provides this website on an &ldquo;as is&rdquo; basis. We are not liable for incidental, indirect, or consequential damages resulting from website unavailability, browser discrepancies, or reliance on educational content.
          </p>
        </div>
      )
    },
    disclaimer: {
      id: 'disclaimer',
      title: 'Medical Disclaimer',
      icon: AlertCircle,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
            <strong>Important Notice:</strong> Website information does not replace in-person professional dental diagnosis.
          </div>
          <p>
            The educational content, interactive 3D visualizations, articles, and treatment descriptions on this website are intended solely for general patient education and informational purposes.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Not Medical or Dental Advice</h4>
          <p>
            Nothing on this website constitutes a formal dentist-patient relationship, dental examination, diagnosis, or personalized treatment plan. Always consult directly with a board-certified dentist or qualified medical professional regarding specific oral health symptoms or conditions.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">2. Emergency Dental Care</h4>
          <p>
            If you are experiencing severe oral hemorrhage, acute swelling affecting your airway, or sudden facial trauma, immediately call local emergency services (911 in the USA) or proceed to the nearest emergency hospital department.
          </p>
        </div>
      )
    },
    cookies: {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: Cookie,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            DENTACARE uses essential cookies and local storage tokens strictly necessary for the technical functionality and responsive rendering of our website preview application.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Strictly Essential Cookies</h4>
          <p>
            These technical cookies preserve UI states such as preview toolbar preferences, accessibility contrast settings, and form session continuity. They do not track individual identities across unrelated websites.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">2. Managing Preferences</h4>
          <p>
            You can configure your browser settings to reject non-essential cookies. Essential technical storage required for interactive 3D frame scrubbing may be affected if all storage mechanisms are disabled.
          </p>
        </div>
      )
    },
    appointment: {
      id: 'appointment',
      title: 'Appointment & Cancellation Policy',
      icon: CalendarClock,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            We strive to provide attentive, unhurried care. To ensure all patients have timely access to our clinical specialists, we observe the following scheduling guidelines.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Booking Confirmation</h4>
          <p>
            Submissions through our web interface represent appointment requests. Our concierge desk will contact you via telephone or email to confirm clinical availability and medical triage details.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">2. 24-Hour Notice for Rescheduling</h4>
          <p>
            If you must modify or reschedule your scheduled appointment, please notify our clinic at least 24 hours prior to your slot. This enables us to offer the reserved operatory bay to patients on our emergency waiting list.
          </p>
        </div>
      )
    },
    accessibility: {
      id: 'accessibility',
      title: 'Accessibility Statement',
      icon: Eye,
      updated: 'October 2026',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p>
            DENTACARE is committed to digital inclusion and ensuring that our website is fully accessible to all patients, including individuals with visual, motor, auditory, or cognitive disabilities, adhering to WCAG 2.2 Level AA guidelines.
          </p>
          <h4 className="text-white font-medium text-sm pt-2">1. Built-in Accessibility Features</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>High-contrast typography with clear semantic hierarchy (H1–H4).</li>
            <li>Keyboard navigation across all menus, interactive sliders, and dialogs.</li>
            <li>ARIA labels and roles for screen reader assistive technology.</li>
            <li>Respect for <code className="text-cyan-400">prefers-reduced-motion</code> operating system settings.</li>
            <li>Touch targets meeting or exceeding 44×44px standards.</li>
          </ul>
        </div>
      )
    }
  };

  const currentPolicy = policies[activeTab] || policies.privacy;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-dialog-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90dvh] flex flex-col glass-panel rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#090a0f]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              {React.createElement(currentPolicy.icon, { className: "w-4 h-4" })}
            </div>
            <div>
              <h3 id="policy-dialog-title" className="text-base sm:text-lg font-medium text-white tracking-tight">
                {currentPolicy.title}
              </h3>
              <span className="text-[10px] text-slate-400 block font-mono">
                Effective: {currentPolicy.updated}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Close legal policy modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-7 py-2.5 border-b border-white/10 overflow-x-auto no-scrollbar bg-black/40">
          {Object.values(policies).map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Policy Body */}
        <div className="p-5 sm:p-7 overflow-y-auto max-h-[60vh] space-y-4">
          {currentPolicy.content}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#090a0f]/80 flex items-center justify-between text-xs text-slate-400">
          <span>DENTACARE Public Compliance</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
