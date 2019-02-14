import { createContext } from "react";

export interface NostoInterface {
  account: String;
  loading: boolean;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  account: undefined,
  loading: false,
});
/* tslint:enable:no-empty */
