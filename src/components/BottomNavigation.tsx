import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import {
  NavigationProps,
  MainRouterContext,
} from '../contexts/MainRouterContext';

const StyledBottomNavigation = styled(BottomNavigation)`
  && {
    width: 100%;
    height: 47px;

    .MuiBottomNavigationAction-root {
      min-width: 50px;
    }
  }
`;

const StyledFab = styled(Fab)`
  && {
    box-shadow: none;
  }
`;

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #dadada;
  background: #ecf0f1;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06),
    0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 24px 0px rgba(0, 0, 0, 0.12);

  .icon {
    width: 1em;
    height: 1em;
    font-size: 1.7rem;
    line-height: 1;
  }

  .qr-code {
    display: flex;
    position: absolute;
    top: -20px;
    border-radius: 50px;
    background: #009cff;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -4px 8px #c3c3c3;
    left: 50%;
    transform: translateX(-50%);

    .qr-icon {
      color: white;
      font-size: 20pt;
    }
  }
`;

const CustomBottomNavigation = (props: RouteComponentProps) => {
  const { history } = props;
  const { routers, selectedPath, updateRouter } = React.useContext(
    MainRouterContext
  );

  return (
    <Container>
      <React.Fragment>
        <StyledBottomNavigation
          value={selectedPath}
          onChange={(e, path) => {
            if (updateRouter) updateRouter(path);
            history.push(path);
          }}
        >
          {routers.map((d: NavigationProps, i: number) => {
            return (
              <BottomNavigationAction
                key={i}
                label={d.label}
                value={d.path}
                icon={
                  <div
                    className={`icon mdi mdi-${d.icon}${
                      d.outline && selectedPath !== d.path ? '-outline' : ''
                    }`}
                  />
                }
              />
            );
          })}
        </StyledBottomNavigation>
      </React.Fragment>
    </Container>
  );
};

export default withRouter(CustomBottomNavigation);
