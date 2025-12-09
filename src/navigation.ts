import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'Chronicle',
          href: getPermalink('/homes/chronicle'),
        },
        {
          text: 'MeowTalkie',
          href: getPermalink('/homes/meowtalkie'),
        },
        {
          text: 'Photo Swipe Cleaner',
          href: getPermalink('/homes/photo-swipe-cleaner'),
        },
        {
          text: 'Aesthetic Calculator',
          href: getPermalink('/homes/aesthetic-calculator'),
        },
        {
          text: 'Focus One',
          href: getPermalink('/homes/focus-one'),
        },
        {
          text: 'Flip Timer',
          href: getPermalink('/homes/flip-timer'),
        },
      ],
    },
    {
      text: 'Pages',
      links: [
        // {
        //   text: 'About us',
        //   href: getPermalink('/about'),
        // },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        // {
        //   text: 'Category Page',
        //   href: getPermalink('tutorials', 'category'),
        // },
        // {
        //   text: 'Tag Page',
        //   href: getPermalink('astro', 'tag'),
        // },
      ],
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/LongwayCHOW/winkiLandingpage', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Aesthetic Calculator', href: getPermalink('/homes/aesthetic-calculator') },
        { text: 'Chronicle', href: getPermalink('/homes/chronicle') },
        { text: 'Flip Timer', href: getPermalink('/homes/flip-timer') },
        { text: 'Focus One', href: getPermalink('/homes/focus-one') },
        { text: 'MeowTalkie', href: getPermalink('/homes/meowtalkie') },
        { text: 'Photo Swipe Cleaner', href: getPermalink('/homes/photo-swipe-cleaner') },
      ],
    },
    {
      title: 'Support',
      links: [
        //{ text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    // {
    //   title: 'Company',
    //   links: [{ text: 'Shop', href: '#' }],
    // },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo"> Arthelokyo</a> · All rights reserved.
  `,
};
