import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { useLocale } from '@/hooks/useLocale';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const isFeatured = project.featured;

  return (
    <SpotlightCard className="group h-full flex flex-col justify-between p-6 md:p-8">
      {/* Header section */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-mono text-2xl font-bold text-text">
              {project.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-text-muted">
              {project.subtitle[locale]}
            </p>
          </div>
          {isFeatured && (
            <span className="flex-shrink-0 rounded-sm border border-accent-blue/30 bg-accent-blue/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-blue">
              {t('projects.featured', 'Featured')}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-1">
              {t('projects.role', 'Role')}
            </h4>
            <p className="text-sm text-text-subtle">
              {project.role[locale]}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-1">
              {t('projects.impact', 'Impact')}
            </h4>
            <p className="text-sm text-text-subtle">
              {project.impact[locale]}
            </p>
          </div>
        </div>
      </div>

      {/* Footer section (Stack & Link) */}
      <div className="mt-8 flex flex-col gap-4 border-t border-border-strong pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="rounded-sm bg-surface-elevated px-2 py-1 font-mono text-xs text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-sm bg-surface-elevated px-2 py-1 font-mono text-xs text-text-subtle">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 font-mono text-sm text-text hover:text-accent transition-colors"
          >
            {t('projects.viewProject', 'View Project')}
            <ExternalLink className="h-4 w-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
          </a>
        )}
      </div>

      {/* Decorative corners */}
      <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </SpotlightCard>
  );
};
