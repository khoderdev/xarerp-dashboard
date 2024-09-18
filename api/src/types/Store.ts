// export type Store = {
//   id: string;
//   name: string;
//   type: string;
// }

// export type UpdateStore = {
//   name?: string;
//   type?: string;
// }

export type Store = {
  id: string;
  name: string;
  branches: string;
};

export type UpdateStore = {
  name?: string;
  branches?: string;
};
