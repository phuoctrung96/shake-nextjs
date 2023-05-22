import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import io, { Socket } from 'socket.io-client';
import { requestCompetitors, requestReview, requestSummary, requestWordCloud } from '../api/api';
import {
  CompaniesCountType,
  CompetitorsResType,
  ReviewsResType,
  SummaryResType,
  WordCloudResType,
} from '../types/companies';
import { newFetch } from '../utils/fetch';
import { getLastSixMonths, monthNames } from '../utils/utils';
import { toast } from 'react-toastify';

type CompaniesContextType = {
  reviewsData: ReviewsResType[];
  setReviewsData: Dispatch<SetStateAction<ReviewsResType[]>>;
  summariesData: SummaryResType[];
  setSummariesData: Dispatch<SetStateAction<SummaryResType[]>>;
  competitorsData: CompetitorsResType[];
  setCompetitorsData: Dispatch<SetStateAction<CompetitorsResType[]>>;
  companyNames: string[];
  wordCloudData: WordCloudResType[];
  setWordCloudData: Dispatch<SetStateAction<WordCloudResType[]>>;
  displayedCompanies: CompaniesCountType;
  companiesWithReviewsData: ReviewsResType[];
  companiesWithTimeseriesData: ReviewsResType[];
  countOfAllLocations: number;
  companySlugs: string[];
};

type CompaniesProvideType = {
  reviews: ReviewsResType[];
  summaries: SummaryResType[];
  competitors: CompetitorsResType[];
  wordCloud: WordCloudResType[];
  children: ReactNode;
};

const CompaniesContext = createContext<CompaniesContextType>({} as CompaniesContextType);

