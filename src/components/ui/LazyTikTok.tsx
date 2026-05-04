import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const LazyTikTok = ({ videoId }: { videoId: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !isLoaded && containerRef.current) {
      // Append the script
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      setIsLoaded(true);

      return () => {
        // We do not strictly remove the script to avoid breaking other embeds,
        // but typically TikTok handles multiple embeds with one script.
      };
    }
  }, [isInView, isLoaded]);

  return (
    <div ref={containerRef} className="tiktok-embed-container min-h-[580px] w-full flex items-center justify-center bg-surface-elevated/50 border border-border">
      {isInView ? (
        <blockquote
          className="tiktok-embed w-full m-0"
          cite={`https://www.tiktok.com/@creator/video/${videoId}`}
          data-video-id={videoId}
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section>
             <div className="flex flex-col items-center justify-center h-[580px] text-text-muted font-pixel text-sm">
                <span className="animate-pulse">Loading TikTok...</span>
             </div>
          </section>
        </blockquote>
      ) : (
        <div className="font-pixel text-sm text-text-subtle">
          Waiting for scroll...
        </div>
      )}
    </div>
  );
};
