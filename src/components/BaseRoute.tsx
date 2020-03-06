import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import AppInstall from './AppInstall';
import { ServiceWorkerContext } from '../contexts/ServiceWorkerContext';
import { WindowStackContext } from '../contexts/WindowStackContext';

const Container = styled.div`
  display: block;
  padding-top: 45px;
  height: 100vh;
  min-height: 100vh;
`;

const PosedContainer = posed(Container)({
  active: { x: 0, transition: { duration: 300 } },
  inactive: { x: -150, transition: { duration: 700 } },
});

const BaseRoute = (props: any) => {
  const { isInstallPromptUIShowed } = React.useContext(ServiceWorkerContext);

  const { isWindowActive } = React.useContext(WindowStackContext);

  return (
    <PosedContainer
      appinstall={isInstallPromptUIShowed}
      pose={isWindowActive ? 'inactive' : 'active'}
      initialPose="active"
    >
      <AppInstall />
      {props.children}
    </PosedContainer>
  );
};

export default BaseRoute;
