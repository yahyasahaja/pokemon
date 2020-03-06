import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import AppInstall from './AppInstall';

const Container = styled.div`
  display: block;
  padding-top: 45px;
  height: 100vh;
  min-height: 100vh;
`

const PosedContainer = posed(Container)({
  active: { x: 0, transition: { duration: 300 } },
  inactive: { x: -150, transition: { duration: 700 } }
})

class BaseRoute extends Component {
  render() {
    return (
      <PosedContainer 
        appinstall={serviceWorker.isInstallPromptUIShowed}
        pose={popupStack.isPopupActive ? 'inactive' : 'active'} initialPose="active">
        <AppInstall />
        {this.props.children}
      </PosedContainer>
    )
  }
}

export default BaseRoute