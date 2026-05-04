import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';
import { CERTIFICATIONS } from '@/data/certifications';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';

export const Education = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const timelineItems: TimelineItem[] = CERTIFICATIONS.map((cert) => ({
    id: cert.id,
    date: cert.date,
    title: cert.title[locale],
    subtitle: cert.institution,
    description: cert.description[locale],
    tags: cert.skills,
    url: cert.url,
    status: {
      label: cert.status === 'in-progress' 
        ? t('education.inProgress', 'In Progress')
        : t('education.completed', 'Completed'),
      type: cert.status
    },
    featured: cert.featured
  }));

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-mono text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {t('education.title', 'Education & Certifications')}
          </h2>
          <p className="mt-4 font-mono text-text-subtle">
            {t('education.subtitle', 'Academic background and continuous learning.')}
          </p>
        </div>

        <Timeline 
          items={timelineItems} 
          viewCertificateText={t('education.viewCertificate', 'View Certificate')}
        />
      </div>
    </section>
  );
};
