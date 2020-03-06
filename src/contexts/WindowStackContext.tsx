import React, { Component } from 'react';

type DefaultValue = {
  windows: number[];
  push?: () => number;
  pop?: () => number;
  popById?: (id: number) => number;
  reset?: () => void;
  isWindowActive?: () => boolean;
  isAtTop?: (id: number) => boolean;
};

export const defaultValue: DefaultValue = {
  windows: [],
};

export const WindowStackContext = React.createContext(defaultValue);

export class WindowStackStore extends Component {
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

  isWindowActive() {
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
