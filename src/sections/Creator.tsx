import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import Eswickes from '@/assets/brand/eswickes';
import { TikTokCustomCard } from '@/components/ui/TikTokCustomCard';
import { socialStats, youtubeVideos, tiktokVideos } from '@/data/social-data';

export const Creator = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'youtube' | 'tiktok'>('youtube');

  const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );

  const YoutubeIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  return (
    <section id="creator" className="relative w-full border-t border-border bg-[#0A0A0F] px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent"
          >
            {t('Creator')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-mono text-5xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl"
          >
            Eswick
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl font-sans text-lg text-text-muted"
          >
            Ciencia, matemáticas e IA para mentes curiosas
          </motion.p>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT: Videos Block (Cols 1-7) */}
          <div className="flex flex-col lg:col-span-7">
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap items-center gap-4" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'youtube'}
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-sm transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-accent text-bg font-bold shadow-lg shadow-accent/20'
                    : 'border border-border text-text hover:border-accent hover:text-accent'
                }`}
              >
                <YoutubeIcon size={18} />
                YouTube
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'tiktok'}
                onClick={() => setActiveTab('tiktok')}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-sm transition-all ${
                  activeTab === 'tiktok'
                    ? 'bg-accent text-bg font-bold shadow-lg shadow-accent/20'
                    : 'border border-border text-text hover:border-accent hover:text-accent'
                }`}
              >
                <TikTokIcon size={18} />
                TikTok
              </button>
            </div>

            {/* Videos Content Container */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'youtube' && (
                  <motion.div
                    key="youtube"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Main YouTube Video */}
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 shadow-2xl">
                      <LiteYouTubeEmbed 
                        id={youtubeVideos[0].id}
                        title={youtubeVideos[0].title}
                        poster="maxresdefault"
                      />
                    </div>
                    {/* Scalable space for future thumbnails */}
                    {youtubeVideos.length > 1 && (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {/* Placeholder for future mapping of smaller thumbnails */}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'tiktok' && (
                  <motion.div
                    key="tiktok"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                  >
                    {tiktokVideos.map((video) => (
                      <TikTokCustomCard key={video.id} {...video} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: About Eswick Block (Cols 8-12) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface/30 p-6 shadow-2xl backdrop-blur-sm">
              {/* Subtle pixel-art border decoration */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-text-subtle/20" />
              
              {/* ASCII Video Container */}
              <div className="relative mx-auto flex h-[300px] w-full max-w-[500px] items-center justify-center overflow-hidden sm:h-[400px]">
                <div className="w-full scale-[0.85] transform-gpu origin-center sm:scale-100">
                  <Eswickes />
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-border" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col">
                  <span className="font-mono text-3xl font-bold text-accent">{socialStats.tiktok.likes}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">TIKTOK LIKES</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-3xl font-bold text-accent">{socialStats.tiktok.followers}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">FOLLOWERS</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-3xl font-bold text-accent">{socialStats.youtube.subs}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">YT SUBS</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-3xl font-bold text-accent">{socialStats.tiktok.videos}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">TT VIDEOS</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 relative z-10">
                <a
                  href={socialStats.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3.5 font-mono text-sm font-bold text-bg transition-all hover:bg-accent/90"
                  aria-label="Suscríbete en YouTube"
                >
                  <YoutubeIcon size={20} className="transition-transform group-hover:scale-110" />
                  Suscríbete en YouTube
                </a>
                <a
                  href={socialStats.tiktok.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-3.5 font-mono text-sm font-semibold text-text transition-all hover:border-accent hover:text-accent"
                  aria-label="Sígueme en TikTok"
                >
                  <TikTokIcon size={20} className="transition-transform group-hover:scale-110" />
                  Sígueme en TikTok
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
