export type NavItem = {
  id: string;
  labelKey: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'stack', labelKey: 'nav.stack', href: '#stack' },
  { id: 'projects', labelKey: 'nav.projects', href: '#projects' },
  { id: 'education', labelKey: 'nav.education', href: '#education' },
  { id: 'creator', labelKey: 'nav.creator', href: '#creator' },
  { id: 'links', labelKey: 'nav.links', href: '#links' },
];
