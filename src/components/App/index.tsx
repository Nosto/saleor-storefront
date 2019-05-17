import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import NostoCart from "../NostoCart"
import NostoUser from "../NostoUser"
import { CartContext } from "../CartProvider/context";
import { UserContext } from "../User/context";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import { isPath } from "../../core/utils";
import { orderConfirmationUrl, Routes } from "./routes";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname }
  }
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu />
        <CartContext.Consumer>
          {cart => <NostoCart cart={cart}></NostoCart>}
        </CartContext.Consumer>
        <UserContext.Consumer>
          {user => <NostoUser user={user}></NostoUser>}
        </UserContext.Consumer>
      </header>
      <Routes />
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
