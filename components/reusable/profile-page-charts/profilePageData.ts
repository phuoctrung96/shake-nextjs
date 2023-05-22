import { Serie } from '@nivo/line';
import { SingleProfilesSectionType } from '../../../types/profiles';

export const SAMPLE_TAGS = ['mcdonalds.com', '200,000', 'MCD:US', 'Consumer Discretionary'];

export const SAMPLE_PROFILES: SingleProfilesSectionType[] = [
  {
    title: 'google',
    countOfProfiles: 33524,
  },
  {
    title: 'facebook',
    countOfProfiles: 31256,
  },
  {
    title: 'yelp',
    countOfProfiles: 29542,
  },
  {
    title: 'foursquare',
    countOfProfiles: 22485,
  },
  {
    title: 'glassdoor',
    countOfProfiles: 20984,
  },
  {
    title: 'tripadvisor',
    countOfProfiles: 50,
  },
  {
    title: 'aliexpress',
    countOfProfiles: 45,
  },
  {
    title: 'angi',
    countOfProfiles: 33,
  },
  {
    title: 'bbb',
    countOfProfiles: 20,
  },
  {
    title: 'cargurus',
    countOfProfiles: 9,
  },
  {
    title: 'houzz',
    countOfProfiles: 1,
  },
];

export const SAMPLE_AVERAGE_RATING_1 = [
  {
    name: 'Google',
    company1: 4.5,
  },
  {
    name: 'Facebook',
    company1: 4.8,
  },
  {
    name: 'Yelp',
    company1: 3.9,
  },
  {
    name: 'Foursquare',
    company1: 3.5,
  },
  {
    name: 'Glassdoor',
    company1: 4.9,
  },
  {
    name: 'Tripadvisor',
    company1: 5,
  },
];

export const SAMPLE_AVERAGE_RATING_2 = [
  {
    name: 'Google',
    company1: 4.5,
    company2: 4,
  },
  {
    name: 'Facebook',
    company1: 4.8,
    company2: 4.2,
  },
  {
    name: 'Yelp',
    company1: 3.9,
    company2: 3.5,
  },
  {
    name: 'Foursquare',
    company1: 3.5,
    company2: 5,
  },
  {
    name: 'Glassdoor',
    company1: 4.9,
    company2: 4.1,
  },
  {
    name: 'Tripadvisor',
    company1: 5,
    company2: 4.9,
  },
];

export const SAMPLE_AVERAGE_RATING_3 = [
  {
    name: 'Google',
    company1: 4.5,
    company2: 4,
    company3: 3.7,
  },
  {
    name: 'Facebook',
    company1: 4.8,
    company2: 4.2,
    company3: 3.2,
  },
  {
    name: 'Yelp',
    company1: 3.9,
    company2: 3.5,
    company3: 3.6,
  },
  {
    name: 'Foursquare',
    company1: 3.5,
    company2: 5,
    company3: 3.5,
  },
  {
    name: 'Glassdoor',
    company1: 4.9,
    company2: 4.1,
    company3: 3.9,
  },
  {
    name: 'Tripadvisor',
    company1: 5,
    company2: 4.9,
    company3: 3,
  },
];

export const SAMPLE_AVERAGE_RATING_OVER_TIME_1: Serie[] = [
  {
    id: 'company1',
    data: [
      {
        x: 'Jan',
        y: 3.5,
      },
      {
        x: 'Feb',
        y: 3.9,
      },
      {
        x: 'Mar',
        y: 3.7,
      },
      {
        x: 'Apr',
        y: 4.2,
      },
      {
        x: 'May',
        y: 4.2,
      },
      {
        x: 'Jun',
        y: 4.5,
      },
    ],
  },
];

export const SAMPLE_AVERAGE_RATING_OVER_TIME_2: Serie[] = [
  ...SAMPLE_AVERAGE_RATING_OVER_TIME_1,
  {
    id: 'company2',
    data: [
      {
        x: 'Jan',
        y: 4.5,
      },
      {
        x: 'Feb',
        y: 4.4,
      },
      {
        x: 'Mar',
        y: 4.1,
      },
      {
        x: 'Apr',
        y: 4.4,
      },
      {
        x: 'May',
        y: 4.6,
      },
      {
        x: 'Jun',
        y: 4.7,
      },
    ],
  },
];

export const SAMPLE_AVERAGE_RATING_OVER_TIME_3: Serie[] = [
  ...SAMPLE_AVERAGE_RATING_OVER_TIME_2,
  {
    id: 'company3',
    data: [
      {
        x: 'Jan',
        y: 3.9,
      },
      {
        x: 'Feb',
        y: 3.5,
      },
      {
        x: 'Mar',
        y: 2.9,
      },
      {
        x: 'Apr',
        y: 2.8,
      },
      {
        x: 'May',
        y: 2.9,
      },
      {
        x: 'Jun',
        y: 4.5,
      },
    ],
  },
];

