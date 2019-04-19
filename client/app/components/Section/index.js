/**
*
* Section
*
*/

import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 0 10px 4px rgba(78, 116, 124, 0.08);
  margin: 16px 16px 32px;
  padding: 32px 24px;
  position: relative;
  &:last-child {
    margin-bottom: 20px;
  }
`;

export default Section;
