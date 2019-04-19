import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import Signup from '../index';
import messages from '../messages';

describe('<Signup />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <Signup />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
