import React from 'react';
import { PokemonListItem } from '../contexts/PokemonContext';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { MyPokemonContext } from '../contexts/MyPokemonContext';

const StyledPokemonCard = styled.div`
  display: block;
  border-radius: 20px;
  background: white;
  box-shadow: 1px 1px 60px 0px #00000017;
  margin: 20px 10px;
  margin-top: 10px;
  overflow: hidden;
  max-width: 350px;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  width: 40vw;
  border: 1px solid #d4d4d4;

  @media only screen and (min-width: 800px) {
    margin: 40px;
    box-shadow: 10px 10px 60px 0px #00000040;
  }

  &:active {
    opacity: 0.3;
    transition: 0.03s;
  }

  .picture {
    width: 100%;
    height: 40vw;
    padding: 10px;
    max-height: 300px;

    span {
      height: 100%;
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .details {
    display: block;
    padding: 10px;

    .name {
      font-size: 15pt;
      font-weight: 500;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
      text-transform: capitalize;
      text-align: center;
      margin-top: 10px;
    }

    .owned {
      text-align: center;
      color: #0098e1;
    }
  }
`;

export interface Props extends RouteComponentProps {
  data: PokemonListItem;
}

const PokemonCard = (props: Props) => {
  const { data, history, location } = props;
  const { isOwned } = React.useContext(MyPokemonContext);

  return (
    <StyledPokemonCard
      onClick={() => {
        history.push({
          pathname: `${location.pathname}/${data.name}`,
          state: {
            prevPath: location.pathname,
          },
        });
      }}
    >
      <div className="picture">
        <LazyLoadImage
          alt="profile picture"
          placeholderSrc="/images/placeholder.png"
          src={data.image_url}
          effect="blur"
        />
      </div>

      <div className="details">
        <div data-testid="pokemon-card-name" className="name">
          {data.name}
        </div>
        {isOwned && isOwned(data.name) && (
          <div data-testid="pokemon-card-owned" className="owned">
            Owned
          </div>
        )}
      </div>
    </StyledPokemonCard>
  );
};

export default withRouter(PokemonCard);
