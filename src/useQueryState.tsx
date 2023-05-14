import { useCallback } from "react";
import qs from "query-string";

import { useBlobStore } from "./store";

function updateHistory(path: string) {
  window.history.pushState(null, document.title, path);
}

export const useQueryState = (propName: string, defaultValue: unknown) => {
  const selector = useCallback(
    (state: { [x: string]: any }) =>
      typeof state[propName] !== "undefined" ? state[propName] : defaultValue,
    [propName, defaultValue]
  );
  const globalValue = useBlobStore(selector as any);
  const _setGlobalValue = useCallback(
    (valueFun: (arg0: any) => any) =>
      useBlobStore.setState({
        [propName]: valueFun((useBlobStore as any).getState()[propName]),
      }),
    [propName]
  );

  const setQueryValue = useCallback(
    (newVal: any) => {
      _setGlobalValue((currentState) => {
        if (typeof newVal === "function") {
          newVal = newVal(currentState || defaultValue);
        }
        if (Number.isFinite(newVal)) {
          newVal = parseFloat(newVal.toFixed(2));
        }

        // defer update of URL
        setTimeout(() => {
          const query = useBlobStore.getState();
          updateHistory(
            qs.stringifyUrl(
              { url: window.location.pathname, query: query as any },
              { skipNull: true, arrayFormat: "index" }
            )
          );
        }, 0);

        return newVal;
      });
    },
    [_setGlobalValue]
  );

  return [globalValue, setQueryValue];
};

export default useQueryState;
