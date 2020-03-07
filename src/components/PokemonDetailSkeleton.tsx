import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled('div')<{ margin: boolean }>`
  display: block;

  .item {
    margin: 10px 0;
  }

  .chips {
    margin: 30px 0;
    display: flex;

    .chip {
      margin: 10px;
    }
  }
`;

const PokemonDetailSkeleton = (props: { margin?: boolean }) => {
  const { margin } = props;

  return (
    <Container margin={!!margin}>
      <Skeleton width="100%" height="300px" />
      <div className="item">
        <Skeleton width="50%" height={30} />
      </div>
      <div className="item">
        <Skeleton width="30%" height={20} />
      </div>
      <div className="chips">
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
      </div>
      <div className="chips">
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
        <div className="chip">
          <Skeleton width="50px" height={30} />
        </div>
      </div>
    </Container>
  );
};

export default PokemonDetailSkeleton;
