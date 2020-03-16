import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
      text-transform: capitalize;
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

const Container = styled('div')<{ backgroundcolor: string | null }>`
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

export type PathParamsType = {
  prevPath: string;
};

export type OwnProps = {
  backgroundColor?: string;
  title?: string;
  children?: React.ReactNode;
};

export type Props = RouteComponentProps<any, any, PathParamsType> & OwnProps;

const WindowRoute = (props: Props) => {
  const [isOpened, setIsOpened] = React.useState(true);
  const [isClosed, setIsClosed] = React.useState(false);
  const [stackId, setStackId] = React.useState(-1);
  const { pop, popById, isAtTop, push } = React.useContext(WindowStackContext);
  const { history, location, backgroundColor, title, children } = props;

  let pose = 'inactive';

  if (stackId !== -1) {
    if (isAtTop && isAtTop(Number(stackId))) {
      pose = 'active';
    }
  }

  React.useEffect(() => {
    if (push) {
      setStackId(push());
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    return () => {
      if (!isClosed && popById && stackId !== -1) {
        popById(stackId);
      }
    };
    // eslint-disable-next-line
  }, [stackId]);

  const close = () => {
    setIsOpened(false);
    setIsClosed(true);
    if (pop) pop();
    setTimeout(() => {
      if (location.state && location.state.prevPath) {
        history.replace(location.state.prevPath);
      } else history.goBack();
    }, 300);
  };

  function renderDialogContent() {
    return (
      <PosedContainer
        backgroundcolor={backgroundColor || null}
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
              <Typography
                data-testid="window-route-title"
                style={{ flex: 1 }}
                variant="h6"
              >
                {title || 'Window Page'}
              </Typography>
            </div>
          </StyledToolbar>
        </StyledAppBar>
        <div className="screen-container">{children}</div>
      </PosedContainer>
    );
  }

  if (typeof window === 'undefined') return renderDialogContent();

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={close}
      TransitionComponent={Transition}
    >
      {renderDialogContent()}
    </Dialog>
  );
};

export default withRouter(WindowRoute);
