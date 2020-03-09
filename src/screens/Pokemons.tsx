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
import { MyPokemonContext } from '../contexts/MyPokemonContext';

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
    align-items: stretch;
    flex-wrap: wrap;
    background: white;
  }

  .logo-wrapper {
    display: block;
    border-radius: 20px;
    background: white;
    box-shadow: 1px 1px 60px 0px #00000017;
    margin: 10px auto;
    max-width: 350px;
    transition: 0.3s;
    border: 1px solid #d4d4d4;
    padding: 20px;

    .logo-pokemon {
      width: 100%;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .total-caught {
      margin-top: 20px;
      text-align: center;

      .title {
        font-size: 14pt;
        font-weight: bold;
      }
    }
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

  const { myPokemons } = React.useContext(MyPokemonContext);

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
        <div className="logo-wrapper">
          <div className="logo-pokemon">
            <img src="/logo512.png" alt="" />
          </div>
          <div className="total-caught">
            <div className="title">Pokemon App</div>
            Total pokemon caught: {myPokemons.length}
          </div>
        </div>
        {renderPokemons()}
        {renderLoading()}
        <Route path="/pokemons/:name" component={PokemonDetails} />
      </Container>
    </BaseRoute>
  );
};

export default Pokemons;
