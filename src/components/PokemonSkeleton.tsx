import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled('div')<{ margin: boolean }>`
  display: block;
  width: 40vw;
  max-height: 300px;
  overflow: hidden;
  margin: ${({ margin }) => (margin ? '10px' : '0px')};
`;

const PokemonSkeleton = (props: { margin?: boolean }) => {
  const { margin } = props;

  return (
    <Container margin={!!margin}>
      <Skeleton width="100%" height="40vw" />
      <Skeleton width="100%" height={50} />
    </Container>
  );
};

export default PokemonSkeleton;
