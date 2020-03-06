import React, { Component } from 'react';

type DefaultValue = {
  windows: number[];
  push?: () => number;
  pop?: () => number;
  popById?: (id: number) => number;
  reset?: () => void;
  isPopupActive?: () => boolean;
  isAtTop?: (id: number) => boolean;
};

export const defaultValue: DefaultValue = {
  windows: [],
};

export const ServiceWorkerContext = React.createContext(defaultValue);

export class ServiceWorkerStore extends Component {
  state = defaultValue;

  push() {
    const id = this.state.windows.length;
    this.state.windows.push(id);
    this.setState({
      windows: this.state.windows.slice(),
    });

    return id;
  }

  pop() {
    this.state.windows.pop();
    this.setState({ ...this.state.windows });
    return this.state.windows.length;
  }

  popById(id: number) {
    this.state.windows.splice(this.state.windows.indexOf(id), 1);
    return this.state.windows.length;
  }

  reset() {
    this.setState({
      windows: [],
    });
  }

  isPopupActive() {
    return this.state.windows.length > 0;
  }

  isAtTop(id: number) {
    if (this.state.windows.length > 0) {
      return this.state.windows[this.state.windows.length - 1] === id;
    }
    return false;
  }

  render() {
    return (
      <ServiceWorkerContext.Provider
        value={{
          ...this.state,
          push: this.push,
          pop: this.pop,
          popById: this.popById,
          reset: this.reset,
          isPopupActive: this.isPopupActive,
          isAtTop: this.isAtTop,
        }}
      >
        {this.props.children}
      </ServiceWorkerContext.Provider>
    );
  }
}

type WithServiceWorkerType = (
  Component: React.ComponentClass
) => (props: any) => React.ReactNode;
export const withServiceWorker: WithServiceWorkerType = Comp => props => (
  <ServiceWorkerContext.Consumer>
    {serviceWorkerContext => (
      <Comp {...props} overlayLoadingContext={serviceWorkerContext} />
    )}
  </ServiceWorkerContext.Consumer>
);
