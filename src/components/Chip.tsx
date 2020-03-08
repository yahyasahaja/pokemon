import React from 'react';
import styled from 'styled-components';
import { convertDashedToReadable } from '../utils';

const StyledChip = styled.div`
  margin-right: 20px;
  margin-bottom: 10px;
  background: #3498db;
  color: white;
  border-radius: 100px;
  padding: 10px 20px;
  text-transform: capitalize;
`;

export type Props = {
  value: string;
  className: string;
};

export const Chip = (props: any) => {
  const { value, className } = props;

  return (
    <StyledChip className={className || ''}>
      {convertDashedToReadable(value)}
    </StyledChip>
  );
};

export default Chip;
