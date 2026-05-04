export type SocialLink = {
  id: string;
  labelKey: string;
  url: string;
  icon: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    labelKey: 'social.github',
    url: 'https://github.com/isaacscamacho',
    icon: 'Github',
  },
  {
    id: 'linkedin',
    labelKey: 'social.linkedin',
    url: 'https://www.linkedin.com/in/isaacscamacho/',
    icon: 'Briefcase',
  },
  {
    id: 'tiktok',
    labelKey: 'social.tiktok',
    url: 'https://www.tiktok.com/@eswicke',
    icon: 'Music2',
  },
  {
    id: 'youtube',
    labelKey: 'social.youtube',
    url: 'https://www.youtube.com/@Eswick',
    icon: 'Youtube',
  },
  {
    id: 'twitch',
    labelKey: 'social.twitch',
    url: 'https://www.twitch.tv/eswick_',
    icon: 'Twitch',
  },
  {
    id: 'email',
    labelKey: 'social.email',
    url: 'mailto:isaacscreal@gmail.com',
    icon: 'Mail',
  },
];
