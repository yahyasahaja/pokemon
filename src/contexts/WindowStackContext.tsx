import React, { Component } from 'react';

interface Actions {
  push?: () => number;
  pop?: () => number;
  popById?: (id: number) => number;
  reset?: () => void;
  readonly isWindowActive?: boolean;
  isAtTop?: (id: number) => boolean;
}

interface DefaultValue extends Actions {
  windows: number[];
}

export const defaultValue: DefaultValue = {
  windows: [],
};

export const WindowStackContext = React.createContext(defaultValue);

export class WindowStackStore extends Component implements Actions {
  state = defaultValue;

  push = () => {
    const id = this.state.windows.length;
    this.state.windows.push(id);
    this.setState({
      windows: this.state.windows.slice(),
    });

    return id;
  };

  pop = () => {
    this.state.windows.pop();
    this.setState({ ...this.state.windows });
    return this.state.windows.length;
  };

  popById = (id: number) => {
    this.state.windows.splice(this.state.windows.indexOf(id), 1);
    this.setState({ ...this.state.windows });
    return this.state.windows.length;
  };

  reset = () => {
    this.setState({
      windows: [],
    });
  };

  get isWindowActive() {
    return this.state.windows.length > 0;
  }

  isAtTop = (id: number) => {
    if (this.state.windows.length > 0) {
      return this.state.windows[this.state.windows.length - 1] === id;
    }
    return false;
  };

  render() {
    return (
      <WindowStackContext.Provider
        value={{
          ...this.state,
          push: this.push,
          pop: this.pop,
          popById: this.popById,
          reset: this.reset,
          isWindowActive: this.isWindowActive,
          isAtTop: this.isAtTop,
        }}
      >
        {this.props.children}
      </WindowStackContext.Provider>
    );
  }
}

type WithWindowStackType = (
  Component: React.ComponentClass
) => (props: any) => React.ReactNode;
export const withWindowStack: WithWindowStackType = Comp => props => (
  <WindowStackContext.Consumer>
    {serviceWorkerContext => (
      <Comp {...props} overlayLoadingContext={serviceWorkerContext} />
    )}
  </WindowStackContext.Consumer>
);
