//MODULES
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import styled from 'styled-components';
//COMPONENT
import { SnackbarContext } from '../contexts/SnackbarContext';

const PageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20000;
`;

type Load = () => Promise<any>;

type Props = {
  load: Load
};

export const AsyncComponent = (props: Props) => {
  const [ Comp, setComponent ] = React.useState<any>(null);
  const [ loading, setLoading ] = React.useState(true);
  const snackbarContext = React.useContext(SnackbarContext);

  React.useEffect(() => {
    setLoading(true);
    const fetchComponent = async() => {
      try {
        const modules = await props.load();
        setLoading(false);
        setComponent(() => modules.default);
      } catch (err) {
        if (snackbarContext.show) snackbarContext.show(
          'Error loading page, please refresh page',
          {
            severity: 'error'
          }
        );
        console.log('ERROR WHILE LOADING PAGE ROUTE', err);
      }
    };

    fetchComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (
    <PageLoading>
      <LinearProgress />
    </PageLoading>
  );

  if (Comp) return <Comp {...props} />;
  return <div>404 Not Found</div>;
};

type AsyncComponentFunctionType = (load: Load) => React.FunctionComponent;
export const asyncComponent: AsyncComponentFunctionType = load => props => (
  <AsyncComponent load={load} {...props} />
);

//DEFAULTS
export default asyncComponent;