import React from 'react';
import ErrorPage from '../components/route/error-page/ErrorPage';

const Error404 = () => {
  return (
    <>
      <ErrorPage errorMessage="Ooops, something went wrong. Try again later." hideImage />
    </>
  );
};

export default Error404;
