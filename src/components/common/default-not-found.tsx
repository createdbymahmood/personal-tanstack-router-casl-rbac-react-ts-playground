import * as React from "react";

export const DefaultNotFound: React.FC = props => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      {...props}
    >
      404
    </div>
  );
};