export const SAMPLE_REVIEW_VOLUME_1 = [
  {
    name: 'Google',
    company1: 200,
  },
  {
    name: 'Facebook',
    company1: 850,
  },
  {
    name: 'Yelp',
    company1: 1250,
  },
  {
    name: 'Foursquare',
    company1: 35,
  },
  {
    name: 'Glassdoor',
    company1: 50,
  },
  {
    name: 'Tripadvisor',
    company1: 4,
  },
];

export const SAMPLE_REVIEW_VOLUME_2 = [
  {
    name: 'Google',
    company1: 200,
    company2: 750,
  },
  {
    name: 'Facebook',
    company1: 850,
    company2: 1850,
  },
  {
    name: 'Yelp',
    company1: 1250,
    company2: 2457,
  },
  {
    name: 'Foursquare',
    company1: 35,
    company2: 175,
  },
  {
    name: 'Glassdoor',
    company1: 50,
    company2: 500,
  },
  {
    name: 'Tripadvisor',
    company1: 4,
    company2: 40,
  },
];

export const SAMPLE_REVIEW_VOLUME_3 = [
  {
    name: 'Google',
    company1: 200,
    company2: 750,
    company3: 58,
  },
  {
    name: 'Facebook',
    company1: 850,
    company2: 1850,
    company3: 158,
  },
  {
    name: 'Yelp',
    company1: 1250,
    company2: 2457,
    company3: 125,
  },
  {
    name: 'Foursquare',
    company1: 35,
    company2: 175,
    company3: 35,
  },
  {
    name: 'Glassdoor',
    company1: 50,
    company2: 500,
    company3: 0,
  },
  {
    name: 'Tripadvisor',
    company1: 4,
    company2: 40,
    company3: 4,
  },
];

export const SAMPLE_REVIEW_VOLUME_OVER_TIME_1: Serie[] = [
  {
    id: 'company1',
    data: [
      {
        x: 'Jan',
        y: 150,
      },
      {
        x: 'Feb',
        y: 350,
      },
      {
        x: 'Mar',
        y: 551,
      },
      {
        x: 'Apr',
        y: 450,
      },
      {
        x: 'May',
        y: 750,
      },
      {
        x: 'Jun',
        y: 710,
      },
    ],
  },
];

export const SAMPLE_REVIEW_VOLUME_OVER_TIME_2: Serie[] = [
  ...SAMPLE_REVIEW_VOLUME_OVER_TIME_1,
  {
    id: 'company2',
    data: [
      {
        x: 'Jan',
        y: 170,
      },
      {
        x: 'Feb',
        y: 250,
      },
      {
        x: 'Mar',
        y: 351,
      },
      {
        x: 'Apr',
        y: 235,
      },
      {
        x: 'May',
        y: 350,
      },
      {
        x: 'Jun',
        y: 450,
      },
    ],
  },
];

export const SAMPLE_REVIEW_VOLUME_OVER_TIME_3: Serie[] = [
  ...SAMPLE_REVIEW_VOLUME_OVER_TIME_2,
  {
    id: 'company3',
    data: [
      {
        x: 'Jan',
        y: 50,
      },
      {
        x: 'Feb',
        y: 0,
      },
      {
        x: 'Mar',
        y: 450,
      },
      {
        x: 'Apr',
        y: 375,
      },
      {
        x: 'May',
        y: 600,
      },
      {
        x: 'Jun',
        y: 500,
      },
    ],
  },
];

export const SAMPLE_COMPANIES = [
  'Agoda',
  'AirBnb',
  'AliExpress',
  'Amazon',
  'API',
  'Avvo',
  'AppStore',
  'Bookingcom',
  'Business',
  'BBB',
  'Captcha',
  'Capterra',
  'Carscom',
  'Clutch',
  'CreditKarma',
  'CustomerLobby',
  'Data',
  'Datashake',
  'DealerRater',
  'Ebay',
  'Etsy',
  'Expedia',
  'Facebook',
  'Flipkart',
  'Foursquare',
  'G2',
  'GearBest',
  'Glassdoor',
  'Google',
  'GooglePlay',
  'Headless',
  'Healthgrades',
  'Homestars',
  'Hotelscom',
  'HTML',
  'HungerStation',
  'IMDb',
  'Indeed',
  'Index',
  'Intelligent',
  'Jet',
  'JSON',
  'Lawyers',
  'Management',
  'Martindale',
  'NAP',
  'Newegg',
  'OpenRice',
  'OpenTable',
  'ProductHunt',
  'Proxy',
  'Rating',
  'Reviews',
  'RottenTomatoes',
  'Scraper',
  'SiteJabber',
  'Softwareadvice',
  'Steam',
  'Talabat',
  'TheKnot',
  'Thumbstack',
  'Tripadvisor',
  'Trulia',
  'TrustedShops',
  // 'Trustpilot',
  'Trustradius',
  'Vitals',
  'Website',
  'WeddingWire',
  'Yell',
  'YellowPages',
  'Yelp',
  'Zillow',
  'Zocdoc',
  'Zomato',
];

