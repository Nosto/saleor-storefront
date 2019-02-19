import { createContext } from "react";

export interface NostoInterface {
  account: string;
  loading: boolean;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  account: undefined,
  loading: false,
});
/* tslint:enable:no-empty */
