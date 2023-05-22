import React from 'react';
import ErrorPage from '../components/route/error-page/ErrorPage';
import { NextPageContext } from 'next';
import Rollbar from 'rollbar';

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <ErrorPage
      errorMessage={
        statusCode === 404
          ? 'Page Not Found'
          : 'Ooops, something went wrong, please try again later'
      }
      hideImage={statusCode === 404}
    />
  );
};

Error.getInitialProps = async ({ req, res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  console.log('initial props', statusCode);
  if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_ENV === 'production') {
    console.log('Reporting error to Rollbar...');

    const rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_SERVER_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
    });

    const error = err ? err : 'General Error';

    rollbar.error(error, req, (rollbarError: any) => {
      if (rollbarError) {
        console.error('Rollbar error reporting failed:');
        console.error(rollbarError);

        return;
      }

      console.log('Reported error to Rollbar');
    });
  }

  return { statusCode };
};

export default Error;
