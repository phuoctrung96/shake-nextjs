import axios, { AxiosRequestConfig } from 'axios';

export const newApiFetch = axios.create({
  baseURL: `${process.env.DATASHAKE_FETCH_URL}`,
  timeout: 180000,
  params: {
    api_key: process.env.DATASHAKE_API_KEY,
  },
});

export const newFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FETCH_URL}api`,
  timeout: 180000,
});

type AxiosConfigType = AxiosRequestConfig<{ meta: string }>;
if (process.env.API_DEBUG === 'true') {
  newApiFetch.interceptors.request.use((x: AxiosConfigType) => {
    // to avoid overwriting if another interceptor
    // already defined the same object (meta)

    // @ts-ignore
    x.meta = x.meta || {};
    // @ts-ignore
    x.meta.requestStartedAt = new Date().getTime();
    return x;
  });
  newFetch.interceptors.request.use((x: AxiosRequestConfig) => {
    // to avoid overwriting if another interceptor
    // already defined the same object (meta)

    // @ts-ignore
    x.meta = x.meta || {};
    // @ts-ignore
    x.meta.requestStartedAt = new Date().getTime();
    return x;
  });

  newFetch.interceptors.response.use(
    (x) => {
      console.log(
        `Execution time for: ${x.config.url} - ${
          // @ts-ignore
          new Date().getTime() - x.config.meta.requestStartedAt
        } ms`
      );
      return x;
    }, // Handle 4xx & 5xx responses
    (x) => {
      console.error(
        `Execution time for: ${x.config.url} - ${
          new Date().getTime() - x.config.meta.requestStartedAt
        } ms`
      );
      throw x;
    }
  );

  newApiFetch.interceptors.response.use(
    (x) => {
      console.log(
        `Execution time for: ${x.config.url} - ${
          // @ts-ignore
          new Date().getTime() - x.config.meta.requestStartedAt
        } ms`
      );
      return x;
    }, // Handle 4xx & 5xx responses
    (x) => {
      console.error(
        `Execution time for: ${x.config.url} - ${
          new Date().getTime() - x.config.meta.requestStartedAt
        } ms`
      );
      throw x;
    }
  );
}
