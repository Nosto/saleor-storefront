import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { TypedOrderDetailsQuery } from "./queries";
import Page from "./Page";

const View: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => (
  <TypedOrderDetailsQuery
    loaderFull
    variables={{
      orderId: match.params.id
    }}
    errorPolicy="all"
    key={match.params.id}
  >
    {({ data }) => (
      <NetworkStatus>
        {isOnline => {
          const { order } = data;

          if (order === null) {
            return <NotFound />;
          }

          if (!isOnline) {
            return <OfflinePlaceholder />;
          }

          return (
            <Page order={order} />
          );
        }}
      </NetworkStatus>
    )}
  </TypedOrderDetailsQuery>
);

export default View;
