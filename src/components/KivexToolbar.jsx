import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, X, ChevronDown, Check } from 'lucide-react';

export default function KivexToolbar({ 
  currentDevice, 
  onDeviceChange, 
  onClose,
  isCollapsed 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const devices = [
    { id: 'pc', label: 'PC', width: '1280px', icon: Monitor },
    { id: 'tablet', label: 'Tablet', width: '768px', icon: Tablet },
    { id: 'phone', label: 'Phone', width: '390px', icon: Smartphone },
    { id: 'fullscreen', label: 'Fullscreen', width: '100%', icon: Maximize2 },
  ];

  if (isCollapsed) return null;

  return (
    <header 
      className="w-full bg-[#F5EFE5] border-b border-[#e5dcd0] text-[#1e293b] px-3 sm:px-6 py-2.5 flex items-center justify-between z-50 shadow-sm relative transition-all duration-300"
      role="banner"
      aria-label="KIVEX Technology Preview Toolbar"
    >
      {/* =========================================================================
          PERMANENT KIVEX BRANDING (Single-line, direct on #F5EFE5 background)
          ========================================================================= */}
      <div className="flex items-center gap-2 select-none flex-shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span 
            className="font-extrabold text-[17px] sm:text-[20px] tracking-wide text-[#2D5FC7] leading-none uppercase font-sans"
            style={{ color: '#2D5FC7' }}
          >
            KIVEX
          </span>
          <span 
            className="font-semibold text-[13px] sm:text-[15px] tracking-normal text-[#E8B62A] leading-none font-sans"
            style={{ color: '#E8B62A' }}
          >
            Technology
          </span>
        </div>
      </div>

      {/* =========================================================================
          DEVICE VIEW CONTROLS (Desktop Viewport Selector)
          ========================================================================= */}
      <nav 
        className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-[#ebe3d6]/60 p-1 rounded-xl border border-[#ded4c3]"
        aria-label="Device Viewport Switcher"
      >
        {devices.map((device) => {
          const isActive = currentDevice === device.id;
          const Icon = device.icon;
          return (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device.id)}
              aria-pressed={isActive}
              aria-label={`Preview as ${device.label} (${device.width})`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#2D5FC7] focus-visible:outline-none ${
                isActive
                  ? 'bg-[#2D5FC7] text-white shadow-sm font-semibold'
                  : 'text-[#4b5563] hover:text-[#111827] hover:bg-[#f0e8dc]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#6b7280]'}`} />
              <span>{device.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#9ca3af]'}`}>
                {device.width}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile/Compact Device Selector Dropdown */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-label="Select device preview mode"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5FC7] text-white text-xs font-semibold shadow-sm focus-visible:ring-2 focus-visible:ring-[#2D5FC7] focus-visible:outline-none"
        >
          {React.createElement(devices.find(d => d.id === currentDevice)?.icon || Monitor, { className: "w-3.5 h-3.5 text-white" })}
          <span className="capitalize">{currentDevice}</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-white/80" />
        </button>

        {isDropdownOpen && (
          <div 
            className="absolute top-full mt-1.5 right-0 w-52 bg-[#F5EFE5] border border-[#d9cfbe] rounded-xl shadow-2xl p-2 z-50 text-slate-800 animate-in fade-in duration-150"
            role="listbox"
          >
            {/* Required by Section 12 & 13: Expanded interface MUST display KIVEX Technology */}
            <div className="px-2 py-1.5 mb-1 border-b border-[#e5dcd0] flex items-baseline gap-1 select-none">
              <span className="font-extrabold text-xs text-[#2D5FC7] tracking-wider uppercase">
                KIVEX
              </span>
              <span className="font-semibold text-[11px] text-[#E8B62A]">
                Technology
              </span>
            </div>

            {devices.map((device) => {
              const isActive = currentDevice === device.id;
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onDeviceChange(device.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                    isActive
                      ? 'bg-[#2D5FC7] text-white font-semibold'
                      : 'text-slate-700 hover:bg-[#eae3d5]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{device.label}</span>
                  </span>
                  <span className="text-[10px] opacity-75">{device.width}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          CROSS / CLOSE BUTTON (Mandatory: hides toolbar, never target-site button)
          ========================================================================= */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={onClose}
          aria-label="Hide preview toolbar"
          title="Hide toolbar (reopen anytime with floating KIVEX icon)"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4b5563] hover:text-[#111827] hover:bg-[#eae3d5] transition-colors focus-visible:ring-2 focus-visible:ring-[#2D5FC7] focus-visible:outline-none"
        >
          <span className="text-xl font-bold leading-none select-none">×</span>
        </button>
      </div>
    </header>
  );
}
