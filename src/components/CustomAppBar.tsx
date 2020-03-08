import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { MainRouterContext } from '../contexts/MainRouterContext';

const StyledAppBar = styled(AppBar)`
  && {
    padding: 0px;
    background: white;
    color: #424242;
    /* border-bottom: 1px solid #dadada; */
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06),
      0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 24px 0px rgba(0, 0, 0, 0.12);
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: space-between;
    min-height: 55px;
    min-width: 200px;

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:visited {
        text-decoration: none;
        color: inherit;
      }

      .title {
        margin-left: 20px;
        font-weight: bold;
        display: flex;
        width: 100px;
      }

      .logo {
        height: 45px;
        padding: 10px 0;

        img {
          height: 100%;
        }
      }
    }
  }
`;

type Props = {
  component?: React.ReactNode;
};

const CustomAppBar = (props: Props) => {
  const { selectedRoute } = React.useContext(MainRouterContext);
  const { component } = props;

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Link className="info" to="/">
          <div className="logo">
            <img src="/logo512.png" alt="logo" />
          </div>

          <span data-testid="appbar-title" className="title">
            {selectedRoute && selectedRoute.label}
          </span>
        </Link>

        {component}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default CustomAppBar;
