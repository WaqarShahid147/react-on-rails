import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import Login from '../index';
import messages from '../messages';

describe('<Login />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <Login />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
