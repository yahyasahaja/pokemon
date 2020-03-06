import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import posed from 'react-pose';
import { WindowStackContext } from '../contexts/WindowStackContext';
import MDIcon from './MDIcon';

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 47px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
    }

    .logo {
      height: 33px;
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      left: 0;

      @media only screen and (max-width: 800px) {
        display: none;
      }

      img {
        height: 100%;
      }
    }
  }
`;

const StyledAppBar = styled(AppBar)`
  && {
    color: inherit;
    background-color: white;
    box-shadow: 1px 1px 10px #0000002b;
  }
`;

const Container = styled('div')<{ backgroundcolor: string }>`
  height: 100vh;
  overflow: hidden;
  padding-top: 47px;
  background: ${({ backgroundcolor }) => backgroundcolor || 'white'};

  .screen-container {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }
`;

const PosedContainer = posed(Container)({
  active: { x: 0, transition: { duration: 300 } },
  inactive: { x: -150, transition: { duration: 700 } },
});

const Transition: any = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export {};

const WindowRoute = (props: any) => {
  const stackId = null;
  const [isOpened, setIsOpened] = React.useState(true);
  const { pop, isAtTop } = React.useContext(WindowStackContext);
  const { history, backPath, backgroundColor, title, children } = props;

  let pose = 'inactive';

  if (stackId) {
    if (isAtTop && isAtTop(stackId)) {
      pose = 'active';
    }
  }

  const close = () => {
    setIsOpened(false);

    if (pop) pop();
    setTimeout(() => {
      if (backPath) return history.replace(backPath);
      else history.goBack();
    }, 300);
  };

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={close}
      TransitionComponent={Transition}
    >
      <PosedContainer
        backgroundcolor={backgroundColor}
        pose={pose}
        initialPose="active"
        withParent={false}
      >
        <StyledAppBar>
          <StyledToolbar>
            <div className="logo">
              <img src="/images/blockchain.png" alt="" />
            </div>

            <div className="left">
              <IconButton edge="start" color="inherit" onClick={close}>
                <MDIcon icon="chevron-left" />
              </IconButton>
              <Typography style={{ flex: 1 }} variant="h6">
                {title || 'Window Page'}
              </Typography>
            </div>
          </StyledToolbar>
        </StyledAppBar>
        <div className="screen-container">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              stackId: stackId,
            })
          )}
        </div>
      </PosedContainer>
    </Dialog>
  );
};

export default withRouter(WindowRoute);
