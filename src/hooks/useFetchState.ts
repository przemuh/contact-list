import * as React from "react";

type State = "pending" | "success" | "error";

export const useFetchState = <T>(
  apiCallback: () => Promise<T>,
  onFetch: (result: T) => void,
  { fetchOnMount = true } = {}
) => {
  const [state, setState] = React.useState<State>("pending");
  const [result, setResult] = React.useState<null | T>(null);

  const fetch = React.useCallback(() => {
    setState("pending");
    apiCallback()
      .then((result) => {
        setResult(result);
        onFetch(result);
        setState("success");
      })
      .catch(() => setState("error"));
  }, [apiCallback, onFetch]);

  React.useEffect(() => {
    if (fetchOnMount) {
      fetch();
    }
  }, []);

  return {
    state,
    result,
    fetchData: fetch,
  };
};