export const CompaniesProvider = ({
  reviews,
  summaries,
  competitors,
  wordCloud,
  children,
}: CompaniesProvideType) => {
  const [reviewsData, setReviewsData] = useState<ReviewsResType[]>(reviews);
  const [summariesData, setSummariesData] = useState<SummaryResType[]>(summaries);
  const [competitorsData, setCompetitorsData] = useState<CompetitorsResType[]>(competitors);
  const [wordCloudData, setWordCloudData] = useState<WordCloudResType[]>(wordCloud);
  const [socket, setSocket] = useState<null | Socket>(null);

  const router = useRouter();
  const slug = router.query.slug as string;

  const companyNames = useMemo(() => {
    return summariesData.map((companySummary) => {
      return companySummary.organization.official_name || '';
    });
  }, [summariesData]);

  const displayedCompanies = summariesData.length as 1 | 2 | 3;
  const companiesWithReviewsData = reviewsData?.filter((review) => !review.loading) || [];

  const companiesWithTimeseriesData = companiesWithReviewsData.filter((reviewItem, index) => {
    const lastSixMonths = getLastSixMonths();

    const dataPerMonth = new Map();
    reviewItem.timeseries?.map((day) => {
      const monthOfReview =
        monthNames[new Date(day.date).getMonth().toString() as keyof typeof monthNames];
      if (lastSixMonths.includes(monthOfReview) && day['average_rating'] !== 0) {
        dataPerMonth.set(monthOfReview, [
          ...(dataPerMonth.get(monthOfReview) || []),
          day['average_rating'],
        ]);
      }
    });

    let hasMonthlyData = true;
    dataPerMonth.size < 6 && (hasMonthlyData = false);
    dataPerMonth.forEach((value) => {
      if (value.length === 0) {
        hasMonthlyData = true;
      }
    });

    return hasMonthlyData;
  });

  const countOfAllLocations = useMemo(() => {
    return summariesData.reduce((acc, companySummary) => {
      const perTypeData = companySummary.profile_summary.per_type.filter(
        (item) => item.type === 'location'
      );

      return perTypeData.length > 0 ? acc + perTypeData[0].profiles : 0;
    }, 0);
  }, [summariesData]);

  const companySlugs = useMemo(() => {
    return summariesData.map((item) => item.tag);
  }, [summariesData]);

  const loadingReviewsData = useMemo(
    () => reviewsData.filter(({ loading }) => loading),
    [reviewsData]
  );

  const loadingCompetitorsData = useMemo(
    () => competitorsData.filter(({ loading }) => loading),
    [competitorsData]
  );

  const loadingWordCloudData = useMemo(
    () => wordCloudData.filter(({ loading }) => loading),
    [wordCloudData]
  );

  let loadingData: { [key: string]: ('reviews' | 'wordCloud' | 'competitors')[] } = {};

  loadingReviewsData.map(
    ({ slug }) =>
      (loadingData = {
        ...loadingData,
        [slug]: [...(loadingData[slug] || ''), 'reviews'],
      })
  );

  loadingCompetitorsData.map(
    ({ slug }) =>
      (loadingData = {
        ...loadingData,
        [slug || '']: [...(loadingData[slug || ''] || ''), 'wordCloud'],
      })
  );

  loadingWordCloudData.map(
    ({ slug }) =>
      (loadingData = {
        ...loadingData,
        [slug || '']: [...(loadingData[slug || ''] || ''), 'wordCloud'],
      })
  );

  useEffect(() => {
    for (const slug in loadingData) {
      Promise.all(
        loadingData[slug].map(async (dataType) => {
          if (dataType === 'reviews') {
            const summary = summariesData.find(({ tag }) => tag === slug);
            const requestReviewRes = await requestReview(slug, summary?.has_timeseries || false);

            if (!requestReviewRes.loading) {
              const companyIndex = reviewsData.findIndex(
                (review) => review.slug === requestReviewRes.slug
              );

              setReviewsData([
                ...reviewsData.slice(0, companyIndex),
                { ...requestReviewRes, slug: requestReviewRes.slug },
                ...reviewsData.slice(companyIndex + 1),
              ]);
            }
          } else if (dataType === 'wordCloud') {
            const wordCloudRes = await requestWordCloud(slug);
            if (!wordCloudRes.loading) {
              const companyIndex = wordCloud.findIndex(({ slug }) => slug === wordCloudRes.slug);

              setWordCloudData((prevState) => [
                ...prevState.slice(0, companyIndex),
                { ...wordCloudRes },
                ...prevState.slice(companyIndex + 1),
              ]);
            }
          } else if (dataType === 'competitors') {
            const competitorsRes = await requestCompetitors(slug);

            if (!competitorsRes.loading) {
              const companyIndex = summariesData.findIndex(
                ({ tag }) => tag === competitorsRes.slug
              );

              setCompetitorsData((prevState) => [
                ...prevState.slice(0, companyIndex),
                { ...competitorsRes },
                ...prevState.slice(companyIndex + 1),
              ]);
            }
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    const socketInitializer = async () => {
      if (socket?.connected) return;

      let socketClient = io().connect();
      if (!socketClient.connected) {
        await newFetch('socket');
        socketClient = io();
      }
      setSocket(socketClient);
    };

    socketInitializer();

    return () => {
      socket?.offAny();
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onAny((event, ...args) => {
      const socketData = JSON.parse(args[0]);

      process.env.NEXT_PUBLIC_DEBUG === 'true' ? console.log(event, args) : null;

      if (event.startsWith('competitors/')) {
        if (competitorsData.find(({ slug }) => slug === socketData.slug)) {
          const updatedCompetitorsDataIndex = competitorsData.findIndex(
            (competitors) => competitors.slug === socketData.slug
          );

          setCompetitorsData((prevState) => [
            ...prevState.slice(0, updatedCompetitorsDataIndex),
            { ...socketData, slug: socketData.slug, loading: false },
            ...prevState.slice(updatedCompetitorsDataIndex + 1),
          ]);
        }
      }

      if (event.startsWith('reviews/')) {
        if (reviewsData.find(({ slug }) => slug === socketData.slug)) {
          const updatedReviewsDataIndex = reviewsData.findIndex(
            (review) => review.slug === socketData.slug
          );

          setReviewsData((prevState) => {
            return [
              ...prevState.slice(0, updatedReviewsDataIndex),
              { ...socketData, slug: socketData.slug, loading: false },
              ...prevState.slice(updatedReviewsDataIndex + 1),
            ];
          });
        }
      }

      if (event.startsWith('wordCloud/')) {
        if (wordCloudData.find(({ slug }) => slug === socketData.slug)) {
          const updatedCompanyIndex = wordCloudData.findIndex(
            ({ slug }) => slug === socketData.slug
          );

          setWordCloudData((prevState) => {
            return [
              ...prevState.slice(0, updatedCompanyIndex),
              { ...socketData, slug: socketData.slug, loading: false },
              ...prevState.slice(updatedCompanyIndex + 1),
            ];
          });
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    const previousSlugs = summariesData.map((summary) => {
      return summary.tag;
    });

    const newSlugs = Array.isArray(slug) ? slug.filter((item) => item !== 'vs') : [slug || ''];
    const newSlugsLength = newSlugs.length;

    if (newSlugsLength < previousSlugs.length) {
      // removing company from comparison
      const removedSlug = previousSlugs.find((x) => !slug?.includes(x));
      const removedSlugIndex = summariesData.findIndex((summary) => summary.tag === removedSlug);

      setReviewsData([
        ...reviewsData.slice(0, removedSlugIndex),
        ...reviewsData.slice(removedSlugIndex + 1),
      ]);
      setSummariesData([
        ...summariesData.slice(0, removedSlugIndex),
        ...summariesData.slice(removedSlugIndex + 1),
      ]);
      setCompetitorsData([
        ...competitorsData.slice(0, removedSlugIndex),
        ...competitorsData.slice(removedSlugIndex + 1),
      ]);
      setWordCloudData((prevState) => [
        ...prevState.slice(0, removedSlugIndex),
        ...prevState.slice(removedSlugIndex + 1),
      ]);
    } else {
      // adding company to comparison
      const addedSlug = newSlugs.find((x) => !previousSlugs?.includes(x));
      if (!addedSlug) return;

      const addSlugIndex = newSlugs.findIndex((slug) => slug === addedSlug);

      const getCompanyData = async () => {
        try {
          const [summaryRes] = await Promise.all([await requestSummary(addedSlug)]);

          setSummariesData([
            ...summariesData.slice(0, addSlugIndex),
            summaryRes,
            ...summariesData.slice(addSlugIndex + 1),
          ]);

          const [reviewRes, wordCloudRes, competitorsRes] = await Promise.all([
            await requestReview(addedSlug, summaryRes.has_timeseries),
            await requestWordCloud(addedSlug),
            await requestCompetitors(addedSlug),
          ]);

          unstable_batchedUpdates(() => {
            setReviewsData([
              ...reviewsData.slice(0, addSlugIndex),
              reviewRes,
              ...reviewsData.slice(addSlugIndex + 1),
            ]);

            setWordCloudData((prevState) => [
              ...prevState.slice(0, addSlugIndex),
              wordCloudRes,
              ...prevState.slice(addSlugIndex + 1),
            ]);

            setCompetitorsData([
              ...competitorsData.slice(0, addSlugIndex),
              competitorsRes,
              ...competitorsData.slice(addSlugIndex + 1),
            ]);
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            router.back();
            toast.error('Company data failed to load. Try a different company.');
          }

          console.error(error);
        }
      };

      getCompanyData();
    }
  }, [slug]);

  return (
    <CompaniesContext.Provider
      value={{
        reviewsData,
        setReviewsData,
        summariesData,
        setSummariesData,
        competitorsData,
        setCompetitorsData,
        companyNames,
        displayedCompanies,
        companiesWithReviewsData,
        companiesWithTimeseriesData,
        countOfAllLocations,
        companySlugs,
        wordCloudData,
        setWordCloudData,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};

const useCompanies = (): CompaniesContextType => {
  return useContext(CompaniesContext);
};

export default useCompanies;
