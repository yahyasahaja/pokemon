import React from 'react';
import styled from 'styled-components';

import { Route } from 'react-router-dom';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import BaseRoute from '../components/BaseRoute';
import PokemonSkeleton from '../components/PokemonSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import asyncComponent from '../components/AsyncComponent';
import CustomAppBar from '../components/CustomAppBar';

const PokemonDetails = asyncComponent(() =>
  import(/*webpackChunkName: "PokemonDetails"*/ './PokemonDetails')
);

const Container = styled.div`
  padding: 15px;
  padding-top: 25px;
  padding-bottom: 70px;

  .card-wrapper,
  .skeleton-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: white;
  }
`;

const Pokemons = () => {
  const {
    pokemons,
    isFetchingPokemons,
    resetAndFetch,
    next,
    hasNext,
  } = React.useContext(PokemonContext);

  React.useEffect(() => {
    if (resetAndFetch) resetAndFetch();
    // eslint-disable-next-line
  }, [])

  function renderPokemons() {
    return (
      <InfiniteScroll
        dataLength={pokemons.length} //This is important field to render the next data
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        next={next || (() => {})}
        hasMore={hasNext}
        loader={
          <div className="skeleton-wrapper">
            <PokemonSkeleton margin />
            <PokemonSkeleton margin />
          </div>
        }
        style={{ overflow: 'unset' }}
      >
        <div className="card-wrapper">
          {pokemons.map((d, i) => (
            <PokemonCard key={i} data={d} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  function renderLoading() {
    if (isFetchingPokemons && pokemons.length === 0) {
      return (
        <div className="skeleton-wrapper">
          <PokemonSkeleton margin />
          <PokemonSkeleton margin />
          <PokemonSkeleton margin />
          <PokemonSkeleton margin />
        </div>
      );
    }
  }

  return (
    <BaseRoute>
      <CustomAppBar />
      <Container>
        {renderPokemons()}
        {renderLoading()}
        <Route path="/pokemons/:name" component={PokemonDetails} />
      </Container>
    </BaseRoute>
  );
};

export default Pokemons;
