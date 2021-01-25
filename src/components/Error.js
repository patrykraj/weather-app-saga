import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ErrorNotification({ err }) {
  return (
      <>
        <ErrorStatus>Error status: {err}</ErrorStatus>
        <ErrorElement>
          City not found
        </ErrorElement>
      </>
  );
}

export default ErrorNotification;

const ErrorElement = styled.p`
    color: #ec544c;
    font-size: 24px;
    margin: 5px 0 20px;
`;

const ErrorStatus = styled.p`
  font-size: 14px;
  margin: 0;
`;

ErrorNotification.propTypes = {
  err: PropTypes.string,
};

ErrorNotification.defaultProps = {
  err: null,
};
