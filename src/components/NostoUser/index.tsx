import * as React from "react";

import { reloadNosto } from  "../../core/nosto/utils";
import { UserContextInterface } from "../User/context";

export interface CartProps {
  id: string;
}

class NostoUser extends React.Component<{ user: UserContextInterface; }> {

  state = {
    user: {}
  }

  static getDerivedStateFromProps(props, state) {
    if (!state || props.user !== state.user) {
      reloadNosto();
      return {
        user: props.user,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  render() {
    return (
      this.props.user.user ? (
        <div className="nosto_customer" style={{display: 'none' }}>
          <span className="email">{this.props.user.user.email}</span>
          <span className="first_name">{this.props.user.user.firstName}</span>
          <span className="last_name">{this.props.user.user.lastName}</span>
          <span className="customer_reference">{this.props.user.user.id}</span>
          <span className="marketing_permission">true</span>
        </div>
      ) : (
        <div className="nosto_customer" style={{display: 'none' }}>
        </div>
      )
    );
  };
};

export default NostoUser;
