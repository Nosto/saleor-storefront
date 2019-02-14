import * as React from "react";

export interface PlacementProps {
  id: string;
}

const Placement: React.FC<PlacementProps> = ({
  children,
  id
}) => (
  <div className="nosto_element" id={id}>
    {children}
  </div>
);

export default Placement;
