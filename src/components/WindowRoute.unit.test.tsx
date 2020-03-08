import React from 'react';
import WindowRoute from './WindowRoute';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

describe('<WindowRoute/>', () => {
  it('Should render given title', () => {
    const title = 'Yayyyy';
    const wrapper = mount(
      <BrowserRouter>
        <WindowRoute title={title} />
      </BrowserRouter>
    );

    expect(wrapper.find('h6[data-testid="window-route-title"]').text()).toEqual(
      title
    );
    wrapper.unmount();
  });
});
