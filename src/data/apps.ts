export const apps = [
  {
    id: 'chronicle',
    name: 'Chronicle',
    description: 'A calendar-based journal for notes, tasks and everyday planning.',
    icon: 'tabler:calendar',
    category: 'chronicle',
    article: 'chronicle-vs-dayone-story',
  },
  {
    id: 'meowtalkie',
    name: 'MeowTalkie',
    description: 'A cat soundboard for playful interaction, not a language translator.',
    icon: 'tabler:paw',
    category: 'meowtalkie',
    article: 'meowtalkie-shy-cat-story',
  },
  {
    id: 'aitrans',
    name: 'AiTrans',
    description: 'An offline Chinese-English voice translator for Android travel conversations.',
    icon: 'tabler:language',
    article: 'travel-china',
  },
  {
    id: 'aesthetic-calculator',
    name: 'Aesthetic Calculator',
    description: 'A calculator app with themes, colors and calculation history.',
    icon: 'tabler:calculator',
    category: 'aesthetic-calculator',
    article: 'aesthetic-calculator-refactor-story',
  },
  {
    id: 'deliseek',
    name: 'DeliSeek',
    description: 'Explore local food while planning a trip to China.',
    icon: 'tabler:bowl',
    article: 'travel-china',
  },
  {
    id: 'focus-one',
    name: 'Focus One',
    description: 'A visual focus timer for working on one task at a time.',
    icon: 'tabler:target',
    category: 'focus-one',
    article: 'why-i-built-focus-timer-screen-addiction',
  },
  {
    id: 'flip-timer',
    name: 'Flip Timer',
    description: 'A countdown app controlled by changing your phone’s orientation.',
    icon: 'tabler:hand-off',
    category: 'flip-timer',
    article: 'flip-timer-sensor-story',
  },
  {
    id: 'photo-swipe-cleaner',
    name: 'Photo Swipe Cleaner',
    description: 'Review your photos one by one and choose what to keep or delete.',
    icon: 'tabler:photo',
    category: 'photo-swipe-cleaner',
    article: 'photo-swipe-cleaner-swipe-story',
  },
  {
    id: 'vocaltrans',
    name: 'VocalTrans',
    description: 'An offline voice translation app for travel conversations.',
    icon: 'tabler:language',
    article: 'travel-china',
  },
] as const;

export const findAppByPath = (path: string) => apps.find((app) => path.replace(/\/$/, '') === `/homes/${app.id}`);
export const findAppByCategory = (category?: string) =>
  apps.find((app) => 'category' in app && app.category === category);
