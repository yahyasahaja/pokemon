import React, { Component } from 'react';
import { APP_INSTALL_STATUS_URI } from '../config';

type DefaultValue = {
  shouldUpdate: boolean;
  countDown: number;
  intervalId: number | null;
  isNotificationAllowed: boolean;
  appInstallationStatus: string;
  isInstallPromptUIShowed: boolean;
  updateServiceWorker?: () => void;
  refreshPage?: () => void;
  checkAppInstalledStatus?: () => void;
  showAppInstallPrompt?: () => void;
  rejectAppInstall?: () => void;
};

export const defaultValue: DefaultValue = {
  shouldUpdate: false,
  countDown: 5,
  intervalId: null,
  isNotificationAllowed: false,
  appInstallationStatus: 'unset',
  isInstallPromptUIShowed: false,
};

export const ServiceWorkerContext = React.createContext(defaultValue);

export class ServiceWorkerStore extends Component<any, DefaultValue> {
  state = defaultValue;
  deferredAppInstallPrompt: any = null;

  updateServiceWorker = () => {
    this.setState(
      {
        countDown: 5,
        shouldUpdate: true,
      },
      () => {
        this.setState({
          intervalId: setInterval(() => {
            this.setState(
              {
                countDown: this.state.countDown - 1,
              },
              () => {
                if (this.state.countDown <= 0) {
                  if (this.state.intervalId)
                    clearInterval(this.state.intervalId);
                  this.refreshPage();
                }
              }
            );
          }, 1000),
        });
      }
    );
  };

  refreshPage = () => {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      if (reg) {
        reg.unregister().then(function() {
          window.location.reload(true);
        });
      } else {
        window.location.reload(true);
      }
    });
  };

  checkAppInstalledStatus = () => {
    this.setState({});
    window.addEventListener('beforeinstallprompt', e => {
      // Stash the event so it can be triggered later.
      e.preventDefault();
      this.deferredAppInstallPrompt = e;
      const status = localStorage.getItem(APP_INSTALL_STATUS_URI);
      if (!status) {
        this.setState({
          appInstallationStatus: 'unset',
          isInstallPromptUIShowed: true,
        });
      } else {
        this.setState({
          appInstallationStatus: status,
        });
      }
    });
  };

  async showAppInstallPrompt() {
    if (!this.deferredAppInstallPrompt) return;

    this.setState({
      isInstallPromptUIShowed: false,
    });
    this.deferredAppInstallPrompt.prompt();

    const choiceResult = await this.deferredAppInstallPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('A2HS accepted');
    } else {
      console.log('A2HS dismissed');
    }

    this.setState({
      appInstallationStatus: choiceResult.outcome,
    });
    localStorage.setItem(APP_INSTALL_STATUS_URI, choiceResult.outcome);
    this.deferredAppInstallPrompt = null;
  }

  rejectAppInstall() {
    this.setState({
      appInstallationStatus: 'dismissed',
    });
    localStorage.setItem(APP_INSTALL_STATUS_URI, 'dismissed');
    this.setState({
      isInstallPromptUIShowed: false,
    });
  }

  render() {
    return (
      <ServiceWorkerContext.Provider
        value={{
          ...this.state,
          updateServiceWorker: this.updateServiceWorker,
          refreshPage: this.refreshPage,
          checkAppInstalledStatus: this.checkAppInstalledStatus,
          showAppInstallPrompt: this.showAppInstallPrompt,
          rejectAppInstall: this.rejectAppInstall,
        }}
      >
        {this.props.children}
      </ServiceWorkerContext.Provider>
    );
  }
}

type WithServiceWorkerType = (
  Component: React.ComponentClass
) => (props: any) => React.ReactNode;
export const withServiceWorker: WithServiceWorkerType = Comp => props => (
  <ServiceWorkerContext.Consumer>
    {serviceWorkerContext => (
      <Comp {...props} overlayLoadingContext={serviceWorkerContext} />
    )}
  </ServiceWorkerContext.Consumer>
);
