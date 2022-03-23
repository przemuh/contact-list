import React from "react";

import "./PersonInfo.css";

export interface Person {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
}

interface PersonInfoProps extends Person {
  selected?: boolean;
  onClick: (personId: string) => void;
}

export function PersonInfo({
  id,
  firstNameLastName,
  jobTitle,
  emailAddress,
  onClick,
  selected = false,
}: PersonInfoProps) {
  return (
    <div
      className={`person-info ${
        selected ? "person-info--selected" : ""
      }`.trim()}
      onClick={() => onClick(id)}
    >
      <div className="person-info__name">{firstNameLastName}</div>
      <div className="person-info__jobTitle">{jobTitle}</div>
      <div className="person-info__email">{emailAddress}</div>
    </div>
  );
}
