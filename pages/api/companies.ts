import { NextApiRequest, NextApiResponse } from 'next';
import { newApiFetch } from '../../utils/fetch';
import { getQueryParam } from '../../utils/utils';
import { SuggestionPaginationType } from '../../types/shared';

export type CompaniesSuggestionsReqType = {
  name?: string;
  page?: string;
  size?: string;
};

export type CompaniesSuggestionsResponseType = {
  success: boolean;
  companies: CompanySuggestionType[];
  pagination: SuggestionPaginationType;
};

export type CompanySuggestionType = {
  id: string;
  tag: string;
  name: string;
  url?: string;
};

const getCompaniesSuggestions = async ({
  name,
  page,
  size,
}: CompaniesSuggestionsReqType): Promise<CompaniesSuggestionsResponseType> => {
  const searchParams = new URLSearchParams();
  if (name) searchParams.append('name', name);
  if (page) searchParams.append('page', page.toString());
  if (size) searchParams.append('size', size.toString());

  const fetchUrl = `internal/companies?${searchParams}`;

  const result = await newApiFetch.get(fetchUrl);

  return result.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const companyName = getQueryParam(req.query.name);
  const page = getQueryParam(req.query.page);
  const size = getQueryParam(req.query.size);

  try {
    const companySuggestionResponse = await getCompaniesSuggestions({
      name: companyName,
      page,
      size,
    });

    const filterOutTrustpilot = companySuggestionResponse.companies.filter(
      (company) => company.tag !== 'trustpilot'
    );

    res.status(200).json({
      success: true,
      companies: filterOutTrustpilot,
      pagination: companySuggestionResponse.pagination,
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export default handler;
