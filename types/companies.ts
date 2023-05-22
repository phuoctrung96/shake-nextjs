import { PaginationType } from './shared';
import { ProfilesSummaryType, ProfileType } from './profiles';

export type CompanyType = {
  logo: string;
  companyName: string;
  companyDescription: string;
  tags: string[];
  averageRating: number;
  totalCountOfReviews: number;
  averageRatingPerSite: PerSiteChartType[];
  averateRatingOverTime: OverTimeChartType[];
  reviewVolumePerSite: PerSiteChartType[];
  reviewVolueOverTime: OverTimeChartType[];
};

export type ReviewsResType =
  | {
      success: boolean;
      slug: string;
      request: CompanyReqType;
      request_id: string;
      timeseries: CompanyTimeseriesType[];
      results: CompanyReviewType[];
      summary: ReviewSummaryType;
      organization: CompanyOrganizationType;
      pagination: PaginationType;
      updatedOn?: Date;
      loading?: never;
      requestDateTime?: never;
    }
  | {
      success: boolean;
      slug: string;
      request?: never;
      request_id?: never;
      timeseries: [];
      results?: never;
      summary?: never;
      organization?: never;
      pagination?: never;
      updatedOn?: never;
      loading?: never;
      requestDateTime?: never;
    }
  | {
      success?: never;
      request?: never;
      request_id?: never;
      timeseries?: never;
      results?: never;
      summary?: never;
      organization?: never;
      pagination?: never;
      updatedOn?: never;
      loading: true;
      requestDateTime: Date;
      slug: string;
    };

export type MetadataResType =
  | {
      success: boolean;
      organization: CompanyOrganizationType;
      slug: string;
      loading?: never;
    }
  | {
      loading: true;
      slug: string;
      success?: never;
      organization?: never;
    };

type CompanyReqType = {
  name: string;
  callback: string;
  company_domain: string | null;
  street: string | null;
  city: string | null;
  zip_code: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  phone_number: string | null;
  ticker_symbol: string | null;
  review_site: string | null;
  from_date: string | null;
  to_date: string | null;
  page_number: number | null;
  per_page: number | null;
  update: boolean | null;
  timeseries: boolean | null;
  diff: number | null;
};

type CompanyTimeseriesType = {
  date: string;
  average_rating: number;
  total_reviews: number;
};

type CompanyReviewType = {
  external_id?: string;
  reviewer: string;
  date: Date;
  rating: number;
  text: string;
  url: string;
  profile_picture_url?: string;
  title?: string;
  source: string;
};

type ReviewSummaryType = {
  total: number;
  average_rating: number;
  per_source: ReviewSummaryPerSourceType[];
};

export type ReviewSummaryPerSourceType = {
  review_site: string;
  average_rating: number;
  total: number;
};

export type CompanyOrganizationType = {
  website?: string;
  ticker_symbol?: string;
  address?: string;
  description?: string;
  industry?: string;
  country_code?: string;
  sub_industry?: string;
  phone_number?: string;
  sector?: string;
  number_of_employees?: number;
  founded?: string;
  official_name?: string;
};

export type CompaniesCountType = 1 | 2 | 3;

type PerSiteChartType = {
  name: string;
  value: number;
};

type OverTimeChartType = {
  name: string;
  value: number;
};

export type SummaryResType = {
  success: true;
  tag: string;
  has_timeseries: boolean;
  review_summary: ReviewSummaryType;
  profile_summary: ProfilesSummaryType;
  sample_reviews: CompanyReviewType[];
  sample_profiles: ProfileType[];
  organization: CompanyOrganizationType;
  updatedOn: Date;
};

export type CompetitorsResType =
  | {
      success: boolean;
      request_id: string;
      request: {
        name: string;
        callback: string;
      };
      results: CompetitorsResultsType[];
      loading: false;
      requestDateTime?: never;
      details?: never;
      message?: never;
      slug: string;
    }
  | {
      success: false;
      request_id: string;
      details: string;
      message: 'No industry data' | string;
      slug: string;
      request?: never;
      results?: never;
      loading?: never;
      requestDateTime?: never;
    }
  | {
      success?: never;
      request_id?: never;
      request?: never;
      results?: never;
      loading: true;
      slug: string;
      requestDateTime: Date;
      details?: never;
      message?: never;
    };

export type CompetitorsResultsType = {
  name: string;
  tag?: string;
  number_of_reviews: number;
  average_rating: number;
  industry: string;
  rank: number;
  url?: string;
};

export type WordCloudResType =
  | {
      loading: boolean;
      slug: string;
      success?: never;
      message?: never;
      request_id?: never;
      credits_used?: never;
      details?: string;
      results?: never;
    }
  | {
      loading: boolean;
      slug: string;
      success: false;
      message: 'No results' | 'No industry data';
      request_id: string;
      credits_used: number;
      details: string;
      results?: never;
    }
  | {
      success: true;
      results: WordCloud[];
      loading?: never;
      slug?: never;
      message?: never;
      request_id?: never;
      credits_used?: never;
      details?: never;
    };

type WordCloud = {
  word: string;
  score: number;
};
