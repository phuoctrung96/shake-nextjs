export type SingleProfilesSectionType = {
  title: ProfileServices;
  countOfProfiles: number;
};

export type ProfilesSummaryType = {
  total_profiles: number;
  total_groups: number;
  per_type: PerTypeSummaryType[];
  per_source: { source: string; profiles: number }[];
};

type PerTypeSummaryType = {
  type: ProfileTypeType;
  profiles: number;
  groups: number;
};

export type ProfileType = {
  type: ProfileTypeType;
  location?: LocationType;
  profiles: SingleProfileType[];
};

type ProfileTypeType = 'employee' | 'software' | 'location';

export type LocationType = {
  address: string;
  street?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  coordinates?: string;
  phone_number?: string;
};

export type SingleProfileType = {
  name?: string;
  url?: string;
  domain?: string;
  source?: ProfileServices;
  reported_review_count?: number;
  reported_average_rating?: number;
  review_count?: number;
  average_rating?: number;
  updated_at?: string;
};

export type ProfileServices =
  | 'agoda'
  | 'flipkart'
  | 'producthunt'
  | 'airbnb'
  | 'foursquare'
  | 'productreview'
  | 'aliexpress'
  | 'g2'
  | 'ratemds'
  | 'alternative-to'
  | 'gartner'
  | 'realself'
  | 'amazon'
  | 'gearbest'
  | 'reddit'
  | 'angi'
  | 'glassdoor'
  | 'reserveout'
  | 'angieslist'
  | 'google-shopping'
  | 'reserveout'
  | 'apartments'
  | 'google'
  | 'rottentomatoes'
  | 'appstore'
  | 'greatschools'
  | 'shopify'
  | 'aptratings'
  | 'healthgrades'
  | 'sitejabber'
  | 'avvo'
  | 'homeadvisor'
  | 'softwareadvice'
  | 'bbb'
  | 'homeaway'
  | 'steam'
  | 'bestbuy'
  | 'homestars'
  | 'talabat'
  | 'bilbayt'
  | 'hotels'
  | 'thefork'
  | 'bing'
  | 'houzz'
  | 'theknot'
  | 'booking'
  | 'hungerstation'
  | 'thumbtack'
  | 'capterra'
  | 'imdb'
  | 'tripadvisor'
  | 'cargurus'
  | 'indeed'
  | 'trulia'
  | 'cars'
  | 'influentster'
  | 'trustedshops'
  | 'citysearch'
  | 'insiderpages'
  | 'trustpilot'
  | 'classpass'
  | 'instagram'
  | 'trustradius'
  | 'clutch'
  | 'itcentralstation'
  | 'twitter'
  | 'consumeraffairs'
  | 'jet'
  | 'vitals'
  | 'creditkarma'
  | 'lawyers'
  | 'vrbo'
  | 'customerlobby'
  | 'lendingtree'
  | 'walmart'
  | 'dealerrater'
  | 'linkedin'
  | 'webmd'
  | 'deliveroo'
  | 'martindale'
  | 'weddingwire'
  | 'ebay'
  | 'netflix'
  | 'yell'
  | 'edmunds'
  | 'newegg'
  | 'yellowpages'
  | 'etsy'
  | 'niche'
  | 'yelp'
  | 'expedia'
  | 'openrice'
  | 'zillow'
  | 'facebook'
  | 'opentable'
  | 'zocdoc'
  | 'findlaw'
  | 'playstore'
  | 'zomato';
