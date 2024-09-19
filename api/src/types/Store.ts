// export type Store = {
//   id: string;
//   name: string;
//   type: string;
// }

// export type UpdateStore = {
//   name?: string;
//   type?: string;
// }
// import { StoreType } from "@prisma/client";

// export type Store = {
//   id: string;
//   name: string;
//   type: StoreType;
// };

// export type UpdateStore = {
//   name?: string;
//   type?: StoreType;
// };
// export type Branches = {
//   id: string;
//   name: string;
// };

// export type Store = {
//   id: string;
//   name: string;
//   type: Branches;
// };

// export type UpdateStore = {
//   name?: string;
//   type?: Branches;
// };
export type Branch = {
  id: string;
  name: string;
  storeId: string;
};

export type Store = {
  id: string;
  name: string;
  branch: Branch; // Single branch for this store
};

export type UpdateStore = {
  name?: string;
  branchId?: string; // Reference by branch ID
};
