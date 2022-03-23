import { fireEvent, render, waitFor } from "@testing-library/react";
import { App } from "./App";

import mockData from "../../mockData.json";
import apiData from "../../api";

jest.mock("../../api");

describe("<App>", () => {
  it("should fetch data on component mount", () => {
    (apiData as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(apiData).toHaveBeenCalledTimes(1);
  });

  it("should render error message when data fetch failed", async () => {
    (apiData as jest.Mock).mockImplementation(() => Promise.reject("err"));

    const { getByText, queryByTestId } = render(<App />);

    await waitFor(() =>
      expect(queryByTestId("loader")).not.toBeInTheDocument()
    );

    (apiData as jest.Mock).mockImplementation(() => new Promise(() => {}));
    fireEvent.click(getByText("Try to load more again"));

    expect(apiData).toHaveBeenCalledTimes(2);
  });

  describe("when data is fetching", () => {
    beforeEach(() => {
      (apiData as jest.Mock).mockImplementation(() => new Promise(() => {}));
    });

    it("should disable 'Load more' button", () => {
      const { getByText } = render(<App />);

      expect(getByText("Load more")).toBeVisible();
      expect(getByText("Load more")).toBeDisabled();
    });

    it("should render <Loader>", () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId("loader")).toBeVisible();
    });
  });

  describe("when data is fetched", () => {
    beforeEach(() => {
      (apiData as jest.Mock).mockImplementation(() =>
        Promise.resolve(mockData.slice(0, 5))
      );
    });

    it("should load more data after clicking on 'Load more' button", async () => {
      const { queryByTestId, getByText } = render(<App />);

      await waitFor(() =>
        expect(queryByTestId("loader")).not.toBeInTheDocument()
      );

      const button = getByText("Load more");

      expect(button).toBeVisible();
      expect(button).not.toBeDisabled();

      (apiData as jest.Mock).mockImplementation(() => new Promise(() => {}));

      fireEvent.click(button);

      expect(apiData).toHaveBeenCalledTimes(2);
    });

    it("should render selected persons at the top", async () => {
      const { queryByTestId, container, getByText } = render(<App />);

      await waitFor(() =>
        expect(queryByTestId("loader")).not.toBeInTheDocument()
      );

      const allEmails = container.querySelectorAll(".person-info__email");

      const firstEmail = allEmails[0].textContent as string;
      const lastEmail = allEmails[allEmails.length - 1].textContent as string;

      expect(container.querySelector(".person-info__email")).toHaveTextContent(
        firstEmail
      );

      fireEvent.click(getByText(lastEmail));

      expect(container.querySelector(".person-info__email")).toHaveTextContent(
        lastEmail
      );
    });
  });
});
