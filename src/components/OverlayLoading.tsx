import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { OverlayLoadingContext } from '../contexts/OverlayLoadingContext';

const StyledOverlayLoading = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .overlay-loading-2 {
    padding: 20px 30px;
    border-radius: 20px;
    background: white;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    font-size: 17pt;

    .wrapper {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
`;

const OverlayLoading = () => {
  const { isOpened } = React.useContext(OverlayLoadingContext);

  if (!isOpened) return <div></div>;

  return (
    <StyledOverlayLoading data-testid="overlay-loading">
      <div className="overlay-loading">
        <div className="overlay-loading-2">
          <div className="wrapper">
            <CircularProgress />
          </div>
          <div>Processing ..</div>
        </div>
      </div>
    </StyledOverlayLoading>
  );
};

export default OverlayLoading;
