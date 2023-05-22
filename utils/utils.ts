import { LineChartType } from '../components/reusable/line-chart/LineChart';

export const shortenNumber = (num: number, limit: number): string | number => {
  if (num >= 1000000) {
    return Math.round(num / 1000000) + 'M';
  }

  return num >= limit ? Math.round(num / 1000) + 'k' : num;
};

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export const formatDate = (date: Date | string, format = defaultDateFormat) => {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat('en-US', format).format(dateObj);
};

export const formatNumber = (num: number): string => {
  let nf = new Intl.NumberFormat('en-US');

  return nf.format(num);
};

export const formatLineChartData = (
  id: string,
  data: { [key: string]: number }
): LineChartType[] => {
  let lineChartData = [];
  for (const month in data) {
    lineChartData.push({ month: month, company1: +data[month] });
  }

  return lineChartData;
};

type MonthNames = {
  [key: string]:
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec';
};

export const monthNames: MonthNames = {
  '0': 'Jan',
  '1': 'Feb',
  '2': 'Mar',
  '3': 'Apr',
  '4': 'May',
  '5': 'Jun',
  '6': 'Jul',
  '7': 'Aug',
  '8': 'Sep',
  '9': 'Oct',
  '10': 'Nov',
  '11': 'Dec',
};

export const getLastSixMonths = () => {
  const today = new Date();
  let lastSixMonths = [];

  for (var i = 6; i > 0; i -= 1) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastSixMonths.push(monthNames[d.getMonth().toString() as keyof typeof monthNames]);
  }
  return lastSixMonths;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getMetaTitle = (
  countOfComparedCompanies: 1 | 2 | 3,
  companyNames: string[],
  profilesCount: number | string
) => {
  if (countOfComparedCompanies === 3) {
    return `${companyNames[0]} vs ${companyNames[1]} vs ${companyNames[2]} Reviews | Compare Customer Reviews of ${companyNames[0]} vs ${companyNames[1]} vs ${companyNames[2]}`;
  } else if (countOfComparedCompanies === 2) {
    return `${companyNames[0]} vs ${companyNames[1]} Reviews | Compare Customer Reviews of ${companyNames[0]} vs ${companyNames[1]}
    `;
  }

  return `${companyNames[0]} Reviews | Analyze Customer Reviews of ${companyNames[0]} from ${profilesCount} profiles`;
};

export const getMetaDescription = (
  countOfComparedCompanies: 1 | 2 | 3,
  companyNames: string[],
  reviewsCount: number | string,
  profileWebsites: string[],
  profilesCount: number | string
) => {
  if (countOfComparedCompanies === 2) {
    return getTwoCompaniesMetaDescription(
      companyNames,
      reviewsCount,
      profileWebsites,
      profilesCount
    );
  } else if (countOfComparedCompanies === 3) {
    return getThreeCompaniesMetaDescription(
      companyNames,
      reviewsCount,
      profileWebsites,
      profilesCount
    );
  }

  return getSingleCompanyMetaDescription(
    companyNames,
    reviewsCount,
    profileWebsites,
    profilesCount
  );
};

const getThreeCompaniesMetaDescription = (
  companyNames: string[],
  reviewsCount: number | string,
  profileWebsites: string[],
  profilesCount: number | string
) => {
  return `Analyze ${reviewsCount} aggregated reviews for ${companyNames[0]} compared to ${
    companyNames[1]
  } and ${companyNames[2]}, from ${profilesCount} review profiles from ${getSitesText(
    profileWebsites
  )}.`;
};

const getTwoCompaniesMetaDescription = (
  companyNames: string[],
  reviewsCount: number | string,
  profileWebsites: string[],
  profilesCount: number | string
) => {
  return `Analyze ${reviewsCount} aggregated reviews for ${companyNames[0]} as compared to ${
    companyNames[1]
  }, from ${profilesCount} review profiles from ${getSitesText(profileWebsites)}.`;
};

const getSingleCompanyMetaDescription = (
  companyNames: string[],
  reviewsCount: number | string,
  profileWebsites: string[],
  profilesCount: number | string
) => {
  return `Analyze ${reviewsCount} aggregated reviews for ${
    companyNames[0]
  } from ${profilesCount} profiles on ${getSitesText(profileWebsites, 'longer')}.`;
};

const getSitesText = (sites: string[], type: 'longer' | 'normal' = 'normal') => {
  if (sites.length === 0) return 'internet';

  const sitesData = type === 'normal' ? sites.slice(0, 3) : sites.slice(0, 5);

  let sitesText = '';

  if (sitesData.length === 1) return capitalizeFirstLetter(sitesData[0]);

  sitesData.map((site, index) => {
    if (index === sitesData.length - 1) {
      return (sitesText +=
        type === 'normal'
          ? capitalizeFirstLetter(site) + ''
          : `and ${capitalizeFirstLetter(site)}`);
    }

    if (index === sitesData.length - 2 && type === 'longer') {
      return (sitesText += `${capitalizeFirstLetter(site)} `);
    }

    return (sitesText += capitalizeFirstLetter(site) + ', ');
  });

  return type === 'longer'
    ? `${sitesText}, and compare to the competition`
    : `${sitesText} and more`;
};

export const getDaysAgo = (date: Date | undefined) => {
  if (!date) return;

  const dateNow = new Date();
  const dateThen = new Date(date);
  const diff = dateNow.getTime() - dateThen.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return days;
};

export const getPercentageIncrease = (current: number, previous: number) => {
  return Math.abs(Math.round(((current - previous) / previous) * 100));
};

export const getPercentageDecrease = (current: number, previous: number) => {
  return Math.abs(Math.round(((previous - current) / previous) * 100));
};

export const getQueryParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};
