import * as React from "react";

import { NostoContext, NostoInterface } from "./context";


interface NostoProviderProps {
  account: string;
}

declare global {
  interface Window {
      nostojs: any;
      nosto: any;
  }
}

window.nostojs = window.nostojs || {};

type NostoProviderState = NostoInterface;

export default class NostoProvider extends React.Component<
  NostoProviderProps,
  NostoProviderState
> {
  constructor(props: NostoProviderProps) {
    super(props);

    this.state = {
      account: props.account,
      loading: false
    };
  }

  componentDidMount () {
      const script = document.createElement("script");
      script.type = 'text/javascript';
      script.src = "//my.dev.nos.to/include/" + this.state.account;
      script.async = true;
      document.body.appendChild(script);

  }

  render() {
    return (
      <NostoContext.Provider value={this.state}>
        {this.props.children}
      </NostoContext.Provider>
    );
  }
}
