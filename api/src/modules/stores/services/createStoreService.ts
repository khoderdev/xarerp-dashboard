// import { prisma } from "../../../database/prismaClient";
// import { branches } from "@prisma/client";

// export const createStoreService = {
//   create: async (data: { branchId?: string; branchName?: string; name: string; type: branches }) => {
//     const storeData: any = {
//       name: data.name,
//     };

//     // If branchId is provided, connect the store to the existing branch
//     if (data.branchId) {
//       storeData.branches = {
//         connect: [{ id: data.branchId }],
//       };
//     }
//     // If branchName is provided, create a new branch
//     else if (data.branchName) {
//       storeData.branches = {
//         create: {
//           name: data.branchName,
//         },
//       };
//     }

//     return await prisma.store.create({
//       data: storeData,
//       include: {
//         branches: true, // Include branches in the response
//       },
//     });
//   },
// };
import { prisma } from "../../../database/prismaClient";
import { branch } from "@prisma/client";

export const createStoreService = {
  create: async (data: {
    branchId?: string;
    branchName?: string;
    name: string;
    type: branch;
  }) => {
    const storeData: any = {
      name: data.name,
      type: data.type, // Include the store type if applicable
    };

    // If branchId is provided, connect the store to the existing branch
    if (data.branchId) {
      storeData.branch = {
        connect: { id: data.branchId }, // Connect to a specific branch
      };
    }
    // If branchName is provided, create a new branch
    else if (data.branchName) {
      storeData.branch = {
        create: {
          // Create a new branch and link it to the store
          name: data.branchName,
        },
      };
    }

    return await prisma.store.create({
      data: storeData,
      include: {
        branch: true, // Include branch in the response
      },
    });
  },
};
