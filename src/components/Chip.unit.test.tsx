import React from 'react';
import { shallow } from 'enzyme';
import Chip from './Chip';

describe('Test for component <MDIcon />', () => {
  it('Should render the given children', () => {
    const dashedString = 'yahya-asti-yayy';
    const wrapper = shallow(<Chip value={dashedString} />);

    expect(wrapper.text()).toContain('yahya asti yayy');
    wrapper.unmount();
  });
});
