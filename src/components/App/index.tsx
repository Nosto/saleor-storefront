import "./scss/index.scss";

import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import { maybe } from "../../core/utils";
import CartProvider from "../CartProvider";
import { CartContext } from "../CartProvider/context";
import NostoCart from "../NostoCart"
import NostoUser from "../NostoUser"
import { ShopContext } from "../ShopProvider/context";
import { UserContext } from "../User/context";
import { Routes } from "./routes";

const App: React.FC = () => (
  <>
    <MetaConsumer />
    <CartContext.Consumer>
      {cart => <NostoCart cart={cart}></NostoCart>}
    </CartContext.Consumer>
    <UserContext.Consumer>
      {user => <NostoUser user={user}></NostoUser>}
    </UserContext.Consumer>
    <header>
      <MainMenu />
    </header>
    <Routes />
    <Footer />
    <OverlayManager />
  </>
);

export default App;
