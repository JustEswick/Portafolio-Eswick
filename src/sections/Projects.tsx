import { useTranslation } from 'react-i18next';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { AsciiRainBackground } from '@/components/ui/AsciiRainBackground';
import { PROJECTS } from '@/data/projects';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative border-t border-border-strong bg-surface py-24 overflow-hidden">
      <AsciiRainBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-text md:text-4xl">
            {t('projects.title', 'Projects')}
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-text-subtle">
            {t('projects.subtitle', 'A selection of recent work, highlighting architectural design, artificial intelligence integration, and end-to-end development.')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};
