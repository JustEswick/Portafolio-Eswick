import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';

interface TikTokCustomCardProps {
  title: string;
  views: string;
  url: string;
}

export const TikTokCustomCard = ({ title, views, url }: TikTokCustomCardProps) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Thumbnail Placeholder */}
      <div className="relative aspect-[9/16] w-full bg-black/40 flex items-center justify-center overflow-hidden">
        {/* Placeholder gradient / pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        {/* Play Button Overlay */}
        <div className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/80">
          <Play fill="currentColor" className="text-white ml-1" size={24} />
        </div>
      </div>

      {/* Info Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2 z-20">
        <h3 className="font-sans text-sm font-medium text-white line-clamp-2 leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-white/80">
          <Eye size={14} />
          <span className="font-mono">{views}</span>
        </div>
      </div>
    </motion.a>
  );
};
