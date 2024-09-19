export type Store = {
  id: string;
  name: string;
  branch: string;
}

export type CreateStore = {
  name: string;
  branch: string;
}

export type UpdateStore = {
  name?: string;
  branch?: string;
}