export const SAMPLE_REVIEWS = [
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
  {
    title: 'User in Marketing and Adventure company',
    rating: 3.5,
    date: '2021-12-27',
    content:
      '<p><strong>What do you linke best?</strong></p><p>The site is user-friendly and easy to navigate.</p><p><strong>What do you dislike?</strong></p><p>Unable to open multiple subaccounts.</p>',
  },
];

export const SAMPLE_MCDONALDS = {
  logo: 'https://logo.clearbit.com/mcdonalds.com',
  title: 'McDonald’s',
  description:
    "McDonald's Corporation franchises and operates fast-food restaurants in the global restaurant industry. The Company's restaurants serves a variety of value-priced menu products in countries around the world.",
  tags: ['mcdonalds.com', '200,000', 'MCD:US', 'Consumer Discretionary'],
  rating: 4.1,
  countOfReviews: 31525,
  averageRating: SAMPLE_AVERAGE_RATING_1,
  averateRatingOverTime: SAMPLE_AVERAGE_RATING_OVER_TIME_1,
  reviewVolume: SAMPLE_REVIEW_VOLUME_1,
  reviewVolueOverTime: SAMPLE_REVIEW_VOLUME_OVER_TIME_1,
};

export const SAMPLE_BURGER_KING = {
  logo: 'https://logo.clearbit.com/burgerking.com',
  title: 'Burger King',
  description:
    'Burger King Corporation retails food products. The Company offers food items including hamburgers, chicken, breakfast foods, french fries, onion rings, and beverages. Burger King serves customers worldwide.',
  tags: ['BurgerKing Corp.', '20,000 employees', 'Consumer Discretionary', 'bk.com', 'NYSE: QSR'],
  rating: 4.5,
  countOfReviews: 28754,
  averageRating: SAMPLE_AVERAGE_RATING_2,
  averateRatingOverTime: SAMPLE_AVERAGE_RATING_OVER_TIME_2,
  reviewVolume: SAMPLE_REVIEW_VOLUME_2,
  reviewVolueOverTime: SAMPLE_REVIEW_VOLUME_OVER_TIME_2,
};

export const SAMPLE_SUBWAY = {
  logo: 'https://logo.clearbit.com/subway.com',
  title: 'Subway',
  description:
    'Subway Restaurants operates as a chain of restaurants. The Company offers sandwiches, wraps, salads, drinks, breads, and other food services. Subway Restaurants serves customers worldwide.',
  tags: ['Subway', '410,000 employees', 'subway.com', 'Consumer Discretionary'],
  rating: 3.9,
  countOfReviews: 15525,
  averageRating: SAMPLE_AVERAGE_RATING_3,
  averateRatingOverTime: SAMPLE_AVERAGE_RATING_OVER_TIME_3,
  reviewVolume: SAMPLE_REVIEW_VOLUME_3,
  reviewVolueOverTime: SAMPLE_REVIEW_VOLUME_OVER_TIME_3,
};

export const sampleData = {
  averageRating: {
    '1': SAMPLE_AVERAGE_RATING_1,
    '2': SAMPLE_AVERAGE_RATING_2,
    '3': SAMPLE_AVERAGE_RATING_3,
  },
  reviewVolume: {
    '1': SAMPLE_REVIEW_VOLUME_1,
    '2': SAMPLE_REVIEW_VOLUME_2,
    '3': SAMPLE_REVIEW_VOLUME_3,
  },
  averageRatingOverTime: {
    '1': SAMPLE_AVERAGE_RATING_OVER_TIME_1,
    '2': SAMPLE_AVERAGE_RATING_OVER_TIME_2,
    '3': SAMPLE_AVERAGE_RATING_OVER_TIME_3,
  },
  reviewVolumeOverTime: {
    '1': SAMPLE_REVIEW_VOLUME_OVER_TIME_1,
    '2': SAMPLE_REVIEW_VOLUME_OVER_TIME_2,
    '3': SAMPLE_REVIEW_VOLUME_OVER_TIME_3,
  },
};
