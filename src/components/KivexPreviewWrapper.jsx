import React, { useState, useEffect, useRef } from 'react';
import KivexToolbar from './KivexToolbar';
import { Eye, RotateCcw } from 'lucide-react';

export default function KivexPreviewWrapper() {
  const [device, setDevice] = useState('fullscreen'); // 'fullscreen' | 'pc' | 'tablet' | 'phone'
  const [isToolbarClosed, setIsToolbarClosed] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1920, height: 1080 });

  // Monitor preview workspace dimensions to center and visually adapt device frames
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [device, isToolbarClosed]);

  // Target website embedded URL
  const embedUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?preview_embed=1` 
    : '/?preview_embed=1';

  // Device configuration specs (real viewports matching specifications)
  const deviceConfigs = {
    phone: {
      width: 390,
      height: 844,
      frameRadius: '48px',
      bezelWidth: '10px',
      name: 'Phone (iPhone 14/15/16 Viewport)',
    },
    tablet: {
      width: 768,
      height: 1024,
      frameRadius: '32px',
      bezelWidth: '14px',
      name: 'Tablet (iPad Mini/Air 768px Viewport)',
    },
    pc: {
      width: 1280,
      height: 820,
      frameRadius: '14px',
      bezelWidth: '6px',
      name: 'PC Desktop (1280px Viewport)',
    },
    fullscreen: {
      width: '100%',
      height: '100%',
      name: 'Fullscreen Available Viewport',
    }
  };

  const currentConfig = deviceConfigs[device] || deviceConfigs.fullscreen;

  // Calculate visual frame scale if device frame exceeds container boundaries
  // (Maintains genuine iframe viewport dimensions while preventing viewport clipping)
  let frameScale = 1;
  if (device !== 'fullscreen') {
    const frameTotalWidth = currentConfig.width + (device === 'phone' ? 24 : device === 'tablet' ? 32 : 16);
    const frameTotalHeight = currentConfig.height + (device === 'pc' ? 44 : 28);
    const availableW = Math.max(300, containerDimensions.width - 32);
    const availableH = Math.max(300, containerDimensions.height - 32);

    const scaleX = availableW < frameTotalWidth ? availableW / frameTotalWidth : 1;
    const scaleY = availableH < frameTotalHeight ? availableH / frameTotalHeight : 1;
    frameScale = Math.min(1, scaleX, scaleY);
  }

  return (
    <div className="relative w-screen h-[100dvh] flex flex-col bg-[#0b0c10] overflow-hidden select-none">
      {/* =========================================================================
          1. PERMANENT KIVEX TECHNOLOGY TOOLBAR
          ========================================================================= */}
      <KivexToolbar
        currentDevice={device}
        onDeviceChange={(newDevice) => setDevice(newDevice)}
        onClose={() => setIsToolbarClosed(true)}
        isCollapsed={isToolbarClosed}
      />

      {/* =========================================================================
          2. PREVIEW WORKSPACE AREA
          ========================================================================= */}
      <main 
        ref={containerRef}
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-[#0d0f14]"
      >
        {/* Subtle grid pattern in workspace */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* FULLSCREEN MODE: Real 100% Viewport */}
        {device === 'fullscreen' ? (
          <div className="w-full h-full relative">
            <iframe
              key={`iframe-fullscreen-${iframeKey}`}
              src={embedUrl}
              title="KIVEX Dental Website Preview - Fullscreen"
              className="w-full h-full border-none bg-[#07080b]"
            />
          </div>
        ) : (
          /* DEVICE VIEWPORT MODE: Phone (390px) | Tablet (768px) | PC (1280px) */
          <div 
            className="flex flex-col items-center justify-center transition-transform duration-300"
            style={{
              transform: frameScale < 1 ? `scale(${frameScale})` : 'none',
              transformOrigin: 'center center'
            }}
          >
            {/* Device Info Badge */}
            <div className="mb-2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10 shadow-lg">
              <span className="font-semibold text-[#E8B62A]">KIVEX Preview:</span>
              <span className="text-white">{currentConfig.name}</span>
              <span className="text-slate-400">({currentConfig.width} × {currentConfig.height}px)</span>
              <button 
                onClick={() => setIframeKey(k => k + 1)}
                title="Reload preview frame"
                className="ml-1 p-0.5 hover:text-white transition-colors"
                aria-label="Reload preview frame"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* PC Monitor / Browser Frame */}
            {device === 'pc' && (
              <div 
                className="bg-[#181a20] rounded-xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col"
                style={{ width: `${currentConfig.width}px` }}
              >
                {/* Browser Top Bar */}
                <div className="h-8 bg-[#1f232b] px-3.5 flex items-center justify-between border-b border-white/10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#121418] text-[11px] text-slate-400 font-mono border border-white/5 w-64 max-w-full justify-center">
                    <span className="text-emerald-400 text-[10px]">🔒</span>
                    <span className="truncate">https://dentacare.com</span>
                  </div>
                  <div className="w-10"></div>
                </div>

                {/* PC Iframe Container */}
                <div style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}>
                  <iframe
                    key={`iframe-pc-${iframeKey}`}
                    src={embedUrl}
                    title="KIVEX Dental Website Preview - PC Desktop (1280px)"
                    style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}
                    className="border-none bg-[#07080b]"
                  />
                </div>
              </div>
            )}

            {/* Tablet Frame (768px Viewport) */}
            {device === 'tablet' && (
              <div 
                className="bg-[#181a20] rounded-[36px] p-3 border-4 border-[#2c313d] shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative"
                style={{ width: `${currentConfig.width + 24}px` }}
              >
                {/* Top Camera dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0c10] border border-white/10 mx-auto mb-2"></div>

                <div 
                  className="rounded-[24px] overflow-hidden bg-[#07080b]"
                  style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}
                >
                  <iframe
                    key={`iframe-tablet-${iframeKey}`}
                    src={embedUrl}
                    title="KIVEX Dental Website Preview - Tablet (768px)"
                    style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}
                    className="border-none bg-[#07080b]"
                  />
                </div>
              </div>
            )}

            {/* Phone Frame (390px Viewport) */}
            {device === 'phone' && (
              <div 
                className="bg-[#181a20] rounded-[48px] p-2.5 border-[3px] border-[#363c4a] shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative"
                style={{ width: `${currentConfig.width + 20}px` }}
              >
                {/* Dynamic Island / Front Speaker */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black border border-white/10 z-30 flex items-center justify-end pr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111319] border border-white/10"></div>
                </div>

                <div 
                  className="rounded-[40px] overflow-hidden bg-[#07080b]"
                  style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}
                >
                  <iframe
                    key={`iframe-phone-${iframeKey}`}
                    src={embedUrl}
                    title="KIVEX Dental Website Preview - Phone (390px)"
                    style={{ width: `${currentConfig.width}px`, height: `${currentConfig.height}px` }}
                    className="border-none bg-[#07080b]"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* =========================================================================
          3. FLOATING KIVEX REOPEN CONTROL (When toolbar is hidden via ×)
          ========================================================================= */}
      {isToolbarClosed && (
        <button
          onClick={() => setIsToolbarClosed(false)}
          aria-label="Reopen KIVEX Technology preview toolbar"
          title="Reopen KIVEX Technology preview toolbar"
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#F5EFE5] border border-[#d9cfbe] shadow-2xl flex items-center justify-center text-[#2D5FC7] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:ring-4 focus-visible:ring-[#2D5FC7]/40 focus-visible:outline-none"
        >
          <div className="flex flex-col items-center justify-center leading-none">
            <span className="font-extrabold text-sm tracking-tight text-[#2D5FC7] font-sans">
              K
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] mt-0.5"></span>
          </div>
        </button>
      )}
    </div>
  );
}
