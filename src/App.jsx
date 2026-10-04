import React, { useState, useEffect } from 'react';
import DentalWebsite from './components/DentalWebsite';
import KivexPreviewWrapper from './components/KivexPreviewWrapper';

export default function App() {
  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isInsideIframe = window.self !== window.top;
      const isEmbedParam = params.has('preview_embed') || params.has('standalone');
      setIsEmbed(isInsideIframe || isEmbedParam);
    }
  }, []);

  // When embedded in preview iframe or standalone view, render the actual dental website
  if (isEmbed) {
    return <DentalWebsite />;
  }

  // At top-level application wrapper, render the KIVEX Technology preview toolbar environment
  return <KivexPreviewWrapper />;
}
