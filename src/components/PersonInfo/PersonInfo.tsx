import React from "react";

import "./PersonInfo.css";

export interface Person {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
}

interface PersonInfoProps extends Person {}

export function PersonInfo({
  firstNameLastName,
  jobTitle,
  emailAddress,
}: PersonInfoProps) {
  return (
    <div className="person-info">
      <div className="person-info__name">{firstNameLastName}</div>
      <div className="person-info__jobTitle">{jobTitle}</div>
      <div className="person-info__email">{emailAddress}</div>
    </div>
  );
}
