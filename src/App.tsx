import { RootLayout } from '@/layouts/RootLayout';
import { Hero } from '@/sections/Hero';
import { Stack } from '@/sections/Stack';
import { Projects } from '@/sections/Projects';
import { Education } from '@/sections/Education';
import { Creator } from '@/sections/Creator';
import DockNav from '@/components/DockNav';

export const App = () => {
  return (
    <RootLayout>
      <Hero />
      <Stack />
      <Projects />
      <Education />
      <Creator />
      <DockNav />
    </RootLayout>
  );
};
