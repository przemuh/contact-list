import * as React from "react";

import "./Loader.css";

export const Loader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="lds-ring" {...props}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
