// export type Store = {
//   id: string;
//   name: string;
//   type: string;
// }

// export type UpdateStore = {
//   name?: string;
//   type?: string;
// }
import { StoreType } from "@prisma/client";

export type Store = {
  id: string;
  name: string;
  type: StoreType; // Use the StoreType enum
};

export type UpdateStore = {
  name?: string;
  type?: StoreType; // Use the StoreType enum
};
