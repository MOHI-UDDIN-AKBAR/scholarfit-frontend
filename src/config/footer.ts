import type { IconName } from '../components/ui/Icon';

export type FooterLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: IconName;
  href: string;
};

export type FooterDataType = {
  title: 'Solutions' | 'Support' | 'Company' | 'Legal';
  className: string;
  links: FooterLink[];
};

export const footerData: FooterDataType[] = [
  {
    title: 'Solutions',
    className: '',
    links: [
      { label: 'Strength Training', href: '#' },
      { label: 'Weight Loss', href: '#' },
      { label: 'Muscle Building', href: '#' },
      { label: 'General Fitness', href: '#' },
    ],
  },
  {
    title: 'Support',
    className: 'mt-12 md:mt-0',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    className: '',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Legal',
    className: 'mt-12 md:mt-0',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'facebook', href: '#' },
  { name: 'instagram', href: '#' },
  { name: 'tweeter', href: '#' },
  { name: 'linkedIn', href: '#' },
];
