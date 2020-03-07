import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components';
import {
  NavigationProps,
  MainRouterContext,
} from '../contexts/MainRouterContext';

const StyledBottomNavigation = styled(BottomNavigation)`
  && {
    width: 100%;
    height: 55px;

    .MuiBottomNavigationAction-root {
      min-width: 50px;
    }
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
