import React from 'react';
import AppInstall from './AppInstall';
import { mount } from 'enzyme';
import { ServiceWorkerContext } from '../contexts/ServiceWorkerContext';

describe('<AppInstall/>', () => {
  it('Should render empty div if the app does not need to show AppInstall', () => {
    const wrapper = mount(
      <ServiceWorkerContext.Provider
        value={{
          shouldUpdate: false,
          countDown: 5,
          intervalId: null,
          isNotificationAllowed: false,
          appInstallationStatus: 'unset',
          isInstallPromptUIShowed: false,
        }}
      >
        <AppInstall />
      </ServiceWorkerContext.Provider>
    );

    expect(wrapper.find('[data-testid="appinstall-empty"]').exists()).toEqual(
      true
    );
    wrapper.unmount();
  });

  it('Should render empty div if the app needs to show AppInstall', () => {
    const wrapper = mount(
      <ServiceWorkerContext.Provider
        value={{
          shouldUpdate: false,
          countDown: 5,
          intervalId: null,
          isNotificationAllowed: false,
          appInstallationStatus: 'unset',
          isInstallPromptUIShowed: true,
        }}
      >
        <AppInstall />
      </ServiceWorkerContext.Provider>
    );

    expect(wrapper.find('[data-testid="appinstall-empty"]').exists()).toEqual(
      false
    );
    wrapper.unmount();
  });
});
