export const demoPaths = [
  '/services/',
  '/pricing/',
  '/homes/mobile-app/',
  '/homes/personal/',
  '/homes/saas/',
  '/homes/startup/',
  '/landing/click-through/',
  '/landing/lead-generation/',
  '/landing/pre-launch/',
  '/landing/product/',
  '/landing/sales/',
  '/landing/subscription/',
];

export const isDemoPath = (path: string) => demoPaths.includes(`/${path.split('/').filter(Boolean).join('/')}/`);

export const includeInSitemap = (page: string) => {
  const path = new URL(page).pathname;
  return !isDemoPath(path) && !path.startsWith('/tag/') && !/^\/blog\/\d+\/?$/.test(path);
};
