function Error({ statusCode }) {
  let message = '';
  switch (statusCode) {
    case 400:
      message = 'bad request';
      break;
    case 401:
      message = 'Unauthorized';
      break;
    case 403:
      message = 'Forbidden';
      break;
    case 404:
      message = 'Not Found';
      break;
    case 500:
      message = 'server error';
      break;
    default:
      message = statusCode;
  }
  return (
    <p style={{ fontSize: 16 }}>
      {message}
      {/* {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'} */}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
