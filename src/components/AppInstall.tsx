import React from 'react';
import styled from 'styled-components';
import {
  ServiceWorkerContext,
  DefaultValue,
} from '../contexts/ServiceWorkerContext';

declare global {
  interface Window {
    serviceWorkerContext: DefaultValue;
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #3498db;
  color: white;
  position: fixed;
  top: 56px;
  align-items: center;
  width: 100%;
  z-index: 1300;

  .left {
    display: flex;
    align-items: center;

    .close {
      font-size: 37pt;
      line-height: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 35px;
      width: 35px;
      font-weight: 100;
      margin-top: -10px;
      transition: 0.3s;

      &:active {
        opacity: 0.3;
        transition: 0.1s;
      }
    }

    .title {
      font-size: 11pt;
      margin-left: 10px;
    }
  }

  .install-button {
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid white;
    transition: 0.3s;

    &:active {
      opacity: 0.3;
      transition: 0.1s;
    }
  }
`;

const BackContainer = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
`;

const AppInstall: React.FunctionComponent = () => {
  const {
    isInstallPromptUIShowed,
    rejectAppInstall,
    showAppInstallPrompt,
  } = React.useContext(ServiceWorkerContext);

  if (!isInstallPromptUIShowed) return <div data-testid="appinstall-empty" />;

  return (
    <React.Fragment>
      <Container>
        <div className="left">
          <div
            className="close"
            onClick={() => {
              if (rejectAppInstall) {
                rejectAppInstall();
              }
            }}
          >
            &times;
          </div>
          <div className="title">Keep track of application process</div>
        </div>

        <div
          className="install-button"
          onClick={() => {
            if (showAppInstallPrompt) showAppInstallPrompt();
          }}
        >
          Install
        </div>
      </Container>
      <BackContainer />
    </React.Fragment>
  );
};

export default AppInstall;
