// import { prisma } from "../../../database/prismaClient";

// import { Store } from "../../../types/Store";

// export const createStoreService = {
//   create: async (data: Store) => {
//     return await prisma.store.create({ data });
//   },
// };
import { prisma } from "../../../database/prismaClient";
import { StoreType } from "@prisma/client";

export const createStoreService = {
  create: async (data: { name: string; type: StoreType }) => {
    // Remove id from here
    return await prisma.store.create({
      data: {
        name: data.name,
        type: data.type,
      },
    });
  },
};
