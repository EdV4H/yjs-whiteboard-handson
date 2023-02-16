import { useReducer } from "react";

/**
 * SugarSyntax for useReducer hook with object as state
 */
export const useObjectState = <T extends object>(initialState: T) => {
  const [state, update] = useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialState
  );
  return [state, update] as const;
};
