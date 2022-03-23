import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PersonInfo } from "./PersonInfo";

const person = {
  id: "1",
  jobTitle: "Fabricator",
  emailAddress: "Ron_Giles3711@dionrab.com",
  firstNameLastName: "Ron Giles",
};

function renderComponent(
  props: Partial<React.ComponentProps<typeof PersonInfo>> = {}
) {
  const mergedProps: React.ComponentProps<typeof PersonInfo> = {
    ...person,
    onClick: () => {},
    ...props,
  };

  const rtl = render(<PersonInfo {...mergedProps} />);
  const el = rtl.container.firstChild;

  return {
    el,
    ...rtl,
  };
}

describe("<PersonInfo>", () => {
  it("should not have '--selected' class by default", () => {
    const { el } = renderComponent({});

    expect(el).not.toHaveClass("person-info--selected");
  });

  it("should have '--selected' class when it is selected", () => {
    const { el } = renderComponent({ selected: true });

    expect(el).toHaveClass("person-info--selected");
  });

  it("should call onClick handler with personId", () => {
    const onClick = jest.fn();
    const { el } = renderComponent({ onClick });

    fireEvent.click(el as Element);

    expect(onClick).toHaveBeenCalledWith(person.id);
  });
});
