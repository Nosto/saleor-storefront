import * as React from "react";

import { RouteComponentProps, withRouter } from 'react-router-dom';


export interface PlacementProps extends RouteComponentProps<any> {
  id: string;
}

class Placement extends React.Component<PlacementProps> {

  handleClick = (e) => {
    const targetLink = e.target.closest('a');
    if (!targetLink) {
      return;
    } else {
      e.preventDefault();
      const l = targetLink.href.replace("http://saleor.dev.nos.to/en/products/", "/product/").replace(/(.*\-)(\d*)\/\?(.*)/, "$1/$2?$3");
      this.props.history.push(l);
    }
  };

  render() {
    return (
      <div
        className="nosto_element"
        id={this.props.id}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  };
};

export default withRouter<PlacementProps>(Placement);
