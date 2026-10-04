import React, { useState, useEffect } from 'react';
import { X, Check, User, Phone, Mail, Calendar, Clock, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Loading, 3: Confirmation
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Neha Sharma (Orthodontist)',
    service: 'Cosmetic Dentistry & Veneers',
    date: '2026-10-05',
    time: '10:00 AM - 11:00 AM'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full legal name (at least 2 characters).';
    }
    if (!formData.phone.trim() || !/^[0-9+() -]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid contact telephone number.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStep(2);

    // Simulate realistic asynchronous client triage simulation (600ms)
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      doctor: 'Dr. Neha Sharma (Orthodontist)',
      service: 'Cosmetic Dentistry & Veneers',
      date: '2026-10-05',
      time: '10:00 AM - 11:00 AM'
    });
    setErrors({});
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto glass-panel-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-900 border border-white/50">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Demo Notification Banner (Mandatory requirement per frontend-dental-ready) */}
        <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2 text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-tight">
            <span className="font-semibold uppercase tracking-wider text-[9px] text-amber-700 block">
              Demo Appointment Flow
            </span>
            <span className="text-amber-800 font-light">
              This showcase preview does not create a real clinical medical record or financial obligation.
            </span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <div className="mb-4 sm:mb-5 pr-6">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold block mb-0.5">
                EXPRESS BOOKING PREVIEW
              </span>
              <h3 id="booking-modal-title" className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                Reserve Your Smile Consultation
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Direct priority booking with board-certified dental specialists.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
              {/* Specialty & Doctor selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="service-select" className="text-xs font-semibold text-slate-700 block mb-1">
                    Select Specialty
                  </label>
                  <select 
                    id="service-select"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[38px]"
                  >
                    <option>Cosmetic Dentistry & Veneers</option>
                    <option>Preventive Dental Care & Cleaning</option>
                    <option>Dental Implants & Restoration</option>
                    <option>Clear Aligners & Orthodontics</option>
                    <option>Laser Teeth Whitening</option>
                    <option>Emergency Toothache Triage</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="doctor-select" className="text-xs font-semibold text-slate-700 block mb-1">
                    Preferred Doctor
                  </label>
                  <select 
                    id="doctor-select"
                    value={formData.doctor}
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[38px]"
                  >
                    <option>Dr. Neha Sharma (Orthodontist)</option>
                    <option>Dr. Amit Verma (Implant Specialist)</option>
                    <option>Dr. Pooja Mehta (Periodontist)</option>
                    <option>Dr. Rajat Malhotra (Cosmetic Dentist)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="date-input" className="text-xs font-semibold text-slate-700 block mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input 
                      id="date-input"
                      type="date" 
                      min="2026-10-01"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[38px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="time-select" className="text-xs font-semibold text-slate-700 block mb-1">
                    Time Slot
                  </label>
                  <select 
                    id="time-select"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[38px]"
                  >
                    <option>09:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>02:00 PM - 03:00 PM</option>
                    <option>04:30 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <label htmlFor="name-input" className="sr-only">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input 
                      id="name-input"
                      type="text" 
                      placeholder="Full Name (e.g., Jennifer Parker)" 
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) setErrors({...errors, name: null});
                      }}
                      className={`w-full bg-slate-100 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label htmlFor="phone-input" className="sr-only">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input 
                        id="phone-input"
                        type="tel" 
                        placeholder="Phone (e.g., +1 234 567 8900)" 
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({...formData, phone: e.target.value});
                          if (errors.phone) setErrors({...errors, phone: null});
                        }}
                        className={`w-full bg-slate-100 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email-input" className="sr-only">Email Address</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input 
                        id="email-input"
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if (errors.email) setErrors({...errors, email: null});
                        }}
                        className={`w-full bg-slate-100 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all duration-200 mt-2 hover:shadow-lg min-h-[44px] flex items-center justify-center gap-2"
              >
                Confirm Priority Appointment (Demo)
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="py-14 text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">
              Reserving Priority Consultation Slot...
            </h4>
            <p className="text-xs text-slate-500">
              Validating clinic calendar availability.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6 sm:py-7 space-y-3.5 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Appointment Slot Reserved!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your priority demo consultation for <span className="font-semibold text-slate-900">{formData.service}</span> with <span className="font-semibold text-slate-900">{formData.doctor}</span> has been confirmed for:
            </p>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-left space-y-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-medium">{formData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-medium">{formData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-medium">{formData.doctor}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Notice: This showcase does not create a real medical appointment or bill.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button 
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors min-h-[40px]"
              >
                Book Another Slot
              </button>
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors min-h-[40px]"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
